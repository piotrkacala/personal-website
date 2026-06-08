import type { SiteCopy } from "./schema.ts";

export const pl = {
  lang: "pl",
  title: "Piotr Kacala",
  metadata: {
    title: "Piotr Kacała — Product Builder",
    description:
      "Strona Piotra Kacały. Agenty AI są interfejsem budowy. Wyróżnikiem są ocena i decyzje na styku produktu, designu, QA i developmentu.",
    openGraph: {
      title: "Piotr Kacała — Product Builder",
      description:
        "Agenty AI są interfejsem budowy. Wyróżnikiem są ocena i decyzje na styku produktu, designu, QA i developmentu.",
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
    expansion:
      "W IT jestem od 2013 roku, na styku developmentu, designu, produktu i QA — nigdy przywiązany do jednego narzędzia, zawsze skupiony na rezultacie. Od początku 2026 buduję w całości przez agenty AI, zero-code. Przewaga nie leży w toolingu, tylko w tym, że wiem, jakie pytania zadać, zanim problem w ogóle się ujawni, i potrafię promptować w języku danej domeny: jak developer, QA engineer, designer albo product manager. AI działa najlepiej właśnie na takim materiale. Interfejs stał się pisaniem, a ja przez całą karierę pracowałem przede wszystkim w tekście.",
  },
  projects: {
    heading: "Projekty",
    arc: "Każdy projekt to świadomie wybrany kolejny krok. Sprawdzenie AI na istniejącym codebase. Budowa od zera, docs-first, zero-code. Pełny produkt dla realnego klienta. Ta strona jako publiczny artifact. Potem publiczna ewaluacja agentów programistycznych.",
    items: [
      {
        title: "Phonetic Alphabet Trainer",
        titleLang: "en",
        blocks: [
          {
            type: "paragraph",
            text: "Istniejący projekt w React, otwarty ponownie, żeby sprawdzić, jak AI radzi sobie z istniejącym codebase — i porównać modele oraz IDE. Po drodze wyszły na jaw brakujące litery w oficjalnym alfabecie fonetycznym Ministerstwa Obrony Narodowej. Działa po angielsku i po polsku, ma scoring, dwa tryby odpowiedzi i śledzenie serii.",
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
            text: "Pierwszy projekt zbudowany od zera, docs-driven, zero-code. Rozszerzenie do przeglądarki, które śledzi głębokość scrolla i powiadamia, gdy zajdziesz za daleko — trzy strefy głębokości i rosnący poziom pilności. Przeszło publiczny review Mozilli i jest dostępne w Firefox Add-ons oraz Chrome Web Store.",
          },
          {
            type: "link",
            href: "https://addons.mozilla.org/firefox/addon/surfaced/",
            label: "Firefox: addons.mozilla.org/firefox/addon/surfaced/",
            machineLabel: "Firefox Add-ons",
            external: true,
            externalLabel: "(otwiera się w nowej karcie)",
          },
          {
            type: "link",
            href: "https://chromewebstore.google.com/detail/surfaced/bpbidikjpaffmpcbincadomhbfnoaaem",
            label:
              "Chrome: chromewebstore.google.com/detail/surfaced/bpbidikjpaffmpcbincadomhbfnoaaem",
            machineLabel: "Chrome Web Store",
            external: true,
            externalLabel: "(otwiera się w nowej karcie)",
          },
        ],
      },
      {
        title: "Prywatna platforma do audytów",
        blocks: [
          {
            type: "paragraph",
            text: "Pierwszy pełny projekt produkcyjny, zbudowany spec-first dla realnego klienta. Stan na kwiecień 2026: ~21,000 linii kodu produkcyjnego, ~9,400 linii testów i 295 commitów.",
          },
          {
            type: "paragraph",
            text: "Prywatny projekt kliencki — bez publicznego linku do działającej aplikacji.",
            tone: "aside",
          },
        ],
      },
      {
        title: "Ta strona",
        blocks: [
          {
            type: "paragraph",
            text: "Zbudowana tak samo — spec-first, docs-driven, zero-code — ale z jednym dodatkiem: agent orkiestrujący, który samodzielnie przechodził przez plan implementacji, generował prompty, czytał wyniki i obsługiwał przegląd zmian. To pierwszy projekt, w którym workflow zarządzał samym sobą. Repo jest publiczne i celowo czytelne: AGENTS.md, pełny katalog docs, czysta historia commitów.",
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
            text: "Praktyczna, zadaniowa ewaluacja outputów agentów programistycznych. Modele dostają docs-first brief tej samej małej aplikacji webowej; v2 jest teraz aktualnym batchem, a oryginalne wyniki v1 pozostają zarchiwizowanym snapshotem. Każdy wynik zachowuję i sprawdzam pod kątem zgodności z kontraktem, UX, testów i jakości dostarczenia. To nie jest uniwersalny ranking modeli.",
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
        "Consulting produktowy i kompleksowa realizacja oprogramowania dla founderów i małych zespołów: doprecyzowanie zakresu, specyfikacja, budowa, testy, deploy i iteracja.",
      openGraph: {
        title: "Consulting | Piotr Kacała",
        description:
          "Consulting produktowy i kompleksowa realizacja oprogramowania dla founderów i małych zespołów: doprecyzowanie zakresu, specyfikacja, budowa, testy, deploy i iteracja.",
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
      "Pracuję z founderami i małymi zespołami, które chcą zamienić pomysł w użyteczny produkt bez budowania całego zespołu produktowego. Doprecyzowuję zakres, piszę praktyczną specyfikację, buduję system, testuję go, wdrażam i rozwijam.",
    homeLabel: "Wróć na stronę główną",
    scope: {
      heading: "Zacznijmy od zakresu",
      paragraphs: [
        "Jeśli pomysł jest jeszcze nieprecyzyjny, pierwszym sensownym krokiem jest krótki, zamknięty etap doprecyzowania produktu. Celem nie jest duży dokument strategiczny. Chodzi o to, żeby projekt stał się wystarczająco konkretny do realizacji. Ten etap może też wcześnie pokazać, że jeszcze nie warto go budować.",
        "Jeśli masz już konkretny brief, możemy od razu przejść do planu budowy.",
      ],
      deliverablesHeading: "Etap doprecyzowania obejmuje:",
      deliverables: [
        "praktyczny brief produktowy",
        "skupiony pierwszy zakres i jawna lista rzeczy na później",
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
      heading: "AI jest częścią metody",
      paragraphs: [
        "Buduję przez workflow oparte na agentach AI. Wartość nie polega na tym, że model pisze kod. Polega na takim ułożeniu pracy, żeby działać szybko bez obniżania poprzeczki dla oceny, review i jakości.",
        "Jeśli AI ma być częścią samego produktu, pomagam też zaprojektować rolę modelu: co powinien robić, czego nie wolno mu rozstrzygać, z jakich narzędzi może korzystać, co może zapisywać i jakie guardrails kształtują doświadczenie użytkownika.",
      ],
    },
    fit: {
      goodHeading: "Dobre dopasowanie",
      goodItems: [
        "founderzy na wczesnym etapie z pomysłem, który potrzebuje struktury",
        "małe firmy bez pełnego zespołu produktowego",
        "prototypy, narzędzia wewnętrzne, automatyzacje i pierwsze wersje produkcyjne",
        "praca, w której liczy się ownership i praktyczne decyzje, a nie realizacja kolejki ticketów",
      ],
      notHeading: "Słabe dopasowanie",
      notItems: [
        "wąski staff augmentation",
        "realizacja samych ticketów bez kontekstu produktowego",
        "projekty szukające przede wszystkim głębokiej specjalizacji w jednym frameworku",
        "odpowiedzialność za rezultat bez uprawnień do podejmowania decyzji potrzebnych do jego dostarczenia",
      ],
    },
    selectedWork: {
      heading: "Wybrane projekty",
      body: "Strona główna pokazuje kolejne etapy: opublikowane rozszerzenie do przeglądarki, prywatną platformę produkcyjną dla realnego klienta, publiczną stronę z czytelną dokumentacją, niewielkie użyteczne narzędzia i opublikowany benchmark agentów programistycznych z wynikami, które można samodzielnie sprawdzić.",
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
