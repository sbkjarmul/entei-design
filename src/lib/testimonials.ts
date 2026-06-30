/**
 * Opinie klientów (social proof) — dane sekcji `TestimonialsSection`.
 *
 * To są realne cytaty klientów, więc traktujemy je jak treść/dane (jak rejestr
 * case studies), a nie jak kopię UI — NIE trafiają do `messages/*.json`. Sama
 * oprawa sekcji (eyebrow, nagłówek, etykiety nawigacji) żyje w i18n.
 *
 * Format jednego wpisu — patrz `Testimonial`. `date` to ISO (`"YYYY-MM-DD"`);
 * jest formatowana per-locale w komponencie ("listopad 2025" / "November 2025").
 * `avatar` jest opcjonalny — gdy pusty/brak, renderujemy fallback z inicjałami.
 */
export interface Testimonial {
  /** Imię i nazwisko osoby. */
  name: string;
  /** Nazwa firmy / projektu. */
  company: string;
  /** Treść opinii (bez cudzysłowów — dodaje je komponent). */
  quote: string;
  /** Data opinii w formacie ISO `"YYYY-MM-DD"`. */
  date: string;
  /** Ścieżka do avatara w `public/` (opcjonalnie). Pusty → fallback inicjałów. */
  avatar?: string;
  /** Ocena w gwiazdkach 1–5 (domyślnie 5). */
  rating?: number;
}

/**
 * Dane placeholder — zastąp realnymi opiniami (wklejony JSON w tym formacie).
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sara Chen",
    company: "Postnatal Reboot",
    quote:
      "After two kids, I never thought I'd feel this strong again. Rachel Stone helped me rebuild my body and confidence.",
    date: "2025-11-01",
    rating: 5,
  },
  {
    name: "Michał Merkiel",
    company: "Suseu",
    quote:
      "Współpraca z ENTEI to był punkt zwrotny dla naszej marki. Dostaliśmy spójny system wizualny, który od razu zaczął pracować na sprzedaż.",
    date: "2025-09-01",
    rating: 5,
  },
  {
    name: "Mateusz Ozga",
    company: "REM-MET",
    quote:
      "Profesjonalizm na każdym etapie. Nowa identyfikacja i strona sprawiły, że wreszcie wyglądamy tak, jak działamy — solidnie i poważnie.",
    date: "2025-06-01",
    rating: 5,
  },
];
