import {
  Body,
  Button,
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

interface ContactConfirmationEmailTemplateProps {
  fullName: string;
  companyName?: string;
  message: string;
}

export default function ContactConfirmationEmailTemplate({
  fullName = "Full Name",
  companyName = "NaturaNova",
  message = "Szukamy wsparcia kreatywnego przy rebrandingu naszej marki – NaturaNova to firma zajmująca się produkcją naturalnych kosmetyków opartych na lokalnych składnikach. Potrzebujemy nowej identyfikacji wizualnej (logo, paleta kolorów, typografia), odświeżenia opakowań produktów oraz zaprojektowania nowej strony internetowej z e-sklepem. Zależy nam na estetyce minimalistycznej, bliskiej naturze, ale jednocześnie nowoczesnej i przyjaznej użytkownikowi. Chcielibyśmy także współpracować przy strategii komunikacji wizualnej w social mediach.",
}: ContactConfirmationEmailTemplateProps) {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/uhq3naf.css" />
      </Head>
      <Preview>Sprawdź szczegóły</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://i.ibb.co/pjK4CBZG/ente-brandmark-red-orange.png"
            height="50"
            alt="ENTEI"
            style={logo}
          />

          <Heading style={h1}>Dziękujemy za kontakt!</Heading>
          <Section style={section}>
            <Text style={{ ...text, display: "inline", marginRight: "2px" }}>
              Drogi{" "}
            </Text>
            <Text style={{ ...text, ...fullNameStyle }}>{fullName},</Text>
            <Text style={text}>
              Otrzymaliśmy Twoją wiadomość i odpowiemy tak szybko, jak to
              możliwe.
            </Text>

            <Section style={contactCardStyle}>
              <Row width="100%" style={{ marginBottom: "32px" }}>
                <Column align="left" width="50%">
                  <Img
                    src="https://i.ibb.co/MDybQ8Th/entei-email-icon.png"
                    height="32"
                    alt="ENTEI"
                  />
                </Column>
                <Column align="right" width="50%"></Column>
              </Row>

              {companyName && (
                <Text style={companyNameStyle}>{companyName}</Text>
              )}
              <Text style={text}>{message}</Text>
            </Section>
          </Section>
        </Container>
        <Section style={footerStyle}>
          <Row style={{ marginBottom: "48px" }}>
            <Column>
              <Img
                src="https://i.ibb.co/4wXgvVyB/entei-logo-nimbus-cloud-1-2.png"
                width="300px"
                alt="ENTEI"
                style={logo}
              />
              <Text style={enteiTaglineStyle}>
                Projektujemy nowoczesne marki
              </Text>
            </Column>
          </Row>
          <Row>
            <Column style={socialButtonsColumn}>
              <Button
                style={buttonStyle}
                href="https://instagram.com/entei.designs"
              >
                <Row>
                  <Column style={buttonIconColumn}>
                    <Img
                      src="https://i.ibb.co/ZRB3YGV3/Instagram.png"
                      width="30"
                      height="30"
                      alt="Instagram"
                      style={buttonIcon}
                    />
                  </Column>
                  <Column style={buttonTextColumn}>
                    <Text style={followUsOnStyle}>FOLLOW US ON</Text>
                    <Text style={socialMediaNameStyle}>Instagram</Text>
                  </Column>
                </Row>
              </Button>
            </Column>
          </Row>
        </Section>
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
  backgroundSize: "cover",
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

const footerStyle = {
  padding: "148px 24px 24px",
  height: "fit-content",
  backgroundColor: "#D9D9D9",
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
  fontWeight: "600",
  display: "inline-block",
};

const enteiTaglineStyle = {
  color: "#000",
  fontWeight: "300",
  textAlign: "center" as const,
  fontSize: "20px",
};

const socialButtonsColumn = {
  textAlign: "right" as const,
};

const followUsOnStyle = {
  fontSize: "8px",
  color: "#B0B0B0",
  lineHeight: "10px",
  letterSpacing: "0.5px",
  margin: "0",
};

const socialMediaNameStyle = {
  fontSize: "16px",
  lineHeight: "18px",
  color: "white",
  fontWeight: "600",
  margin: "0",
};

const buttonStyle = {
  backgroundColor: "#000",
  padding: "4px 8px",
  borderRadius: "8px",
  marginLeft: "8px",
  textDecoration: "none",
  display: "inline-block",
  verticalAlign: "middle",
};

const buttonIconColumn = {
  paddingRight: "4px",
  verticalAlign: "middle",
};

const buttonTextColumn = {
  textAlign: "left" as const,
  verticalAlign: "center" as const,
  paddingTop: "4px",
};

const buttonIcon = {
  verticalAlign: "middle",
  width: "px",
  height: "30px",
};

const text = {
  color: "#9F9F9F",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
  fontFamily:
    'neue-haas-grotesk-display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const logo = {
  margin: "0 auto",
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

const companyNameStyle = {
  color: "#fff",
  fontWeight: "600",
  fontSize: "32px",
};
