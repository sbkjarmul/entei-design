import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactNotificationEmailTemplateProps {
  fullName: string;
  companyName?: string;
  message: string;
  email?: string;
}

export default function ContactNotificationEmailTemplate({
  email = "michal@email.com",
  fullName = "Full Name",
  companyName = "NaturaNova",
  message = "Szukamy wsparcia kreatywnego przy rebrandingu naszej marki – NaturaNova to firma zajmująca się produkcją naturalnych kosmetyków opartych na lokalnych składnikach. Potrzebujemy nowej identyfikacji wizualnej (logo, paleta kolorów, typografia), odświeżenia opakowań produktów oraz zaprojektowania nowej strony internetowej z e-sklepem. Zależy nam na estetyce minimalistycznej, bliskiej naturze, ale jednocześnie nowoczesnej i przyjaznej użytkownikowi. Chcielibyśmy także współpracować przy strategii komunikacji wizualnej w social mediach.",
}: ContactNotificationEmailTemplateProps) {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/uhq3naf.css" />
      </Head>
      <Preview>Sprawdź szczegóły</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nowe zgłoszenie</Heading>
          <Section style={section}>
            {message && (
              <Section style={contactCardStyle}>
                <Row width="100%">
                  <Column align="left" width="50%">
                    <Img
                      src="https://i.ibb.co/MDybQ8Th/entei-email-icon.png"
                      height="32"
                      alt="ENTEI"
                      style={logo}
                    />
                  </Column>
                  <Column align="right">
                    <Text style={clientEmailStyle}>{email}</Text>
                  </Column>
                </Row>

                {fullName && <Text style={fullNameStyle}>{fullName}</Text>}

                {companyName && (
                  <Text style={companyNameStyle}>{companyName}</Text>
                )}
                <Text style={text}>{message}</Text>
                <Section style={contactCardFooterStyle}>xd</Section>
              </Section>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#111",
  padding: 0,
  margin: 0,
  fontFamily:
    'neue-haas-grotesk-display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',

  backgroundImage: `url("https://i.ibb.co/TqtxBp3f/entei-logo-blurred.png")`,
  backgroundPosition: "center 300px",
  backgroundRepeat: "no-repeat",
};

const container = {
  margin: "0 auto",
  padding: "64px 0 32px",
  maxWidth: "580px",
};

const section = {
  padding: "24px",
  borderRadius: "8px",
  paddingBottom: "0",
};

const contactCardStyle = {
  marginTop: "32px",
  padding: "24px 24px 48px",
  backgroundColor: "rgba(0, 0, 0, 1)",
  borderRadius: "16px",
  border: "1px solid rgba(240, 240, 240, 0.2)",
  zIndex: "20",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.5)",
  backgroundImage:
    "url('https://i.ibb.co/mrNcqrV2/entei-contact-card-pattern-2.png')",
  backgroundPosition: "center 300px",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
const contactCardFooterStyle = {
  height: "100px",
  width: "100%",
  // backgroundImage:
  //   "url('https://i.ibb.co/mrNcqrV2/entei-contact-card-pattern-2.png')",
  // backgroundPosition: "center",
  // backgroundRepeat: "no-repeat",
  // backgroundSize: "cover",
};

const h1 = {
  color: "#fff",
  fontSize: "40px",
  fontWeight: "500",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
  fontFamily:
    'neue-haas-grotesk-display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const fullNameStyle = {
  color: "#fff",
  fontWeight: "300",
  fontSize: "20px",
};

const companyNameStyle = {
  color: "#fff",
  fontWeight: "600",
  fontSize: "32px",
};

const clientEmailStyle = {
  border: "1px solid white",
  display: "inline",
  color: "white",
  padding: "8px 12px",
  borderRadius: "4px",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  textDecoration: "unset",
  opacity: 0,
};

const text = {
  color: "rgb(168, 168, 168)",
  fontSize: "20px",
  lineHeight: "24px",
  margin: "16px 0",
  fontFamily:
    'neue-haas-grotesk-display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const logo = {};
