import type { SiteCopy } from "./schema.ts";
import { phoneticBenchmarkPublicationStats } from "../site/phonetic-benchmark.ts";

export const pl = {
  lang: "pl",
  title: "Piotr Kacala",
  metadata: {
    title: "Piotr Kacała",
    description:
      "Piotr Kacała jest Product Builderem odpowiedzialnym za decyzje produktowe, granice systemu, review i rezultat; agenty AI są interfejsem implementacji.",
    openGraph: {
      title: "Piotr Kacała",
      description:
        "Agenty AI są interfejsem implementacji. Ja odpowiadam za decyzje produktowe, granice systemu, review i rezultat.",
      type: "website",
      locale: "pl_PL",
      siteName: "Piotr Kacała",
      url: "https://piotrkacala.pl/pl/",
      image: {
        url: "https://piotrkacala.pl/og/piotr-kacala-pl.png",
        width: 1200,
        height: 630,
        alt: "Piotr Kacała — Product Builder. Na styku produktu, designu, QA i developmentu.",
      },
    },
  },
  languageSwitcher: {
    ariaLabel: "Przełącznik języka",
    en: "EN",
    pl: "PL",
  },
  hero: {
    headline: "Product Builder",
    statement:
      "Agenty AI są interfejsem implementacji. Ja odpowiadam za decyzje produktowe, granice systemu, review i rezultat.",
    expansion:
      "Od 2013 roku pracuję na styku developmentu, designu, produktu i QA. Dzięki temu potrafię zamienić niejasny pomysł w konkretny system, prowadzić agenty językiem każdej z tych domen, zintegrować rezultat i zdecydować, co jest gotowe do wdrożenia.",
  },
  projects: {
    heading: "Projekty",
    arc: "Publiczne projekty pokazują tę metodę z różnych stron: istniejący codebase, opublikowane rozszerzenie zbudowane z pisemnej specyfikacji, to repozytorium jako sprawdzalny artefakt workflow i zadaniowy benchmark z archiwalnymi wynikami.",
    items: [
      {
        title: "Phonetic Alphabet Trainer",
        titleLang: "en",
        blocks: [
          {
            type: "paragraph",
            text: "Otworzyłem ponownie istniejący projekt w React, żeby sprawdzić, jak AI radzi sobie z istniejącym codebase i porównać modele oraz IDE. Po drodze odkryłem, że opublikowany przez Ministerstwo Obrony Narodowej alfabet fonetyczny pomija część liter. Aplikacja działa po polsku i angielsku, ma punktację, dwa tryby odpowiedzi i śledzenie serii.",
          },
          {
            type: "paragraph",
            text: "Projekt stał się później bazą briefu produktowego dla Phonetic Benchmark.",
          },
          {
            type: "link",
            href: "https://piotrkacala.github.io/phonetic/",
            label: "Link: piotrkacala.github.io/phonetic/",
            machineLabel: "Link",
            external: true,
            externalLabel: "(otwiera się w nowej karcie)",
          },
        ],
      },
      {
        title: "Surfaced",
        titleLang: "en",
        blocks: [
          {
            type: "paragraph",
            text: "Surfaced był moim pierwszym projektem zbudowanym od zera: napisałem docs-first specyfikację, a do implementacji wykorzystałem agenty AI. Rozszerzenie śledzi głębokość scrolla i dodaje coraz bardziej bezpośrednie przypomnienia w miarę zagłębiania się użytkownika w interfejs bez naturalnego końca. Przeszło publiczny review Mozilli i jest dostępne w Firefox Add-ons oraz Chrome Web Store.",
          },
          {
            type: "link",
            href: "https://addons.mozilla.org/firefox/addon/surfaced/",
            label: "Firefox Add-ons: Surfaced",
            machineLabel: "Firefox Add-ons",
            external: true,
            externalLabel: "(otwiera się w nowej karcie)",
          },
          {
            type: "link",
            href: "https://chromewebstore.google.com/detail/surfaced/bpbidikjpaffmpcbincadomhbfnoaaem",
            label: "Chrome Web Store: Surfaced",
            machineLabel: "Chrome Web Store",
            external: true,
            externalLabel: "(otwiera się w nowej karcie)",
          },
        ],
      },
      {
        title: "Ta strona",
        blocks: [
          {
            type: "paragraph",
            text: "To repozytorium pokazuje metodę pracy w sprawdzalnej formie. Ja definiuję produkt, model treści, granice systemu i kryteria review; agenty implementują według dokumentacji; ja integruję i weryfikuję rezultat. Repo jest publiczne i celowo czytelne — razem z AGENTS.md, katalogiem docs, testami i historią commitów.",
          },
          {
            type: "paragraph",
            text: "Strona hostuje teraz także niewielkie publiczne narzędzia. Pierwszym z nich jest 400m: local-first narzędzie do analizy GPX z bieżni, które szacuje skorygowany dystans z postępu po okrążeniach zamiast z surowej długości śladu GPS.",
          },
          {
            type: "link",
            href: "https://piotrkacala.pl/400m/",
            label: "Narzędzie: piotrkacala.pl/400m/",
            machineLabel: "Narzędzie",
            external: true,
            externalLabel: "(otwiera się w nowej karcie)",
          },
          {
            type: "link",
            href: "https://github.com/piotrkacala/personal-website",
            label: "Repo: github.com/piotrkacala/personal-website",
            machineLabel: "Repo",
            external: true,
            externalLabel: "(otwiera się w nowej karcie)",
          },
        ],
      },
      {
        title: "Phonetic Benchmark",
        titleLang: "en",
        blocks: [
          {
            type: "paragraph",
            text: `Praktyczna, zadaniowa ewaluacja outputów agentów programistycznych. Raport obejmuje teraz ${phoneticBenchmarkPublicationStats.totalRunCount} archiwalnych wyników: ${phoneticBenchmarkPublicationStats.v2.runCount} w aktualnym batchu v2 i ${phoneticBenchmarkPublicationStats.v1.runCount} w oryginalnym snapshocie v1. Definiuję kontrakt i sprawdzam każdy wynik pod kątem wymaganego zachowania, UX, testów i materiałów potwierdzających sposób dostarczenia. To nie jest uniwersalny ranking modeli.`,
          },
          {
            type: "link",
            href: "https://piotrkacala.pl/pl/phonetic-benchmark/",
            label: "Raport: piotrkacala.pl/pl/phonetic-benchmark/",
            machineLabel: "Raport",
          },
          {
            type: "link",
            href: "https://piotrkacala.pl/pl/phonetic-benchmark/gallery/",
            label: "Galeria: piotrkacala.pl/pl/phonetic-benchmark/gallery/",
            machineLabel: "Galeria",
          },
          {
            type: "link",
            href: "https://piotrkacala.pl/phonetic-benchmark/methodology/",
            label:
              "Metodologia (EN): piotrkacala.pl/phonetic-benchmark/methodology/",
            machineLabel: "Metodologia (EN)",
          },
          {
            type: "link",
            href: "https://github.com/piotrkacala/phonetic-benchmark",
            label: "Pakiet: github.com/piotrkacala/phonetic-benchmark",
            machineLabel: "Publiczny pakiet benchmarku",
            external: true,
            externalLabel: "(otwiera się w nowej karcie)",
          },
        ],
      },
    ],
  },
  contact: {
    heading: "Kontakt",
    prompt: "Napisz do mnie",
    email: "kontakt@piotrkacala.pl",
    consultingLink: {
      href: "/pl/consulting/",
      label: "Szukasz wsparcia produktowego? Zobacz, jak pracuję.",
    },
  },
  consulting: {
    lang: "pl",
    metadata: {
      title: "Consulting | Piotr Kacała",
      description:
        "Realizacja projektów webowych dla founderów i małych zespołów, od zdefiniowania pierwszej wersji do uzgodnionego rezultatu.",
      openGraph: {
        title: "Consulting | Piotr Kacała",
        description:
          "Jedna odpowiedzialna osoba prowadzi projekt webowy od zdefiniowania pierwszej wersji do uzgodnionego rezultatu.",
        type: "website",
        locale: "pl_PL",
        siteName: "Piotr Kacała",
        url: "https://piotrkacala.pl/pl/consulting/",
        image: {
          url: "https://piotrkacala.pl/og/piotr-kacala-pl.png",
          width: 1200,
          height: 630,
          alt: "Piotr Kacała — Product Builder. Na styku produktu, designu, QA i developmentu.",
        },
      },
    },
    eyebrow: "Consulting",
    title:
      "Jedna osoba odpowiada za projekt od określenia zakresu po realizację.",
    intro:
      "Pracuję z founderami, właścicielami firm i małymi zespołami, które mają konkretny projekt, ale nie chcą budować i koordynować tymczasowego zespołu produktowego. Definiuję realistyczną pierwszą wersję, buduję ją i sprawdzam, a następnie doprowadzam pracę do punktu uzgodnionego dla danego projektu lub etapu.",
    homeLabel: "Wróć na stronę główną",
    projectExamples: {
      heading: "Projekty pasujące do tego modelu",
      intro:
        "Najlepszym dopasowaniem jest projekt webowy o określonym zakresie, z konkretnym celem biznesowym, dostępną wiedzą domenową i przestrzenią do podejmowania decyzji potrzebnych do realizacji.",
      items: [
        {
          heading: "Narzędzia do wewnętrznych procesów",
          body: "Aplikacje zastępujące arkusze, koordynację przez e-mail, powtarzalną administrację lub inne ręczne procesy. Mogą to być interfejsy operacyjne, dashboardy i rozwiązania do niestandardowego przetwarzania danych.",
        },
        {
          heading: "Platformy webowe o określonym zakresie",
          body: "Portale dla klientów, wykonawców lub partnerów, zawierające konta, role, przechowywanie danych, wymianę plików oraz widoki administracyjne. Zakres pierwszej wersji jest świadomie ograniczony, aby można ją było dostarczyć i sprawdzić przed dalszym rozwojem.",
        },
        {
          heading: "Strony produktowe i firmowe",
          body: "Strony produktu, kampanii, firmy lub usługi. Realizacja może też obejmować deploy, pomoc w wyborze hostingu i ukierunkowane wsparcie w prezentacji produktu.",
        },
      ],
    },
    clientValue: {
      heading:
        "Jedna osoba odpowiedzialna za kontekst projektu i drogę do rezultatu",
      paragraphs: [
        "Utrzymuję połączenie między zamierzonym rezultatem, zakresem, granicami systemu, implementacją i bezpośrednim sprawdzeniem produktu. Nie musisz zamieniać pracy w kolejkę ticketów ani samodzielnie koordynować kilku wykonawców.",
      ],
      items: [
        "realistyczna pierwsza wersja i jasno opisane elementy poza zakresem",
        "jedna osoba odpowiedzialna za zachowanie kontekstu produktu i decyzje dotyczące realizacji",
        "implementacja, review, testy i bezpośrednie sprawdzenie produktu",
        "jasna komunikacja postępu, przeszkód, decyzji i ryzyka",
        "doprowadzenie prac do punktu uzgodnionego przed rozpoczęciem danego etapu",
      ],
      specialistBoundary:
        "Jedna odpowiedzialna osoba nie zastępuje każdego specjalisty. Niezależne QA oraz wsparcie z obszaru bezpieczeństwa, niezawodności, infrastruktury, prawa lub zgodności regulacyjnej są dodawane, kiedy wymaga tego ryzyko projektu.",
    },
    engagement: {
      heading: "Od pierwszego kontaktu do uzgodnionego rezultatu",
      steps: [
        {
          heading: "1. Sprawdzenie dopasowania",
          paragraphs: [
            "Pierwszy kontakt jest bezpłatny. Nie potrzebujesz kompletnego briefu. Ustalamy, co chcesz osiągnąć, co istnieje dzisiaj, gdzie znajdują się główne niewiadome i czy projekt ma realistyczną drogę do realizacji.",
          ],
        },
        {
          heading: "2. Zdefiniowanie pierwszej wersji",
          paragraphs: [
            "Jeśli rezultat jest już wystarczająco jasny, określenie pierwszej wersji może zostać włączone do oferty na cały projekt. Jeżeli przed rzetelnym ustaleniem zakresu i ceny trzeba rozstrzygnąć istotne niewiadome, mogę zaproponować osobny płatny etap doprecyzowania projektu.",
          ],
          deliverables: [
            "praktyczny brief produktu",
            "zakres pierwszej wersji i jawna lista rzeczy pozostawionych na później",
            "główne scenariusze użytkownika, ograniczenia, wyłączenia i ryzyka",
            "rekomendowana droga implementacji i realizacji",
          ],
        },
        {
          heading: "3. Budowa, weryfikacja i przekazanie",
          paragraphs: [
            "Gdy obie strony potwierdzą, co oznacza ukończenie, implementuję uzgodniony zakres, wykonuję review i testy, pokazuję działające oprogramowanie w użytecznych momentach i doprowadzam projekt do uzgodnionego punktu końcowego.",
          ],
        },
      ],
    },
    pricingDelivery: {
      heading: "Cena wynika z jasno określonego rezultatu",
      paragraphs: [
        "Dla projektu lub etapu mogę podać stałą cenę, gdy obie strony potwierdzą, co oznacza jego ukończenie. Jeśli jest to możliwe, przed rozpoczęciem płatnej pracy podaję orientacyjny przedział cenowy dla całości. Kolejne etapy mogą zostać wycenione dokładniej po doprecyzowaniu projektu. Nowe lub zmienione wymagania mogą wpłynąć na czas i cenę.",
        "Uzgodnionym punktem końcowym może być przekazanie działającego kodu zespołowi klienta, wdrożona aplikacja albo wdrożenie z krótkim okresem stabilizacji. Współpraca może też przejść w dalszy rozwój produktu. Przed rozpoczęciem pracy ustalamy odpowiedzialność za hosting, usługi zewnętrzne, deploy, dostępy i bieżące działanie systemu.",
        "Utrzymanie i dalszy rozwój są opcjonalne. Omawiamy je po poznaniu potrzeb operacyjnych produktu, zamiast automatycznie włączać je do każdego projektu.",
      ],
    },
    collaboration: {
      heading: "Praca asynchroniczna, z jasnym wglądem w postęp",
      paragraphs: [
        "Pracuję samodzielnie i przekazuję jasne podsumowania postępu. Pytania blokujące oddzielam od zwykłych aktualizacji, a działające wersje i demonstracje wykorzystuję wtedy, gdy pomagają ocenić rezultat.",
        "Ten model działa, kiedy dostępne są właściwa osoba decyzyjna i wiedza domenowa, a klient może dostarczyć treści, dane, dostępy i informacje zwrotne potrzebne do realizacji.",
      ],
    },
    ai: {
      heading: "AI wspiera metodę realizacji",
      paragraphs: [
        "Agenty AI są interfejsem implementacji. Nadal odpowiadam za decyzje produktowe, granice systemu, review i rezultat. Klient kupuje rezultat oraz odpowiedzialność za jego dowiezienie, a nie dostęp do mojego wewnętrznego sposobu pracy z AI.",
        "Jeżeli AI ma być częścią produktu, jego rola nadal potrzebuje jawnych granic: co model może robić, czego nie powinien rozstrzygać, z jakich narzędzi może korzystać, co może zapisywać i jak jego zachowanie będzie sprawdzane.",
      ],
    },
    fit: {
      goodHeading: "Dobre dopasowanie",
      goodItems: [
        "konkretny cel biznesowy i projekt webowy o określonym zakresie lub pierwsza wersja",
        "dostępne osoby decyzyjne i eksperci domenowi",
        "gotowość do priorytetyzacji i pozostawienia mniej wartościowego zakresu na później",
        "jasna odpowiedzialność za zatwierdzenie zakresu i odbiór rezultatu",
        "rezultat możliwy do dostarczenia i sprawdzenia w sensownych etapach",
        "ryzyko techniczne i operacyjne, które jest zrozumiane, ograniczone lub wsparte przez właściwego specjalistę",
      ],
      notHeading: "Kiedy lepiej wybrać kogoś innego",
      notItems: [
        "dołączenie do istniejącej kolejki ticketów w roli brakującego developera",
        "odpowiedzialność za rezultat bez wystarczającego wpływu na decyzje dotyczące realizacji",
        "projekty wymagające rozbudowanej koordynacji między kilkoma zespołami",
        "praca wymagająca specjalistycznej wiedzy z obszaru bezpieczeństwa, zgodności regulacyjnej, niezawodności lub infrastruktury bez możliwości włączenia odpowiedniego wsparcia",
      ],
    },
    evidence: {
      heading: "Dowody stojące za ofertą",
      paragraphs: [
        "Pracuję w IT od 2013 roku, łącząc doświadczenie w developmencie, produkcie, QA, designie, realizacji i pracy z klientem. Wcześniej moja działalność doradcza rozwijała się dzięki wracającym klientom i poleceniom, również w okresach, gdy samodzielnie odpowiadałem jednocześnie za relację z klientem i realizację.",
        `Moje publiczne projekty pokazują ten sposób pracy z innej strony: publicznie dostępne narzędzia przeglądarkowe, małe użyteczne aplikacje webowe, otwarte repozytoria, testy, dokumentację realizacji oraz udokumentowaną ewaluację agentów programistycznych z ${phoneticBenchmarkPublicationStats.totalRunCount} rezultatami, które można samodzielnie sprawdzić.`,
      ],
      linkLabel: "Zobacz wybrane projekty",
      href: "/pl/#projects",
    },
    contact: {
      heading: "Napisz, co chcesz osiągnąć",
      body: "Opisz krótko, jakiego rezultatu potrzebujesz i co istnieje dzisiaj. Powiem Ci, czy projekt jest dobrze dopasowany i jaki kolejny krok ma sens.",
      email: "kontakt@piotrkacala.pl",
    },
  },
} satisfies SiteCopy & {
  languageSwitcher: {
    ariaLabel: string;
    en: string;
    pl: string;
  };
};
