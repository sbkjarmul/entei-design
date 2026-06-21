---
name: entei-design-skill
description: Design system studia ENTEI — kolory, typografia, spacing, layout, animacje i wzorce komponentów. Używaj ZAWSZE przy budowaniu, modyfikowaniu lub recenzowaniu UI strony ENTEI (sekcje, strony, komponenty). To źródło prawdy dla pixel-perfect zgodności z Figmą.
---

# ENTEI — Design Skill

Wytyczne UI/UX studia ENTEI. **Stosuj je dosłownie.** Tokeny żyją w
[src/styles/theme.css](../../../src/styles/theme.css) (`@theme` + `@layer components`).
Jeśli wytyczna i kod się rozjeżdżają — najpierw napraw, potem kończ zadanie.

Estetyka marki: **premium, męski charakter, strategiczny, ponadczasowy minimalizm.**
Ciemny interfejs (czarne tło, biały tekst) z mocnym czerwonym akcentem.

> **Status tokenów:** rozmiary `.t-*` w tej tabeli i w `theme.css` są na razie zmapowane 1:1 z istniejących
> komponentów (`Heading`/`Text`/`AccentText`). Gdy podłączymy `fileKey` projektu, uzgodnij je z Figmą
> (`get_variable_defs`) i zaktualizuj **oba** miejsca jednocześnie.

---

## 1. Kolory

| Token              | HEX       | Użycie                                       |
| ------------------ | --------- | -------------------------------------------- |
| (tło) `bg-black`   | `#000000` | domyślne tło aplikacji                       |
| (tekst) `text-white` | `#ffffff` | domyślny tekst                             |
| `primary`          | `#ff2400` | akcent marki — CTA, eyebrow, podkreślenia    |
| `secondary`        | `#e0e0e0` | jasne tła pomocnicze, obramowania            |
| `gray-500`         | `#9e9e9e` | tekst drugorzędny (body)                     |
| `gray-300..900`    | skala     | tła/obramowania/stany wg skali w `theme.css` |

Klasy Tailwind: `bg-black`, `text-white`, `bg-primary`, `text-primary`, `text-gray-500`, `border-gray-700` itd.
Domyślnie (z `globals.css`): tło czarne, tekst biały. Brak kolorów spoza systemu — brak wariantu → dodaj token w `theme.css`.

---

## 2. Typografia — fonty **Neue Haas** (sans) + **Despair Time** (display)

- **Neue Haas Grotesk** — główny font (Typekit), klasa `font-neue-haas`, ustawiany na `<body>` w `layout.tsx`.
- **Despair Time** — font display (lokalny OTF), zmienna `--font-despair-time`, klasa `.t-display` (duże, brandowe napisy).

Używaj klas semantycznych z `@layer components` (responsywne automatycznie). **Źródłem prawdy jest
[theme.css](../../../src/styles/theme.css)** — ta tabela odpowiada mu 1:1. Zmieniasz `theme.css` → zaktualizuj tabelę (i odwrotnie).

| Klasa        | Element / użycie                  | Desktop | Mobile (<768px) | weight | line-height | letter-spacing |
| ------------ | --------------------------------- | ------- | --------------- | ------ | ----------- | -------------- |
| `.t-h1`      | h1                                | 60px    | 36px            | 500    | 1.1         | -0.02em        |
| `.t-h2`      | h2                                | 48px    | 36px            | 500    | 1.1         | -0.02em        |
| `.t-h3`      | h3                                | 24px    | 20px            | 400    | 1.15        | -0.01em        |
| `.t-h4`      | h4                                | 20px    | 18px            | 400    | 1.15        | -0.01em        |
| `.t-h5`      | h5                                | 18px    | 16px            | 400    | 1.15        | -0.01em        |
| `.t-h6`      | h6 / mały nagłówek                | 16px    | 14px            | 500    | 1.15        | -0.01em        |
| `.t-body`    | akapit / body                     | 16px    | 16px            | 400    | 1.4         | -0.01em        |
| `.t-caption` | caption / drobny tekst            | 14px    | 14px            | 400    | 1.3         | -0.01em        |
| `.t-accent`  | eyebrow / label (chip `bg-primary`) | 14px  | 14px            | 400    | 1.2         | -0.01em        |
| `.t-display` | gigantyczny napis brandowy        | —       | —               | 700    | 1.0         | -0.02em        |

Zasada: nagłówki ZAWSZE przez `<Heading level={1..6}>` (mapuje na `.t-h*`), akapity przez `<Text>` (`.t-body`),
eyebrow przez `<AccentText>` (`.t-accent`). Nie nadpisuj rozmiarów inline — brak wariantu → dodaj go w `theme.css`,
potem zaktualizuj tę tabelę.

---

## 3. Spacing — wielokrotności 4

Dozwolone kroki: **4 · 8 · 16 · 24 · 32 · 40 · 64 px**. Mapują się na domyślną skalę Tailwind:

