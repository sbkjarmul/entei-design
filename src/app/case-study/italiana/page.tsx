import Container from "@/components/Container";
import Image from "next/image";

export const metadata = {
  title: "Italiana Case Study | Entei Design",
  description:
    "Rebranding pizzerii Italiana ze Stalowej Woli. Nowoczesna identyfikacja wizualna z motywem wilka.",
  openGraph: {
    title: "Italiana Case Study | Entei Design",
    description: "Rebranding pizzerii Italiana ze Stalowej Woli.",
    images: ["/images/case-studies/italiana-case-study-card.png"],
  },
};

export default function PortfolioItalianaCaseStudy() {
  return (
    <section className="flex flex-col gap-4 md:gap-8 min-h-screen bg-white relative pb-8">
      <div className="relative w-full h-[60vh] md:h-screen overflow-hidden">
        <Image
          src="/images/case-studies/italiana/italiana-hero.png"
          alt="Koszulka Italiana z grafiką wilka i hasłem Wyj, Jedz, Gryź"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <article className="relative w-full h-auto overflow-hidden">
        <Container className="flex flex-col px-10 py-0 md:py-20 gap-6 md:gap-10">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex-1 text-gray-800 text-sm md:text-base">
              <span className="font-bold">Rok: </span>
              <span className="text-gray-700">2025</span>
            </div>
            <div className="flex-1 text-gray-800 text-sm md:text-base">
              <span className="font-bold">Zakres: </span>
              <span className="text-gray-700">
                Rebranding, projekt logo, identyfikacja wizualna, brandbook
                (wytyczne social media i wizerunku lokalu), typografia, elementy
                graficzne, aplikacje
              </span>
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl md:text-8xl font-bold text-gray-900">
            Italiana
          </h1>

          <p className="font-base text-gray-700">
            Italiana to pizzeria ze Stalowej Woli, która od lat jest lokalnym
            liderem w serwowaniu pizzy na kawałki. Mimo świetnego produktu marka
            komunikowała się w przestarzały sposób, wyglądała zwyczajnie i nie
            wyróżniała się na tle konkurencji.
          </p>

          <p className="font-base text-gray-700">
            Naszym zadaniem było zaprojektowanie nowoczesnej, minimalistycznej i
            przyjaznej identyfikacji, którą pokochają zarówno rodziny, jak i
            młodzież. Marka miała stać się łatwo rozpoznawalna i jednoznacznie
            wyglądać na lidera lokalnego rynku.
          </p>
        </Container>
      </article>

      <div className="relative w-full h-auto overflow-hidden px-4 md:px-8">
        <Image
          src="/images/case-studies/italiana/italiana-compare-logo.png"
          alt="Porównanie starego i nowego logo pizzerii Italiana"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>

      <article className="relative w-full h-auto overflow-hidden">
        <Container className="flex flex-col py-0 md:py-20 gap-6 md:gap-10 px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Lokalny lider, który zasługiwał na nowy wizerunek.
          </h2>
          <p className="font-base text-gray-700">
            Celem rebrandingu było pokazanie, jak dobra jest pizza Italiany, i
            przyciągnięcie nowych klientów. Postawiliśmy na jasny, nowoczesny
            styl oraz spójną komunikację, które podkreślają jakość produktu i
            budują trwałą przewagę na tle konkurencji.
          </p>
        </Container>
      </article>

      <div className="flex flex-col md:flex-row items-center px-4 md:px-8 gap-4 md:gap-8">
        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/images/case-studies/italiana/italiana-logo.png"
            alt="Znak marki Italiana – grafika wilka"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>

        <article className="relative w-full h-auto overflow-hidden">
          <Container className="flex flex-col gap-6 md:gap-10">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              Wilk jako znak marki.
            </h2>
            <p className="font-base text-gray-700">
              Znakiem Italiany jest odświeżona, przyjazna grafika wilka.
              Symbolizuje włoskie korzenie marki oraz jej pyszny, wilczy smak.
              To bohater całej komunikacji, gotowy, by zaspokoić Twój wilczy
              apetyt.
            </p>
            <p className="font-base text-gray-700">
              Wilk występuje w wielu nastrojach i wariantach, dzięki czemu marka
              zyskała charakterystyczny, rozpoznawalny element, który spaja
              wszystkie materiały.
            </p>
          </Container>
        </article>
      </div>

      <div className="relative w-full h-auto overflow-hidden">
        <Image
          src="/images/case-studies/italiana/italiana-baner-fb.png"
          alt="Baner marki Italiana z logo wilka i hasłem Wyj, Jedz, Gryź"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center px-4 md:px-8 gap-4 md:gap-8">
        <article className="relative w-full h-auto overflow-hidden">
          <Container className="flex flex-col gap-6 md:gap-10">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              Typografia: energia i luz.
            </h2>
            <p className="font-base text-gray-700">
              Logotyp oparliśmy na czcionce ARCO, której masywne i zaokrąglone
              kształty wprowadzają do marki energię oraz luz. To typografia,
              która komunikuje, że Italiana jest nowoczesną, przyjazną
              restauracją.
            </p>
            <p className="font-base text-gray-700">
              Czcionką główną jest DM Sans w odmianach Regular, Medium i Bold.
              Prosta i czytelna, świetnie sprawdza się w dynamicznym, miejskim
              środowisku i buduje profesjonalny, autentyczny wizerunek marki.
            </p>
          </Container>
        </article>

        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/images/case-studies/italiana/italiana-wordmark.png"
            alt="Logotyp Italiana na czcionce ARCO"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      </div>

      <article className="relative w-full h-auto overflow-hidden">
        <Container className="flex flex-col py-0 md:py-10 gap-6 md:gap-10 px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Zieleń, która buduje apetyt.
          </h2>
          <p className="font-base text-gray-700">
            Paleta marki opiera się na głębokich zieleniach i ciepłej bieli z
            mocnym kontrastem. Energiczna, apetyczna i jednoznacznie kojarzona z
            Italianą.
          </p>
          <div className="relative w-full h-auto overflow-hidden">
            <Image
              src="/images/case-studies/italiana/italiana-colors.png"
              alt="Paleta kolorów marki Italiana"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
        </Container>
      </article>

      <div className="flex flex-col-reverse md:flex-row items-center px-4 md:px-8 gap-4 md:gap-8">
        <article className="relative w-full h-auto overflow-hidden">
          <Container className="flex flex-col gap-6 md:gap-10">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              Marka z charakterem Buntownika.
            </h2>
            <p className="font-base text-gray-700">
              Osobowość Italiany budujemy wokół archetypu Buntownika w
              nowoczesnym, kulturalnym wydaniu: autentyczność, instynkt i
              niezależność. Mówimy wprost, bez zbędnego dystansu, skupiając się
              na tym, co najważniejsze, czyli na doskonałej pizzy.
            </p>
            <p className="font-base text-gray-700">
              Hasło „Wyj, Gryź, Jedz!” to czysta radość z jedzenia i wyraz
              naszej osobowości, który w prosty sposób buduje świadomość marki.
            </p>
          </Container>
        </article>

        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/images/case-studies/italiana/italiana-t-shirt.png"
            alt="Biała koszulka Italiana z zielonym logo wilka na plecach"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      </div>

      <article className="relative w-full h-auto overflow-hidden">
        <Container className="flex flex-col py-0 md:py-10 gap-6 md:gap-10 px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Brandbook: kompletny przewodnik po marce.
          </h2>
          <p className="font-base text-gray-700">
            Cały system spięliśmy w brandbooku, czyli kompletnym przewodniku,
            który pozwala prowadzić markę spójnie na każdym nośniku. Poza
            podstawami, takimi jak logo, kolorystyka i typografia, zebraliśmy w
            nim praktyczne wytyczne do codziennej komunikacji.
          </p>
          <p className="font-base text-gray-700">
            Opisaliśmy zasady prowadzenia social mediów, wytyczne do fotografii
            oraz spójny wizerunek lokalu, tak aby każdy post, zdjęcie i element
            wystroju budowały ten sam, rozpoznawalny charakter marki.
          </p>
          <p className="font-base text-gray-700">
            Przygotowaliśmy też rozdział specjalny, w którym znalazł się gotowy
            szablon promptu do generowania zdjęć na kampanie na Instagramie.
            Dzięki niemu Italiana może samodzielnie tworzyć nowe materiały
            zgodne z identyfikacją marki, bez utraty spójności.
          </p>
        </Container>
      </article>

      <div className="relative w-full h-auto overflow-hidden px-4 md:px-8">
        <Image
          src="/images/case-studies/italiana/italiana-brand-guidelines.png"
          alt="Rozkładówki brandbooka Italiana z wytycznymi do social mediów, fotografii i wizerunku lokalu"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>

      <div className="relative w-full h-auto overflow-hidden px-4 md:px-8">
        <Image
          src="/images/case-studies/italiana/italiana-place.png"
          alt="Witryna pizzerii Italiana z zieloną markizą i szyldem"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>

      <div className="flex flex-col md:flex-row px-4 md:px-8 gap-4 md:gap-8">
        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/images/case-studies/italiana/italiana-boxes.png"
            alt="Pudełka na pizzę Italiana z grafiką wilka"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/images/case-studies/italiana/italiana-menu.png"
            alt="Menu oraz ulotka promocyjna Italiana"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center px-4 md:px-8 gap-4 md:gap-8">
        <article className="relative w-full h-auto overflow-hidden">
          <Container className="flex flex-col gap-6 md:gap-10">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              Szachownica, wilk i ikony.
            </h2>
            <p className="font-base text-gray-700">
              Zestaw elementów graficznych, takich jak naklejki z wilkiem,
              ogniem i pizzą, pozwala marce żyć w social mediach i w lokalu.
              Proste, rozpoznawalne i pełne charakteru.
            </p>
          </Container>
        </article>

        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/images/case-studies/italiana/italiana-sticker.png"
            alt="Naklejki Pizzeria Italiana z motywem wilka, ognia i pizzy"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="relative w-full h-auto overflow-hidden px-4 md:px-8">
        <Image
          src="/images/case-studies/italiana/italiana-fast-food-packaging.png"
          alt="Zestaw opakowań Italiana: kubek, torba i pudełko"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
