import { getTranslations } from "next-intl/server";
import { Resend } from "resend";

import OrderConfirmationEmailTemplate from "@/emails/order-confirmation-email-template";
import OrderNotificationEmailTemplate from "@/emails/order-notification-email-template";
import {
  PRODUCTS,
  formatPln,
  productIdFromOrderNumber,
} from "@/lib/payu/products";
import {
  getPayuConfig,
  verifyPayuSignature,
  type PayuNotification,
} from "@/lib/payu/server";

export const dynamic = "force-dynamic";

const ORDERS_INBOX = "entei.designs@gmail.com";
const FROM = "ENTEI <noreply@entei.design>";

/**
 * PayU order status notifications (notifyUrl). PayU retries until it gets a
 * 200, so anything we can't process permanently still answers 200; only a bad
 * signature (not from PayU) is rejected.
 *
 * On COMPLETED: confirmation e-mail to the buyer (contract confirmation on a
 * durable medium, required by the Consumer Rights Act) + order e-mail to ENTEI
 * (invoice data arrived in the "new order" e-mail with the same number).
 * No database: PayU's panel is the order ledger.
 */
export async function POST(request: Request) {
  const config = getPayuConfig();
  if (!config) {
    console.error("PayU notify: PAYU_* env vars missing");
    return new Response("Not configured", { status: 503 });
  }

  const rawBody = await request.text();
  const signature =
    request.headers.get("openpayu-signature") ??
    request.headers.get("x-openpayu-signature");

  if (!verifyPayuSignature(rawBody, signature, config.secondKey)) {
    console.warn("PayU notify: invalid signature");
    return new Response("Invalid signature", { status: 401 });
  }

  let notification: PayuNotification;
  try {
    notification = JSON.parse(rawBody) as PayuNotification;
  } catch {
    return new Response("OK", { status: 200 });
  }

  const order = notification.order;
  console.info(
    `PayU notify: order ${order?.orderId} (${order?.extOrderId}) → ${order?.status}`,
  );

  if (order?.status !== "COMPLETED") {
    return new Response("OK", { status: 200 });
  }

  try {
    const productId = productIdFromOrderNumber(order.extOrderId);
    const t = await getTranslations({
      locale: "pl",
      namespace: "agency.order",
    });
    const productName = productId
      ? t(`products.${productId}.name`)
      : order.description;
    const amount = formatPln(Number(order.totalAmount));
    const buyerName = [order.buyer?.firstName, order.buyer?.lastName]
      .filter(Boolean)
      .join(" ");
    const orderNumber = order.extOrderId ?? order.orderId;
    const paidAt =
      notification.localReceiptDateTime ?? new Date().toISOString();

    const resend = new Resend(process.env.RESEND_API_KEY);

    if (order.buyer?.email) {
      await resend.emails.send({
        from: FROM,
        to: order.buyer.email,
        subject: t("email.subject", { order: orderNumber }),
        react: OrderConfirmationEmailTemplate({
          buyerName,
          orderNumber,
          productName,
          amount,
          isSubscription: productId ? PRODUCTS[productId].periods > 1 : false,
        }),
      });
    }

    await resend.emails.send({
      from: FROM,
      to: ORDERS_INBOX,
      subject: `Opłacone zamówienie ${orderNumber}: ${productName} (${amount})`,
      react: OrderNotificationEmailTemplate({
        orderNumber,
        payuOrderId: order.orderId,
        productName,
        amount,
        paidAt,
        payMethod: order.payMethod?.type,
        buyerName,
        buyerEmail: order.buyer?.email,
        buyerPhone: order.buyer?.phone,
        stage: "paid",
      }),
    });
  } catch (error) {
    // Ask PayU to retry later (e.g. Resend outage).
    console.error("PayU notify: post-payment handling failed:", error);
    return new Response("Retry", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}
