import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

export default function PortfolioRemMetCaseStudy() {
  return (
    <section className="flex flex-col gap-4 md:gap-8 min-h-screen bg-white relative pb-8">
      <div className="relative w-full h-auto overflow-hidden">
        <Image
          src="/images/case-studies/rem-met/rem-met-hero.png"
          alt="Katalog REM-MET na rok 2025"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>

      <article className="relative w-full h-auto overflow-hidden">
        <Container className="flex flex-col px-10 py-0 md:py-20 gap-6 md:gap-10">
          <div className="flex">
            <div className="flex-1 text-gray-800 text-sm md:text-base">
              <span className="font-bold">Rok: </span>
              <span className="text-gray-700">2025</span>
            </div>
            <div className="flex-1 text-gray-800 text-sm md:text-base">
              <span className="font-bold">Zakres: </span>
              <span className="text-gray-700">
                Projektowanie logo, rebranding, materiały promocyjne, strategia,
                nazewnictwo, copywriting, identyfikacja wizualna, identyfikacja
                werbalna, projekt UI/UX, web development
              </span>
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl md:text-8xl font-bold text-gray-900">
            REM-MET
          </h1>

          <p className="font-base text-gray-700">
            REM-MET to firma z ponad 20-letnim doświadczeniem w spawalnictwie,
            która stanęła przed wyzwaniem wejścia na nowy rynek. Celem
            właściciela było rozszerzenie działalności o produkcję wygrodzeń
            bezpieczeństwa dla maszyn przemysłowych, które miałyby nie tylko
            spełniać normy, lecz także budować zaufanie klientów poprzez
            solidność i indywidualne dopasowanie.
          </p>

          <p className="font-base text-gray-700">
            Naszym zadaniem było stworzenie nowej identyfikacji wizualnej oraz
            strony internetowej, które w jasny sposób zaprezentują nowe linie
            produktowe i jednocześnie przedstawią REM-MET jako profesjonalnego
            partnera dla przemysłu, gotowego odciążyć klienta na każdym etapie
            realizacji.
          </p>
        </Container>
      </article>

      <div className="relative w-full h-auto overflow-hidden p-4 md:p-8">
        <Image
          src="/images/case-studies/rem-met/rem-met-gecko-black.png"
          alt="Wygrodzenia REM-MET GECKO na czarnym tle"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>

      <article className="relative w-full h-auto overflow-hidden">
        <Container className="flex flex-col py-0 md:py-20 gap-6 md:gap-10 text-gray-900 px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl font-bold">
            Logo, które nawiązuje do branży spawalniczej.
          </h2>
          <p className="font-base text-gray-700">
            Nowe logo REM-MET zostało zbudowane wokół litery R, czyli pierwszej
            litery nazwy firmy. Kluczowym elementem projektu stało się
            wykorzystanie negatywnej przestrzeni, w której ukryta została iskra,
            czyli symbol procesu spawania. To właśnie ten detal nadaje znakowi
            dynamiki i odwołuje się bezpośrednio do 20-letniego doświadczenia
            firmy.
          </p>

          <p className="font-base text-gray-700">
            Iskra spaja ze sobą geometryczne kształty, które reprezentują
            solidność i precyzję konstrukcji stalowych. Dzięki temu znak jest
            prosty, ale jednocześnie łączy w sobie zarówno historię firmy, jak i
            jej nowy kierunek rozwoju.
          </p>
        </Container>
      </article>

      <div className="relative w-full h-auto overflow-hidden p-4 md:p-8">
        <Image
          src="/images/case-studies/rem-met/rem-met-logo-black-white.png"
          alt="REM-MET logo na czarnym tle"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="flex px-4 md:px-8 gap-4 md:gap-8">
        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/images/case-studies/rem-met/rem-met-squared-boxes.png"
            alt="Pudełka w kolorach REM-MET"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
        </div>

        <article className="relative w-full h-auto overflow-hidden">
          <Container className="flex flex-col gap-6 md:gap-10 text-gray-900">
            <h2 className="text-2xl md:text-4xl font-bold">
              Kolory, które wyróżniają markę od konkurencji.
            </h2>
            <p className="font-base text-gray-700">
              Paleta kolorów została zainspirowana procesem spawania metalu.
              Głównym kolorem jest niebieski, odwołujący się do barwy płomienia
              podczas spawania. Kolorami uzupełniającymi są odcienie szarości,
              które nawiązują do surowego metalu i podkreślają techniczny,
              industrialny charakter marki.
            </p>

            <p className="font-base text-gray-700">
              Niebieski pełni w identyfikacji dwie kluczowe funkcje. Z jednej
              strony wyróżnia REM-MET na tle konkurencji, ponieważ inni
              producenci wygrodzeń przemysłowych najczęściej wykorzystują barwy
              czerwone, pomarańczowe lub żółte. Z drugiej strony, zgodnie z
              psychologią kolorów, niebieski budzi poczucie bezpieczeństwa i
              zaufania, które są głównymi wartościami marki.
            </p>
          </Container>
        </article>
      </div>

      <div className="relative w-full h-auto overflow-hidden px-4 md:px-8">
        <Image
          src="/images/case-studies/rem-met/rem-met-mockup-posters.png"
          alt="Plakaty REM-MET na szarej ścianie"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>

      <article className="relative w-full h-auto overflow-hidden">
        <Container className="flex flex-col py-0 md:py-20 gap-6 md:gap-10 text-gray-900 px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl font-bold">
            Techniczna czcionka podkreślająca charakter marki.
          </h2>
          <p className="font-base text-gray-700">
            Do systemu wizualnego REM-MET wybrałem czcionkę TT Octosquares,
            której charakterystyczne, kwadratowe formy nawiązują do świata
            konstrukcji stalowych i przemysłowej precyzji. Jej geometryczny rytm
            i techniczny wygląd doskonale odzwierciedlają solidność oraz
            nowoczesność, które są fundamentem marki.
          </p>

          <p className="font-base text-gray-700">
            W identyfikacji zastosowałem dwie wersje rodziny: TT Octosquares
            oraz TT Octosquares Extended. Podstawowa wersja, w grubościach od
            Regular do Bold, jest używana w nagłówkach i tekstach
            informacyjnych. Wersja Extended została wykorzystana w logo oraz w
            nazwach produktów, aby nadać im wyjątkowy, charakterystyczny wygląd
            i podkreślić ich indywidualny charakter.
          </p>
        </Container>
      </article>

      <div className="relative w-full h-auto overflow-hidden px-4 md:px-8">
        <Image
          src="/images/case-studies/rem-met/rem-met-product-names.png"
          alt="Nazwy produktów REM-MET: Gecko, Falcon i Rhino"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="flex px-4 md:px-8 gap-4 md:gap-8">
        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/images/case-studies/rem-met/rem-met-mockup-box-no-light.png"
            alt="Opakowania na akcesoria REM-MET na czarnym tle"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
        </div>

        <article className="relative w-full h-auto overflow-hidden">
          <Container className="flex flex-col gap-6 md:gap-10 text-gray-900">
            <h2 className="text-2xl md:text-4xl font-bold">
              Użyliśmy nazw zwierząt, aby podkreślić unikalny charakter
              produktów.
            </h2>
            <p className="font-base text-gray-700">
              Aby wyróżnić ofertę REM-MET, systemom wygrodzeń nadano unikalne,
              łatwe do zapamiętania nazwy inspirowane zwierzętami. FALCON to
              lekkie wygrodzenia siatkowe, RHINO – wytrzymałe wygrodzenia
              metalowe, a GECKO – przezroczyste wygrodzenia z poliwęglanu. Takie
              nazwy zapadają w pamięć klientów i pozwalają łatwo rozwijać ofertę
              w przyszłości.
            </p>
          </Container>
        </article>
      </div>

      <div className="relative w-full h-auto overflow-hidden px-4 md:px-8">
        <Image
          src="/images/case-studies/rem-met/rem-met-binder-mockup-black.png"
          alt="Mockup segregatora z projektami REM-MET"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>

      <article className="relative w-full h-auto overflow-hidden">
        <Container className="flex flex-col gap-6 md:gap-10 text-gray-900 px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl font-bold">
            Marketingowe hasła w komunikacji REM-MET
          </h2>
          <p className="font-base text-gray-700">
            W ramach współpracy wymyśliłem również strategie marketingową
            REM-MET, analizując problemy i potrzeby grupy docelowej. W swojej
            komunikacji z klientem REM-MET stawia siebie w pozycji lidera, który
            chce rozwiązać problemy związane z bezpieczeństwem swoich odbiorców.
          </p>
        </Container>
      </article>

      <div className="flex px-4 md:px-8 gap-4 md:gap-8">
        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/images/case-studies/rem-met/rem-met-mockup-haning-poster-square.png"
            alt="Opakowania na akcesoria REM-MET na czarnym tle"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/images/case-studies/rem-met/rem-met-mockup-mug-pro-square.png"
            alt="Opakowania na akcesoria REM-MET na czarnym tle"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      <div className="relative w-full h-auto overflow-hidden px-4 md:px-8">
        <Image
          src="/images/case-studies/rem-met/rem-met-bus-stop.png"
          alt="Opakowania na akcesoria REM-MET na czarnym tle"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>

      <article className="relative w-full h-auto overflow-hidden px-4 md:px-8">
        <Container className="flex flex-col gap-6 md:gap-10 text-gray-900">
          <h2 className="text-2xl md:text-4xl font-bold">
            Interfejs, który sprzedaje.
          </h2>
          <p className="font-base text-gray-700">
            Strona internetowa miała dwa główne zadania. Po pierwsze, w
            atrakcyjny i przyjazny dla użytkownika sposób przedstawić ofertę
            produktów. Po drugie, skutecznie prowadzić klienta do procesu
            zakupowego. Osiągnąłem to dzięki przemyślanej strukturze strony,
            zachowaniu wizualnego balansu oraz zastosowaniu odpowiedniego
            copywritingu.
          </p>
        </Container>
      </article>

      <div className="flex gap-4 md:gap-8 px-4 md:px-8">
        <div className="flex flex-col justify-between">
          <div className="relative w-full h-auto overflow-hidden">
            <Image
              src="/images/case-studies/rem-met/rem-met-website-o-nas.png"
              alt="Strona REM-MET O Nas"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
              priority
            />
          </div>
          <div className="relative w-full h-auto overflow-hidden">
            <Image
              src="/images/case-studies/rem-met/rem-met-mockup-catalog.png"
              alt="Katalog REM-MET na rok 2025"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/images/case-studies/rem-met/rem-met-website-product.png"
            alt="Strona produktu REM-MET"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      <div className="text-gray-900">
        <Container className="px-4 md:px-8 flex flex-col items-start max-w-md gap-4 py-10">
          <Link
            href="https://www.rem-met.com"
            target="_blank"
            className="flex gap-1 items-center justify-center "
          >
            <Image
              src="/images/icons/website-icon.png"
              width={32}
              height={32}
              alt="Website icon"
            />
            SPRAWDŹ OFICJALNĄ{" "}
            <span className="font-bold text-[#425ba9] hover:text-[#2a3a74] animate-pulse">
              STRONĘ REM-MET
            </span>
          </Link>

          <Link
            href="https://www.behance.net/gallery/234245601/REM-MET"
            target="_blank"
            className="flex gap-1 items-center justify-center"
          >
            <Image
              src="/images/icons/behance-icon.png"
              width={32}
              height={32}
              alt="Behance icon"
            />
            SPRAWDŹ REM-MET
            <span className="font-bold  hover:text-yellow-500">NA BEHANCE</span>
          </Link>
        </Container>
      </div>
    </section>
  );
}
