import z from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(5, "Imię i nazwisko musi mieć minimum 5 znaków")
    .max(100, "Imię i nazwisko nie może być dłuższe niż 100 znaków")
    .regex(
      /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/,
      "Imię i nazwisko może zawierać tylko litery, spacje i myślniki"
    ),
  email: z.string().email("Nieprawidłowy adres email"),
  companyName: z.string().optional(),
  message: z
    .string()
    .min(10, "Wiadomość musi mieć minimum 10 znaków")
    .max(2000, "Wiadomość nie może być dłuższa niż 2000 znaków"),
  acceptPolicy: z.boolean().refine((val) => val === true, {
    message: "Musisz zaakceptować politykę prywatności",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const defaultValues: ContactFormData = {
  fullName: "",
  email: "",
  companyName: "",
  message: "",
  acceptPolicy: false,
};
