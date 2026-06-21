---
description: Zbuduj widok ENTEI z węzła Figmy i zweryfikuj 1:1 (figma-to-code → asset-gate → design-reviewer aż PASS).
argument-hint: <node-id lub link do zaznaczenia w Figmie> [+ mobile node-id]
---

# /figma-build — budowa widoku ENTEI z Figmy z weryfikacją

Wejście użytkownika: **$ARGUMENTS**

Zbuduj wskazany widok z Figmy zgodnie z naszą procedurą i zweryfikuj go względem wzorca. To **orkiestrator** —
nie powtarzaj tu logiki budowy, tylko wywołuj istniejące elementy w ustalonej kolejności.

## 1. Wejście
- Plik Figma to **zawsze** plik projektu ENTEI, `fileKey: <TODO: uzupełnić>`.
- Z `$ARGUMENTS` wyłuskaj **node-id** (format `5:3` lub `5-3`) albo link do zaznaczenia. Jeśli podano parę,
  potraktuj drugi node jako **mobile**.
- Jeśli nie ma node-id ani linku — **poproś** użytkownika o *Copy link to selection* (PPM na frame w Figmie)
  i zatrzymaj się do czasu odpowiedzi.
- Ustal, czy istnieje para **Desktop 1440 / Mobile 390** (sprawdź `get_metadata` na rodzicu lub sąsiadach).
  Jeśli jest mobilny wariant — zbuduj OBA.

## 2. Build — wywołaj skill `figma-to-code`
Uruchom **skill `figma-to-code`** (przez Skill tool) z ustalonym node-id. On prowadzi pełen proces
extract → map → build (jego §1–6): kolejność wywołań Figma MCP, mapowanie zmierzonych wartości na tokeny
ENTEI, reużycie komponentów z `src/components/`, pipeline assetów, i18n ze słowników, animacje, responsywność.
**Nie duplikuj** jego treści — zaufaj skillowi.

## 3. Brama assetów (gate — wykonaj po pobraniu każdego assetu)
Figma bywa zawodna przy eksporcie obrazów. Dla **każdego** pobranego assetu:
- **Weryfikuj typ**: `file <ścieżka>` — Figma potrafi zwrócić PNG/SVG mimo rozszerzenia `.jpg` (i odwrotnie).
  Niezgodność → zmień rozszerzenie pliku i `src`/ścieżkę w komponencie.
- **Sanity rozmiaru**: raster (jpg/png) dla treści powinien mieć **>5KB**; plik **<1KB** to niemal na pewno
  wektorowy placeholder lub nieudany eksport.
- Przy podejrzanym assecie (zły typ / za mały) — **natychmiast zaalarmuj** użytkownika: który to asset,
  z którego node'a i którego komponentu dotyczy. **Nie pomijaj po cichu.**
- W podsumowaniu wypisz przeniesione assety: plik, wymiary, źródłowy node.

## 4. Weryfikacja — pętla z `design-reviewer`
- Uruchom subagenta **`design-reviewer`** z URL widoku i **node-id** z kroku 1 (desktop + mobile).
- Napraw wszystkie **KRYT** i istotne **WAŻNE** z raportu (edytuj kod / tokeny w `theme.css`).
- Powtarzaj review → fix, aż werdykt **PASS**. Nie zamykaj zadania przy KRYT.

## 5. Finalizacja
- `npm run lint` przechodzi; `npm run dev` bez błędów w logu (status 200).
- Krótkie podsumowanie: co zbudowano (sekcje/komponenty), lista assetów, końcowy werdykt `design-reviewer`,
  ewentualne odnotowane rozbieżności od skali 4 / tokenów (jeśli były świadome).
