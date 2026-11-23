import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

import { COMPANY, COMPANY_ADDRESS } from "../lib/company";

interface OrderConfirmationEmailTemplateProps {
  buyerName: string;
  orderNumber: string;
  productName: string;
  amount: string;
  isSubscription: boolean;
  invoiceCompany?: string;
}

const SITE = "https://www.entei.design";

/**
 * Sent to the buyer after PayU confirms the payment. Doubles as the contract
 * confirmation on a durable medium (Consumer Rights Act, art. 21), so it links
 * the terms in force and repeats the seller's identification data.
 */
export default function OrderConfirmationEmailTemplate({
  buyerName = "Jan Kowalski",
  orderNumber = "ENT-ABC123-1A2B3C4D",
  productName = "Kampanie Meta Ads: system pozyskiwania klientów (1. miesiąc)",
  amount = "3 690 zł",
  isSubscription = true,
  invoiceCompany,
}: OrderConfirmationEmailTemplateProps) {
  return (
    <Html lang="pl">
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/uhq3naf.css" />
      </Head>
      <Preview>Płatność przyjęta. Zamówienie {orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            height="50"
            alt="ENTEI"
            style={logo}
            src={`${SITE}/images/entei-logo.svg`}
          />

          <Heading style={h1}>Dziękujemy za zamówienie!</Heading>

          <Section style={card}>
            <Text style={text}>Cześć {buyerName},</Text>
            <Text style={text}>
              otrzymaliśmy Twoją płatność. Ten e-mail jest potwierdzeniem
              zawarcia umowy. Zachowaj go.
            </Text>

            <Hr style={hr} />
            <Text style={label}>Numer zamówienia</Text>
            <Text style={value}>{orderNumber}</Text>
            <Text style={label}>Usługa</Text>
            <Text style={value}>{productName}</Text>
            <Text style={label}>Zapłacono (brutto, z 23% VAT)</Text>
            <Text style={value}>{amount}</Text>
            {invoiceCompany && (
              <>
                <Text style={label}>Faktura VAT na</Text>
                <Text style={value}>{invoiceCompany}</Text>
              </>
            )}
            <Hr style={hr} />

            <Text style={text}>
              <strong style={strong}>Co dalej?</strong> W ciągu 1 dnia roboczego
              odezwiemy się, żeby umówić spotkanie startowe.
              {isSubscription
                ? " Kolejne miesiące cyklu rozliczamy fakturą VAT z 7-dniowym terminem płatności."
                : ""}{" "}
              Fakturę VAT za tę płatność wyślemy na ten adres e-mail.
            </Text>
            <Text style={text}>
              Umowa została zawarta na zasadach{" "}
              <Link href={`${SITE}/regulamin`} style={link}>
                Regulaminu świadczenia usług
              </Link>
              . Informacje o odstąpieniu od umowy, reklamacjach i płatnościach
              znajdziesz w{" "}
              <Link href={`${SITE}/zasady-zakupow`} style={link}>
                Zasadach zakupów
              </Link>
              .
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={small}>
              {COMPANY.name}, {COMPANY_ADDRESS}, NIP {COMPANY.nip}
              <br />
              Kontakt i reklamacje: {COMPANY.email}
              {COMPANY.phone ? `, tel. ${COMPANY.phone}` : ""}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const fontFamily =
  'neue-haas-grotesk-display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif';

const main = { backgroundColor: "#111", margin: 0, padding: 0, fontFamily };
const container = {
  margin: "0 auto",
  padding: "64px 0 32px",
  maxWidth: "580px",
};
const logo = { margin: "0 auto" };
const h1 = {
  color: "#fff",
  fontSize: "40px",
  fontWeight: "500",
  margin: "40px 0",
  textAlign: "center" as const,
  fontFamily,
};
const card = {
  backgroundColor: "#000",
  border: "1px solid rgba(240, 240, 240, 0.2)",
  borderRadius: "16px",
  padding: "24px",
};
const text = {
  color: "#9F9F9F",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
  fontFamily,
};
const strong = { color: "#fff" };
const label = {
  color: "#757575",
  fontSize: "12px",
  margin: "16px 0 0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  fontFamily,
};
const value = {
  color: "#fff",
  fontSize: "18px",
  margin: "4px 0 0",
  fontFamily,
};
const hr = { borderColor: "rgba(240, 240, 240, 0.2)", margin: "24px 0" };
const link = { color: "#ff2400" };
const footer = { padding: "24px" };
const small = {
  color: "#757575",
  fontSize: "12px",
  lineHeight: "18px",
  textAlign: "center" as const,
  fontFamily,
};
