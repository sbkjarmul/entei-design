import { z } from "zod";

import { PRODUCT_IDS } from "./products";

/**
 * Order form schema, shared by the client form and the server action (the
 * server re-validates; it is the only check that counts). Error messages are
 * i18n keys under `agency.order.errors`.
 */

/** Polish NIP: 10 digits, weighted checksum. Accepts dashes/spaces. */
export function isValidNip(value: string): boolean {
  const digits = value.replace(/[\s-]/g, "");
  if (!/^\d{10}$/.test(digits)) return false;
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const sum = weights.reduce((acc, w, i) => acc + w * Number(digits[i]), 0);
  return sum % 11 === Number(digits[9]);
}

const name = z
  .string()
  .trim()
  .min(2, "required")
  .max(60, "tooLong")
  .regex(/^[\p{L}\s'-]+$/u, "invalidName");

export const orderSchema = z
  .object({
    productId: z.enum(PRODUCT_IDS),
    firstName: name,
    lastName: name,
    email: z.string().trim().email("invalidEmail").max(254, "tooLong"),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[\d\s-]{9,20}$/, "invalidPhone"),
    wantsInvoice: z.boolean(),
    companyName: z.string().trim().max(120, "tooLong").optional(),
    nip: z.string().trim().max(20, "tooLong").optional(),
    street: z.string().trim().max(120, "tooLong").optional(),
    postalCode: z.string().trim().max(10, "tooLong").optional(),
    city: z.string().trim().max(60, "tooLong").optional(),
    acceptTerms: z.boolean().refine((v) => v, "acceptTerms"),
    acceptStart: z.boolean().refine((v) => v, "acceptStart"),
  })
  .superRefine((data, ctx) => {
    if (!data.wantsInvoice) return;
    if (!data.companyName || data.companyName.length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["companyName"],
        message: "required",
      });
    }
    if (!data.nip || !isValidNip(data.nip)) {
      ctx.addIssue({ code: "custom", path: ["nip"], message: "invalidNip" });
    }
    if (!data.street || data.street.length < 3) {
      ctx.addIssue({ code: "custom", path: ["street"], message: "required" });
    }
    if (!data.postalCode || !/^\d{2}-\d{3}$/.test(data.postalCode)) {
      ctx.addIssue({
        code: "custom",
        path: ["postalCode"],
        message: "invalidPostalCode",
      });
    }
    if (!data.city || data.city.length < 2) {
      ctx.addIssue({ code: "custom", path: ["city"], message: "required" });
    }
  });

export type OrderFormValues = z.infer<typeof orderSchema>;
