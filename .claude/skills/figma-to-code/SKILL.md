---
name: figma-to-code
description: Procedura przepisywania widoku z Figmy (plik projektu ENTEI) na kod Next.js. Używaj ZA KAŻDYM RAZEM, gdy budujesz lub odtwarzasz sekcję, stronę albo komponent z węzła Figmy — ZANIM zaczniesz pisać kod. Określa kolejność wywołań Figma MCP, mapowanie zmierzonych wartości na tokeny ENTEI, reużycie istniejących komponentów i pipeline assetów. Para z entei-design-skill (spec systemu) i subagentem design-reviewer (weryfikacja po fakcie).
allowed-tools: Read, Grep, Glob, Edit, Write, Bash, mcp__claude_ai_Figma__get_design_context, mcp__claude_ai_Figma__get_metadata, mcp__claude_ai_Figma__get_variable_defs, mcp__claude_ai_Figma__get_screenshot
---

# ENTEI — Figma → kod (procedura ekstrakcji)

Jak **wiernie** przenieść węzeł z Figmy na kod Next.js. To strona „build". Specyfikacja systemu
(kolory, `.t-*`, spacing, komponenty) żyje w skillu **`entei-design-skill`** i w
[theme.css](../../../src/styles/theme.css) — tu jest **proces**, nie wartości.

**Złota zasada: najpierw zmierz w Figmie, dopiero potem koduj.** Nie zgaduj wymiarów ze screenshota —
pobierz liczby z MCP i mapuj je na tokeny. Każda wartość w kodzie musi pochodzić z systemu ENTEI, nie „na oko".

---

## 1. Wejście

- **Plik**: zawsze plik projektu ENTEI, `fileKey: <TODO: uzupełnić>`. Nigdy nie zakładaj nowego pliku.
- **node-id** widoku do zbudowania. Jeśli użytkownik nie podał — poproś o link do zaznaczenia
  (Figma: PPM na frame → *Copy link to selection*).
- **Para desktop/mobile.** Widoki bywają parami **Desktop 1440 + Mobile 390** obok siebie.
  Pobierz i zbuduj **OBA** — różnią się elementami i spacingiem.

---

## 2. Kolejność wywołań Figma MCP (extract → map → build)

Wykonaj w tej kolejności, dla desktop i mobile:

1. **`get_variable_defs(nodeId)`** — zmienne (kolory, typografia, spacing) użyte w węźle.
   To podstawa mapowania na tokeny → patrz §3. Rób to **pierwsze**.
2. **`get_metadata(nodeId)`** — hierarchia, nazwy warstw, wymiary. Stąd wyłapiesz **instancje komponentów**
   (Header, Button, Section…) → patrz §4, oraz auto-layout (padding/gap/kierunek).
3. **`get_design_context(nodeId)`** — szczegóły layoutu **oraz URL-e assetów** (obrazy, ikony) → patrz §5.
4. **`get_screenshot(nodeId)`** — wzorzec wizualny. Zapisz do `design/figma/<slug>.<desktop|mobile>.png`
   (np. `design/figma/hero.desktop.png`) jako referencję dla `design-reviewer`.

---

## 3. Mapowanie zmierzonych wartości → tokeny ENTEI

Nigdy nie hardkoduj. Tłumacz tak:

- **Kolory** → paleta z `entei-design-skill` §1 (`primary`, `secondary`, czerń/biel, skala gray).
  Kolor spoza palety = sygnał błędu: dopytaj lub użyj najbliższego tokenu, nie wstawiaj surowego hexa.
- **Typografia** → klasa `.t-*` przez prymitywy `<Heading>`/`<Text>`/`<AccentText>` wg tabeli w
  `entei-design-skill` §2. **Dopasuj po rozmiarze**, nie po nazwie w Figmie.
- **Spacing** → wyłącznie skala 4. Zamień zmierzone px na krok Tailwind:

  | px       | 4   | 8   | 16  | 24  | 32  | 40   | 64   |
  | -------- | --- | --- | --- | --- | --- | ---- | ---- |
  | Tailwind | `1` | `2` | `4` | `6` | `8` | `10` | `16` |

  Wartość spoza skali (np. 12, 20, 48px) → zaokrąglij do najbliższego dozwolonego kroku i **odnotuj**
  rozbieżność w podsumowaniu. Klasy łącz przez `cx` (`src/lib/utils.ts`).
- **Wysokość sekcji** → token `--section-h-lg|md|sm` (800/600/400), gdy Figma narzuca stałą wysokość.
  Nie ustawiaj wysokości surowym pikselem inline.