| px       | 4   | 8   | 16  | 24  | 32  | 40   | 64   |
| -------- | --- | --- | --- | --- | --- | ---- | ---- |
| Tailwind | `1` | `2` | `4` | `6` | `8` | `10` | `16` |

Nie używaj wartości spoza tej skali (żadnych `p-3`, `m-5`, dowolnych pikseli).
Klasy łącz przez helper `cx` z `src/lib/utils.ts` (clsx + tailwind-merge).

**Reguły layoutu (z komponentu `Section`):**
- Padding pionowy sekcji: **`py-10 md:py-20`** (40px mobile / 80px desktop).
- Sekcja jest `flex flex-col` z `gap-6` (24px) i `mx-auto w-full`.
- Padding poziomy ustawiaj na sekcji per-widok (`px-6` itp.) zgodnie z Figmą.

---

## 4. Sekcje — wysokości i komponent `<Section>`

Tokeny wysokości: `--section-h-lg/-md/-sm` (800 / 600 / 400 px desktop) — używaj, gdy Figma narzuca stałą wysokość.
Domyślnie `<Section>` nie wymusza wysokości (treść decyduje). Na mobile wysokości elastyczne (min-height).

---

## 5. Buttony i CTA

- Komponent `<Button>` (`src/components/Button.tsx`), warianty: `primary` / `secondary` / `text`.
- Primary: `bg-primary text-black`, hover `bg-primary/90` + lekki scale na desktopie. Secondary: `bg-black`.
- Domyślnie zaokrąglony (`rounded-xl`), padding `px-8 py-4`, `font-medium`, transition 500ms.
- Focus ring zawsze widoczny (a11y) — `focus-visible:ring-4`.
- Nawigacja: podawaj `href` (renderuje `<Link>` jako `<a>`), nie zagnieżdżaj `<button>` w `<a>`.

---

## 6. Animacje — framer-motion

- Animacje przez **framer-motion** (`framer-motion` w zależnościach).
- Subtelne reveal/fade/translateY w duchu premium; easing miękki, czasy ~0.4–0.8s.
- **Zawsze** respektuj `prefers-reduced-motion: reduce` → pokaż treść bez animacji.
- Hover/przejścia subtelne, bez przesady.

---

## 7. Wzorce komponentów (referencje w repo)

- **Header** — `src/components/Header/` (nawigacja + menu).
- **Sekcje strony głównej** — `src/app/(landing-page)/components/` (Hero, OurServices, OurWork, Contact…).
- **Case study** — `src/app/case-study/<klient>/` + współdzielone w `src/app/case-study/components/`.
- **Portfolio** — `src/app/portfolio/` + `src/app/portfolio/components/`.
- **Prymitywy** — `Section`, `Heading`, `Text`, `AccentText`, `Button` w `src/components/`.

---

## 8. Breakpointy (gdy wytyczna nie precyzuje)

| Nazwa   | Szerokość | Tailwind   |
| ------- | --------- | ---------- |
| mobile  | ≤ 768px   | (domyślny) |
| tablet  | 768–1024  | `md:`      |
| desktop | ≥ 1024    | `lg:`      |
| wide    | ≥ 1440    | `xl:`      |

Przełącznik typografii mobile/desktop = **768px (`md`)**.
Screeny do recenzji: **mobile 390px** i **desktop 1440px**.

---

## 9. Checklista pixel-perfect (przed zamknięciem zadania)

- [ ] Kolory wyłącznie z palety (sekcja 1).
- [ ] Nagłówki/teksty przez `<Heading>`/`<Text>`/`<AccentText>` → `.t-*` (sekcja 2), poprawne rozmiary desktop i mobile.
- [ ] Spacing tylko ze skali 4 (sekcja 3); klasy przez `cx`.
- [ ] Animacje (framer-motion) działają i respektują reduced-motion.
- [ ] Teksty UI z `messages/{en,pl}.json` (nie hardkodowane).
- [ ] Zgodność z odpowiednim node'em w Figmie (uruchom subagenta **design-reviewer**).

---

## 10. Praca z Figmą — plik projektu

**Jeden plik projektu ENTEI.** `fileKey: <TODO: uzupełnić>`. Gdy tworzysz nowy widok/stronę w Figmie dla ENTEI —
**dodawaj go do TEGO pliku** (nowy frame/page na istniejącym płótnie). **Nigdy nie zakładaj nowego pliku Figma**.

**Reużywaj instancje, nie klonuj komponentów.** Jeśli nowy widok korzysta z elementów już zdefiniowanych
jako komponenty (Header, Button, Section, ProductCard…) — wstaw **instancję**, nie rysuj od nowa.
Dotyczy też kodu: reużywaj komponenty z `src/components/`, nie duplikuj ich.

> Widoki bywają parami **Desktop 1440 + Mobile 390** obok siebie. Sprawdzaj OBA — mogą różnić się
> elementami i spacingiem.
