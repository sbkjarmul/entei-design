import Container from "@/components/Container";
import Image from "next/image";

export default function PortfolioCeramidoCaseStudy() {
  return (
    <section className="flex flex-col gap-4 md:gap-8 min-h-screen bg-white relative pb-8">
      <div className="relative w-full h-auto overflow-hidden">
        <Image
          src="/images/case-studies/ceramido/ceramido-black-billboard-mockup.png"
          alt="Billboard Ceramido"
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
                Projektowanie logo, rebranding, opakowania produktów, materiały
                promocyjne, strategia, identyfikacja wizualna, identyfikacja
                werbalna, wytyczne do sesji zdjęciowej
              </span>
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl md:text-8xl font-bold text-gray-900">
            Ceramido
          </h1>

          <p className="font-base text-gray-700">
            Ceramido powstało jako odpowiedź na rosnące potrzeby kobiet 30+,
            które dbają o zdrowie i skórę, a jednocześnie szukają czegoś więcej
            niż zwykły suplement diety. Celem klienta było stworzenie marki,
            która łączy naukową skuteczność z luksusowym doświadczeniem.
          </p>

          <p className="font-base text-gray-700">
            Naszym zadaniem było opracowanie nowoczesnej identyfikacji wizualnej
            i projektów opakowań, które wyróżnią suplement na rynku oraz nadadzą
            mu charakter luksusowego gadżetu. Branding miał rezonować z tagline
            „Natura spotyka luksus”, przyciągając uwagę estetyką, a jednocześnie
            budząc zaufanie naukową precyzją.
          </p>
        </Container>
      </article>

      <div className="relative w-full h-auto overflow-hidden p-4 md:p-8 ">
        <Image
          src="/images/case-studies/ceramido/ceramido-day-product.png"
          alt="Suplement diety Ceramido DAY"
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
            Intensywny 3-tygodniowy proces szkicowania.
          </h2>
          <p className="font-base text-gray-700">
            Prace nad wizerunkiem Ceramido rozpoczęły się od intensywnego,
            trzytygodniowego procesu szkicowania. Analizowałem różne sposoby
            łączenia znaków symbolizujących wartości marki, w wyniku czego
            postały dziesiątki wartiantów logo.
          </p>
        </Container>
      </article>

      <div className="relative w-full h-auto overflow-hidden p-4 md:p-8 ">
        <Image
          src="/images/case-studies/ceramido/ceramido-sketching.png"
          alt="Etap szkicowania w podczas projektowania marki Ceramido"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="flex-col-reverse md:flex-row flex px-4 md:px-8 gap-4 md:gap-8">
        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/images/case-studies/ceramido/ceramido-logo-explained.png"
            alt="REM-MET logo na czarnym tle"
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
              Znak marki jako połączenie symboli.
            </h2>
            <p className="font-base text-gray-700">
              Logo Ceramido zostało oparte na pięciu symbolach, które
              odzwierciedlają zarówno naukowy, jak i luksusowy charakter marki.
              Inspiracją były: słońce i księżyc jako odniesienie do suplementów
              na dzień i na noc, kryształ symbolizujący luksus, molekuła
              podkreślająca naukowe podstawy działania produktu oraz struktura
              skóry jako bezpośrednie nawiązanie do jego przeznaczenia.
            </p>
          </Container>
        </article>
      </div>

      <div className="relative w-full h-auto overflow-hidden px-4 md:px-8">
        <Image
          src="/images/case-studies/ceramido/ceramido-logo-grid.png"
          alt="REM-MET logo na czarnym tle"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="flex-col-reverse md:flex-row flex px-4 md:px-8 gap-4 md:gap-8">
        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/images/case-studies/ceramido/ceramido-luxury-billboard-box.png"
            alt="Billboard przedstawiający kolory Ceramido"
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
              Kolorystyka zainspirowana naturą.
            </h2>
            <p className="font-base text-gray-700">
              Głównymi kolorami są odcienie białego piasku pustyni i czarnego
              piasku wulkanicznego, które symbolizują suchą skórę i nawilżenie
              oraz barwy dnia i nocy.
            </p>
            <p className="font-base text-gray-700">
              Kolorami uzupełniącymi są kolor skóry oraz delikatny szary, co w
              połączeniu z barwami podstawowymi przedstawia markę jako naturalną
              oraz potwierdzoną naukowo.
            </p>
          </Container>
        </article>
      </div>

      <div className="relative w-full h-auto overflow-hidden px-4 md:px-8">
        <Image
          src="/images/case-studies/ceramido/ceramido-posters-night.png"
          alt="Plakaty Ceramido na szarej ścianie"
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
            Typografia - Elegancja i naukowy charakter
          </h2>
          <p className="font-base text-gray-700">
            Do identyfikacji wizualnej Ceramido wybrałem nowoczesną czcionkę,
            która łączy elegancję z naukowym charakterem produktu. Geometryczne
            formy liter harmonizują z okrągłym kształtem logo, podkreślając
            precyzję i luksusowy wymiar suplementu.
          </p>

          <p className="font-base text-gray-700">
            Czcionka sprawdza się zarówno w nagłówkach, gdzie buduje wyrazisty i
            elegancki wygląd, jak i w tekstach informacyjnych, zapewniając
            spójność i czytelność. Dzięki temu komunikacja marki Ceramido jest
            nowoczesna, profesjonalna i łatwo rozpoznawalna.
          </p>
        </Container>
      </article>

      <div className="flex flex-col relative w-full h-auto gap-8 overflow-hidden px-4 md:px-8">
        <Image
          src="/images/case-studies/ceramido/ceramido-wordmark-grid-black.png"
          alt="Siatka projektowa dla czcionki Ceramido"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
        <Image
          src="/images/case-studies/ceramido/ceramido-posters-multiple.png"
          alt="Plakaty Ceramido na mieście"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="flex-col-reverse md:flex-row flex px-4 md:px-8 gap-4 md:gap-8">
        <div className="relative w-full h-auto overflow-hidden">
          <Image
            src="/images/case-studies/ceramido/ceramido-box-day.png"
            alt="Finalne opakowanie suplementu Ceramido DAY wersja metalowa"
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
              Minimalistyczny projekt opakowań.
            </h2>
            <p className="font-base text-gray-700">
              Opakowania Ceramido zostały zaprojektowane tak, aby chronić
              suplement przed promieniami słonecznymi, co jest istotne dla
              zachowania jego jakości. Wybraliśmy metalowe słoiki w kolorze
              kości słoniowej dla wersji DAY oraz w grafitowej barwie dla wersji
              NIGHT.
            </p>
            <p className="font-base text-gray-700">
              Minimalistyczna etykieta została wzbogacona o subtelny wzór
              cząsteczek skóry, który buduje wizerunek marki w świadomości
              konsumentów. Takie rozwiązanie łączy funkcjonalność z elegancją i
              pozwala wyróżnić produkt na rynku, jednocześnie podkreślając jego
              luksusowy charakter.
            </p>
          </Container>
        </article>
      </div>

      <div className="relative w-full h-auto overflow-hidden px-4 md:px-8">
        <Image
          src="/images/case-studies/ceramido/ceramido-shopping-bag-pattern.png"
          alt="Torba zakupowa Ceramido ze wzorem skóry"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="relative w-full h-auto overflow-hidden px-4 md:px-8">
        <Image
          src="/images/case-studies/ceramido/ceramido-instagram.png"
          alt="Budynek siedziby firmy Ceramido"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="relative w-full h-auto overflow-hidden px-4 md:px-8">
        <Image
          src="/images/case-studies/ceramido/ceramido-light-box.png"
          alt="Budynek siedziby firmy Ceramido"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>
    </section>
  );
}