- **Brak wariantu** (kolor/rozmiar/krok, którego nie ma w systemie) → **dodaj go w `theme.css`**
  i zaktualizuj tabelę w `entei-design-skill`. Nigdy inline.

---

## 4. Reużycie komponentów — sprawdź ZANIM coś stworzysz

Instancja komponentu w Figmie = istniejący komponent w `src/components/`. **Grep `src/components/` zanim
napiszesz nowy plik.** Najczęstsze mapowania:

| Element w Figmie                       | Komponent w kodzie                                  |
| -------------------------------------- | --------------------------------------------------- |
| Nagłówek / nawigacja                   | `Header/` (+ `HeaderMenu/`)                          |
| Sekcja (flex, padding pionowy, gap)    | `Section`                                            |
| Nagłówek tekstowy (h1..h6)             | `Heading`                                            |
| Akapit / body                          | `Text`                                              |
| Eyebrow / label (chip)                 | `AccentText`                                         |
| CTA / przyciski                        | `Button`                                            |
| Box kontaktowy                         | `ContactBox/`                                       |
| Baner cookies / zgody                  | `CookieConsent/`                                    |
| Dane strukturalne (SEO)                | `StructuredData/`                                   |
| Sekcje landing page                    | `src/app/(landing-page)/components/`                |
| Sekcje case study                      | `src/app/case-study/components/`                    |
| Sekcje portfolio                       | `src/app/portfolio/components/`                     |

Reużyj i rozszerz props, nie duplikuj. Nowy komponent twórz tylko, gdy w Figmie naprawdę jest nowy
komponent — wtedy `PascalCase.tsx` w odpowiednim folderze, zgodny z konwencjami z `CLAUDE.md`.

---

## 5. Pipeline assetów

URL-e assetów bierzesz z `get_design_context`. Reguły umiejscowienia (wg konwencji repo):

- **Raster** (zdjęcia, packshoty) → `public/images/<opisowa-nazwa>.{jpg,webp,png}`.
- **Logo / grafiki marki w SVG** → `public/images/<nazwa>.svg`.
- **Case study** → `public/images/case-studies/<klient>/`.
- **Ikony UI** → `public/images/icons/` lub komponent React z inline SVG, jeśli ikona jest interaktywna/kolorowana.

Używaj `next/image` (`<Image>`) z `width`, `height` (z wymiarów z Figmy) i `alt`. Pobierz plik (nie linkuj do Figmy),
nadaj **opisową** nazwę. Jeśli assetu nie da się pobrać (wygasły URL, błąd sieci) — **od razu zgłoś** który
to asset i którego komponentu dotyczy, nie pomijaj po cichu. Zapisz listę przeniesionych assetów w
podsumowaniu zadania (plik, wymiary, źródłowy node).

---

## 6. Budowa

- Składaj z reużytych komponentów (§4) + tokenów (§3). Komponenty domyślnie serwerowe;
  `"use client"` tylko gdy potrzebny stan/efekty/animacje.
- Teksty UI ze słowników i18n (`messages/{en,pl}.json`) — **nie hardkoduj** PL/EN w komponencie.
- Animacje przez **framer-motion**; **zawsze** respektuj `prefers-reduced-motion`.
- Buduj responsywnie od razu (mobile ≤768 / desktop), nie odkładaj na potem.

---

## 7. Pętla weryfikacji (obowiązkowa przed zamknięciem)

1. `npm run dev` → http://localhost:3000, status 200, brak błędów w logu.
2. `npm run shots -- --url <ścieżka> --name <slug>` → screeny desktop 1440 / mobile 390
   w `design/screenshots/<slug>.{desktop,mobile}.png`.
3. Uruchom subagenta **`design-reviewer`** z node-id z §1 — porówna render z Figmą.
4. Napraw wszystkie **KRYT** i **WAŻNE**, powtarzaj aż werdykt **PASS**.
5. `npm run lint` przechodzi.

---

## 8. Twarde zakazy (częste przyczyny rozjazdów)

- ❌ Wymiary „na oko" ze screenshota zamiast liczb z `get_metadata`/`get_design_context`.
- ❌ Surowe hexy / px zamiast palety, `.t-*`, skali 4.
- ❌ Nowy komponent, gdy istnieje pasujący w `src/components/`.
- ❌ Link do obrazu w Figmie zamiast pobranego pliku; brak `alt/width/height` w `next/image`.
- ❌ Hardkodowane teksty zamiast kluczy i18n (`messages/*.json`).
- ❌ Zbudowany tylko desktop, gdy w Figmie jest też wariant mobile.
- ❌ Zamknięcie zadania bez `design-reviewer` = PASS.
