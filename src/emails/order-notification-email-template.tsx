import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OrderNotificationEmailTemplateProps {
  /** `created`: form sent, waiting for payment (carries invoice data). `paid`: PayU confirmed. */
  stage: "created" | "paid";
  orderNumber: string;
  payuOrderId?: string;
  productName: string;
  amount: string;
  paidAt?: string;
  payMethod?: string;
  buyerName: string;
  buyerEmail?: string;
  buyerPhone?: string;
  invoice?: { company: string; nip: string; address: string };
}

const COPY = {
  created: {
    title: "Nowe zamówienie (czeka na płatność)",
    hint: "Klient przechodzi do PayU. Osobny e-mail przyjdzie, gdy płatność zostanie potwierdzona. Zachowaj dane do faktury.",
  },
  paid: {
    title: "Zamówienie opłacone",
    hint: "Wystaw fakturę VAT (dane w e-mailu „Nowe zamówienie” o tym samym numerze) i umów spotkanie startowe. Szczegóły: panel PayU → Transakcje.",
  },
} as const;

/** Internal e-mails to ENTEI: order placed, then order paid. */
export default function OrderNotificationEmailTemplate({
  stage = "created",
  orderNumber = "ENT-BR-LX4K2Q-1A2B3C4D",
  payuOrderId = "WZHF5FFDRJ140731GUEST000P01",
  productName = "Pakiet Branding",
  amount = "6 150 zł",
  paidAt = "2026-11-23T12:00:00.000+01:00",
  payMethod = "PBL",
  buyerName = "Jan Kowalski",
  buyerEmail = "jan@example.com",
  buyerPhone = "+48 600 000 000",
  invoice = {
    company: "Firma sp. z o.o.",
    nip: "1234563218",
    address: "ul. Prosta 1, 00-001 Warszawa",
  },
}: OrderNotificationEmailTemplateProps) {
  const rows: [string, string | undefined][] = [
    ["Zamówienie", orderNumber],
    ["PayU orderId", payuOrderId],
    ["Usługa", productName],
    ["Kwota (brutto)", amount],
    ["Opłacono", paidAt],
    ["Metoda", payMethod],
    ["Klient", buyerName],
    ["E-mail", buyerEmail],
    ["Telefon", buyerPhone],
    [
      "Faktura: firma",
      stage === "created"
        ? (invoice?.company ?? "bez faktury na firmę")
        : undefined,
    ],
    ["Faktura: NIP", invoice?.nip],
    ["Faktura: adres", invoice?.address],
  ];

  return (
    <Html lang="pl">
      <Head />
      <Preview>
        {COPY[stage].title}: {productName}, {amount}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{COPY[stage].title}</Heading>
          <Section>
            {rows
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <Text key={k} style={row}>
                  <span style={key}>{k}:</span> {v}
                </Text>
              ))}
          </Section>
          <Text style={hint}>{COPY[stage].hint}</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff",
  fontFamily: "Helvetica, Arial, sans-serif",
};
const container = { margin: "0 auto", padding: "32px 16px", maxWidth: "580px" };
const h1 = { fontSize: "24px", fontWeight: "600", color: "#141414" };
const row = { fontSize: "15px", margin: "4px 0", color: "#141414" };
const key = { color: "#757575" };
const hint = { fontSize: "13px", color: "#757575", marginTop: "24px" };
