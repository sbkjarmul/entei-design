import { Resend } from "resend";
import { NextResponse } from "next/server";
import ContactConfirmationEmailTemplate from "@/emails/contact-confirmation-email-template";
import ContactRequestEmailTemplate from "@/emails/contact-request-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const { data: dataClient } = await resend.emails.send({
      from: "noreply@entei.design",
      to: "sbkjarmul@gmail.com",
      subject: "Nowe zgłoszenie",
      react: ContactConfirmationEmailTemplate({
        fullName: "Michał Kamiński",
        companyName: "DPOL",
        message:
          "Szukamy wsparcia kreatywnego przy rebrandingu naszej marki – NaturaNova to firma zajmująca się produkcją naturalnych kosmetyków opartych na lokalnych składnikach. Potrzebujemy nowej identyfikacji wizualnej (logo, paleta kolorów, typografia), odświeżenia opakowań produktów oraz zaprojektowania nowej strony internetowej z e-sklepem. Zależy nam na estetyce minimalistycznej, bliskiej naturze, ale jednocześnie nowoczesnej i przyjaznej użytkownikowi. Chcielibyśmy także współpracować przy strategii komunikacji wizualnej w social mediach",
      }),
    });

    const { data: dataEntei } = await resend.emails.send({
      from: "noreply@entei.design",
      to: "entei.designs@gmail.com",
      subject: "Nowe zgłoszenie",
      react: ContactRequestEmailTemplate({
        fullName: "Michał Kamiński",
        companyName: "DPOL",
        message:
          "Szukamy wsparcia kreatywnego przy rebrandingu naszej marki – NaturaNova to firma zajmująca się produkcją naturalnych kosmetyków opartych na lokalnych składnikach. Potrzebujemy nowej identyfikacji wizualnej (logo, paleta kolorów, typografia), odświeżenia opakowań produktów oraz zaprojektowania nowej strony internetowej z e-sklepem. Zależy nam na estetyce minimalistycznej, bliskiej naturze, ale jednocześnie nowoczesnej i przyjaznej użytkownikowi. Chcielibyśmy także współpracować przy strategii komunikacji wizualnej w social mediach",
      }),
    });

    return NextResponse.json({
      emailToClient: dataClient,
      emailToEntei: dataEntei,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { full_name, email, company_name, message } = await request.json();

    if (!full_name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "ENTEI <noreply@resend.dev>", // Update this with your verified domain
      to: email,
      subject: "Thank you for contacting us",
      react: ContactConfirmationEmailTemplate({
        fullName: full_name,
        companyName: company_name,
        message: message,
      }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
