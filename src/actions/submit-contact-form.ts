"use server";

import { Resend } from "resend";
import z from "zod";

import ContactConfirmationEmailTemplate from "@/emails/contact-confirmation-email-template";
import ContactNotificationEmailTemplate from "@/emails/contact-notification-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(
  previousState: {
    success: boolean;
    error?: string;
  },
  formData: FormData
) {
  const schema = z.object({
    fullName: z.string().nonempty(),
    email: z.string().nonempty(),
    companyName: z.string(),
    message: z.string().nonempty(),
  });

  try {
    const data = schema.parse({
      fullName: formData.get("fullName")?.toString(),
      email: formData.get("email")?.toString(),
      message: formData.get("message")?.toString(),
      companyName: formData.get("companyName")?.toString(),
    });

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

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: "Failed to send email",
    };
  }
}
