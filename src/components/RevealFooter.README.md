# RevealFooter

Przenośny efekt **odsłaniania stopki** przez zsuwającą się sekcję strony, z parallaxem
(stopka przewija się pod spodem wolniej niż treść). W stylu freshman.tv.

Plik: [`RevealFooter.tsx`](./RevealFooter.tsx). Zależność: [`lenis`](https://github.com/darkroomengineering/lenis).

## Jak działa

- Sekcja treści (nieprzezroczysta, `z-30`) ślizga się w górę w pełnej prędkości scrolla i **odsłania** stopkę przypiętą pod nią (`fixed`, `z-0`).
- Kontener stopki ma jej kolor tła → przy krawędzi sekcji **nie ma luki** w innym kolorze.
- Zawartość stopki dryfuje w górę **wolniej** niż sekcja (parallax), sterowana przez `useLenis`
  (Lenis ma wirtualny scroll i nie emituje natywnego `scroll`, więc `useScroll`/`window.onscroll` nie działają).

## Reużycie w innym projekcie (3 kroki)

1. **Smooth scroll (Lenis).** Owiń aplikację w provider z `ReactLenis root` (u nas: `SmoothScroll.tsx`)
   i zaimportuj `lenis/dist/lenis.css`. Bez Lenis efekt się nie animuje.

2. **Warstwa treści — nieprzezroczysta i nad stopką:** `position: relative; z-index: 30;` + własne tło.

3. **Wyrenderuj `<RevealFooter>` zaraz za tą warstwą**, podając stopkę jako `children`
   i `bgClassName` zgodny z tłem stopki:

   ```tsx
   <div className="relative z-30 min-h-screen bg-white">…treść…</div>

   <RevealFooter bgClassName="bg-gray-300">
     <MojFooter />
   </RevealFooter>
   ```

> Opcjonalnie twardy stop na końcu strony (bez „odbicia"): `html { overscroll-behavior-y: none; }`.

## Props

| Prop | Typ | Domyślnie | Opis |
|---|---|---|---|
| `children` | `ReactNode` | — | Stopka do odsłonięcia. |
| `bgClassName` | `string` | `"bg-black"` | Klasa tła kontenera — **musi** odpowiadać tłu stopki (wypełnia odsłanianą strefę). |
| `parallaxRatio` | `number` | `0.6` | Jak mocno treść stopki dryfuje (0–1 wysokości stopki). Większe = wyraźniejszy ruch z tyłu. |
| `breakpoint` | `number` | `768` | Od jakiej szerokości viewportu włączyć efekt (px). |

Na mobile (poniżej `breakpoint`) oraz przy `prefers-reduced-motion` renderuje stopkę zwyczajnie
w przepływie — bez przypinania i parallaxu.

## Użycia w tym projekcie

- Landing: `src/app/(landing-page)/layout.tsx` — `<RevealFooter bgClassName="bg-primary"><Footer/></RevealFooter>`.
- Realizacje: `src/app/realizacje/layout.tsx` — `<RevealFooter bgClassName="bg-gray-300"><CaseStudyFooter/></RevealFooter>`.
