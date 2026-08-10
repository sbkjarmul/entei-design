"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import z from "zod";

import ContactConfirmationEmailTemplate from "@/emails/contact-confirmation-email-template";
import ContactNotificationEmailTemplate from "@/emails/contact-notification-email-template";
import { trackServerEvent } from "@/lib/pixel";

const resend = new Resend(process.env.RESEND_API_KEY);

// Minimalny czas (ms), w jakim człowiek jest w stanie wypełnić formularz.
// Submit szybszy niż to = bot wysyłający formularz automatycznie.
const MIN_FILL_TIME_MS = 2500;

const TURNSTILE_SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Weryfikacja tokena Cloudflare Turnstile po stronie serwera (jedyna, której
// można ufać). Gdy brak TURNSTILE_SECRET_KEY (np. lokalnie) — pomijamy, żeby nie
// blokować dev; produkcyjnie klucz jest ustawiony, więc weryfikacja jest wymagana.
// Fail-closed: każdy błąd sieci/parsowania traktujemy jako niepowodzenie.
async function verifyTurnstile(
  token: string | undefined,
  remoteIp: string | undefined,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile nieskonfigurowany — pomiń warstwę 4.
  if (!token || token.length > 2048) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);

    const res = await fetch(TURNSTILE_SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return false;

    const data = (await res.json()) as { success?: boolean; action?: string };
    return data.success === true && data.action === "contact";
  } catch {
    return false;
  }
}

// Walidacja serwera lustrzana do walidacji klienta (schema.ts) — backend jest
// jedynym miejscem, któremu można ufać. Bot pomijający JS trafia tutaj.
const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(5)
    .max(100)
    .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/),
  email: z.string().trim().email().max(254),
  companyName: z.string().trim().max(100),
  message: z.string().trim().min(10).max(2000),
  acceptPolicy: z.literal("accepted"),
});

export async function submitContactForm(
  previousState: {
    success: boolean;
    eventId: string;
    error?: string;
  },
  formData: FormData,
) {
  const eventId = crypto.randomUUID();

  // --- Warstwa antybotowa (cicha) ---
  // Przy wykryciu bota udajemy sukces i NIE wysyłamy maila. Zwrócenie błędu
  // nauczyłoby operatora bota, że został wykryty, i pozwoliło ominąć zabezpieczenie.

  // 1) Honeypot: ukryte pole "website", którego człowiek nigdy nie zobaczy.
  const honeypot = formData.get("website")?.toString().trim();
  if (honeypot) {
    return { success: true, eventId };
  }

  // 2) Timing trap: submit szybszy niż człowiek może wypełnić formularz.
  const loadedAt = Number(formData.get("_loadedAt"));
  if (Number.isFinite(loadedAt) && loadedAt > 0) {
    const elapsed = Date.now() - loadedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_TIME_MS) {
      return { success: true, eventId };
    }
  }

  try {
    const data = schema.parse({
      fullName: formData.get("fullName")?.toString(),
      email: formData.get("email")?.toString(),
      message: formData.get("message")?.toString(),
      companyName: formData.get("companyName")?.toString() ?? "",
      acceptPolicy: formData.get("acceptPolicy")?.toString(),
    });

    // 3) Cloudflare Turnstile — niewidzialna CAPTCHA. W przeciwieństwie do
    // honeypota zwracamy tu błąd (nie cichy sukces): prawdziwy użytkownik z
    // odrzuconym tokenem może ponowić, a widget odświeży się po stronie klienta.
    const headerList = await headers();
    const remoteIp = headerList
      .get("x-forwarded-for")
      ?.split(",")[0]
      ?.trim();
    const token = formData.get("cf-turnstile-response")?.toString();

    if (!(await verifyTurnstile(token, remoteIp))) {
      return {
        success: false,
        error: "Weryfikacja bezpieczeństwa nie powiodła się. Spróbuj ponownie.",
        eventId: "",
      };
    }

    const { fullName, email, message, companyName } = data;

    // Send confirmation email to client
    await resend.emails.send({
      from: "ENTEI <noreply@entei.design>",
      to: email.toString(),
      subject: "Wypełniłeś formularz kontaktowy",
      react: ContactConfirmationEmailTemplate({
        fullName,
        companyName,
        message,
      }),
    });

    // Send notification email to ENTEI
    await resend.emails.send({
      from: "ENTEI <noreply@entei.design>",
      to: "entei.designs@gmail.com",
      subject: "Nowe zapytanie",
      react: ContactNotificationEmailTemplate({
        fullName,
        companyName,
        message,
        email: email,
      }),
    });

    trackServerEvent("Lead", eventId);

    return {
      success: true,
      eventId,
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: "Failed to send email",
      eventId: "",
    };
  }
}
