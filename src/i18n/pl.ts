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
        "Consulting produktowy i realizacja oprogramowania dla founderów i małych zespołów, z jasną odpowiedzialnością za decyzje produktowe, granice systemu, review i rezultat.",
      openGraph: {
        title: "Consulting | Piotr Kacała",
        description:
          "Consulting produktowy i realizacja oprogramowania dla founderów i małych zespołów, z jasną odpowiedzialnością za decyzje, granice systemu, review i rezultat.",
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
    title: "Od niejasnego pomysłu do działającego produktu.",
    intro:
      "Pracuję z founderami i małymi zespołami, które chcą zamienić pomysł w użyteczny produkt bez budowania całego zespołu produktowego. Biorę odpowiedzialność za doprecyzowanie zakresu, decyzje produktowe w jego ramach i cały cykl realizacji: specyfikację, granice systemu, review, integrację, wdrożenie i iterację.",
    homeLabel: "Wróć na stronę główną",
    scope: {
      heading: "Zacznijmy od zakresu",
      paragraphs: [
        "Jeśli pomysł jest jeszcze nieprecyzyjny, pierwszym sensownym krokiem jest doprecyzowanie produktu z jasno określonym rezultatem. Celem nie jest duży dokument strategiczny. Chodzi o to, żeby projekt stał się wystarczająco konkretny do realizacji. Ten etap może też wcześnie pokazać, że jeszcze nie warto go budować.",
        "Jeśli masz już konkretny brief, możemy od razu przejść do planu budowy.",
      ],
      deliverablesHeading: "Etap doprecyzowania obejmuje:",
      deliverables: [
        "praktyczny brief produktowy",
        "ograniczony zakres pierwszej wersji i jawna lista rzeczy na później",
        "najważniejsze user flows, ograniczenia i ryzyka",
        "rekomendowany kolejny krok",
        "notatki architektoniczne i zarys implementacji, jeśli pomysł jest gotowy do realizacji",
      ],
    },
    delivery: {
      heading: "Od zakresu do wdrożenia",
      paragraphs: [
        "Jeśli projekt jest dobrze dopasowany, mogę przeprowadzić go przez cały proces: specyfikację, implementację, testy, deploy i iterację. To podejście najlepiej sprawdza się przy prototypach, narzędziach wewnętrznych, automatyzacjach i pierwszych wersjach produkcyjnych, kiedy jedna osoba powinna trzymać kontekst produktu od początku do końca.",
      ],
    },
    ai: {
      heading: "AI jest metodą implementacji",
      paragraphs: [
        "Agenty AI generują implementację. Ja nadal odpowiadam za decyzje produktowe, granice systemu, review, integrację i rezultat. Zmienił się interfejs pracy, nie odpowiedzialność.",
        "Jeśli AI ma być częścią samego produktu, pomagam też zaprojektować rolę modelu: co powinien robić, czego nie wolno mu rozstrzygać, z jakich narzędzi może korzystać, co może zapisywać i jakie guardrails kształtują doświadczenie użytkownika.",
      ],
    },
    fit: {
      goodHeading: "Dobre dopasowanie",
      goodItems: [
        "founderzy na wczesnym etapie z pomysłem, który potrzebuje struktury",
        "małe firmy bez pełnego zespołu produktowego",
        "prototypy, narzędzia wewnętrzne, automatyzacje i pierwsze wersje produkcyjne",
        "praca, w której liczą się odpowiedzialność i praktyczne decyzje, a nie realizacja kolejki ticketów",
      ],
      notHeading: "Kiedy lepiej wybrać kogoś innego",
      notItems: [
        "staff augmentation bez szerszej odpowiedzialności",
        "realizacja samych ticketów bez kontekstu produktowego",
        "projekty wymagające przede wszystkim głębokiej specjalizacji w jednym frameworku",
        "odpowiedzialność za rezultat bez uprawnień do podejmowania decyzji potrzebnych do jego dostarczenia",
      ],
    },
    selectedWork: {
      heading: "Wybrane projekty",
      body: `Strona główna prowadzi do opublikowanego rozszerzenia, publicznego repozytorium z czytelną dokumentacją, local-first narzędzia i zadaniowego benchmarku agentów programistycznych z ${phoneticBenchmarkPublicationStats.totalRunCount} wynikami, które można samodzielnie sprawdzić.`,
      linkLabel: "Zobacz wybrane projekty",
      href: "/pl/#projects",
    },
    contact: {
      heading: "Porozmawiajmy",
      body: "Napisz krótko: co chcesz zbudować, dla kogo i co istnieje dzisiaj.",
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
