# CLAUDE.md — ENTEI

Strona studia projektowego **ENTEI** na **Next.js** (App Router, TypeScript, Tailwind v4, next-intl, framer-motion).
Czytaj też: skill [entei-design-skill](.claude/skills/entei-design-skill/SKILL.md) (design system)
oraz skill [figma-to-code](.claude/skills/figma-to-code/SKILL.md) (procedura budowy z Figmy).

---

## Sposób pracy (reguły nadrzędne)

1. **Pracuj autonomicznie.** Doprowadzaj zadania do końca. Pytaj (AskUserQuestion) **tylko** gdy:
   (a) czegoś nie wiesz i nie da się tego rozsądnie założyć, albo (b) wprowadzasz **ważną zmianę kierunku**.
2. **Wartości domyślne z design-systemu.** Czego użytkownik nie doprecyzował (breakpointy, grid, hover, easing) —
   przyjmuj zgodnie z `entei-design-skill` i istniejącymi komponentami w `src/components/`.
3. **Self-check po każdym zadaniu.** Zanim uznasz zadanie za zakończone:
   - przejdź checklistę pixel-perfect ze skilla `entei-design-skill`,
   - uruchom aplikację i sprawdź, że nic się nie zepsuło (`npm run dev`, status 200, brak błędów w logu),
   - dla zmian UI uruchom subagenta **design-reviewer** i porównaj z Figmą.
4. **Przyznawaj niespójności.** Jeśli widzisz, że coś odbiega od wytycznych / Figmy / design-systemu — powiedz to wprost
   i **napraw przed zakończeniem**. Zadanie jest skończone dopiero, gdy jest spójne.
5. **Design system to źródło prawdy.** Tokeny i typografia tylko przez `src/styles/theme.css` (`.t-*`, paleta, spacing 4).
   Nie wstawiaj kolorów/rozmiarów spoza systemu. Brak wariantu → dodaj go w `theme.css`, nie inline.
6. **Teksty jako klucze i18n.** Cała kopia UI to klucze next-intl w `messages/{en,pl}.json` — nie hardkoduj tekstów
   w komponentach (PL/EN).

---

## Komendy

| Cel | Komenda |
|---|---|
| Dev | `npm run dev` → http://localhost:3000 |
| Build (+ sitemap) | `npm run build` |
| Start produkcyjny | `npm run start` |
| Lint | `npm run lint` |
| Podgląd maili (React Email) | `npm run email` |
| Screeny wizualne (Playwright) | `npm run shots` |

> Instalacja zależności: `npm install`. Po pierwszym secie Playwrighta: `npx playwright install chromium`.

---

## Architektura / gdzie co jest

- **Routing**: App Router w `src/app/`. Strona główna i podstrony marketingowe w grupie `src/app/(landing-page)/`,
  case studies w `src/app/case-study/<klient>/`, portfolio w `src/app/portfolio/`.
- **Design tokeny + typografia**: `src/styles/theme.css` (Tailwind v4 `@theme` + `@layer components` z klasami `.t-*`).
  Wpinane do buildu przez `src/app/globals.css` (`@import "../styles/theme.css"`).
- **Komponenty współdzielone**: `src/components/` (Header, Section, Heading, Text, Button, AccentText, CookieConsent…).
  Sekcje konkretnej strony obok niej, np. `src/app/(landing-page)/components/`.
- **i18n / locale**: next-intl. Konfiguracja `src/i18n/request.ts` (locale `en` domyślny, `pl`), słowniki
  `messages/en.json` i `messages/pl.json`. Treści UI bierz ze słowników, nie hardkoduj.
- **Fonty**: główny **Neue Haas** (Typekit, klasa `font-neue-haas`, ładowany w `src/app/layout.tsx`),
  display **Despair Time** (lokalny OTF, zmienna `--font-despair-time`). Pliki w `public/fonts/`.
- **Assety**: `public/images/` (raster + SVG marki), `public/fonts/`.
- **Figma**: plik projektu ENTEI — `fileKey: <TODO: uzupełnić>`. Budowa z Figmy → skill
  [figma-to-code](.claude/skills/figma-to-code/SKILL.md); weryfikacja → subagent `design-reviewer`.
  Reference screeny w `design/figma/`.

---

## Konwencje kodu

- TypeScript, komponenty funkcyjne, nazwy plików `PascalCase.tsx` dla komponentów.
- Stylowanie wyłącznie Tailwind v4 + klasy `.t-*`. Klasy łącz przez helper `cx` z `src/lib/utils.ts`
  (clsx + tailwind-merge). Bez inline-styli poza dynamicznymi wartościami.
- Komponenty domyślnie serwerowe; `"use client"` tylko gdy potrzebny stan/efekty/animacje.
- Treści wielojęzyczne ze słowników (`messages/*.json`); nie hardkoduj tekstów UI w komponentach.
- Animacje przez **framer-motion**; zawsze respektuj `prefers-reduced-motion`.

---

## Definition of Done (dla zadań UI)

1. Zgodne z `entei-design-skill` (paleta, `.t-*`, spacing 4, padding/gap z systemu).
2. Responsywne (mobile ≤768 / desktop), fonty ładują się poprawnie (Neue Haas / Despair Time).
3. `npm run dev` wstaje, brak błędów; `npm run lint` przechodzi.
4. Animacje respektują `prefers-reduced-motion`.
5. Teksty UI z `messages/*.json` (EN + PL), nie hardkodowane.
6. **design-reviewer**: brak krytycznych rozbieżności względem Figmy.
