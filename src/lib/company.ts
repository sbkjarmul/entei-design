/**
 * Seller identification shown wherever a purchase can happen (order page,
 * footers, terms). Required by the Polish Consumer Rights Act and by PayU's
 * shop verification, so keep it identical everywhere: import, don't retype.
 */
export const COMPANY = {
  name: "ENTEI Sebastian Jarmul",
  street: "ul. Wojska Polskiego 24/13",
  postalCode: "37-450",
  city: "Stalowa Wola",
  country: "Polska",
  nip: "8652574151",
  regon: "544272533" as string | null,
  register:
    "Centralna Ewidencja i Informacja o Działalności Gospodarczej (CEIDG)",
  email: "hello@entei.design",
  phone: "+48 791 912 845" as string | null,
  complaintsEmail: "hello@entei.design",
} as const;

export const COMPANY_ADDRESS = `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}`;
