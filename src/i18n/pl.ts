import type { SiteCopy } from "./schema";

export const pl = {
  lang: "pl",
  title: "Piotr Kacala",
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
    arc: "Trzy projekty, każdy jako świadomie wybrany kolejny krok. Najpierw sprawdzenie AI na istniejącym codebase. Potem budowa od zera, docs-first, zero-code. Na końcu pełny produkt dla realnego klienta.",
    items: [
      {
        title: "Phonetic Alphabet Trainer",
        blocks: [
          {
            type: "paragraph",
            text: "Istniejący projekt w React, otwarty ponownie, żeby sprawdzić, jak AI radzi sobie z istniejącym codebase — i porównać modele oraz IDE. Po drodze wyszły na jaw brakujące litery w oficjalnym alfabecie fonetycznym Ministerstwa Obrony Narodowej. Działa po angielsku i po polsku, ma scoring, dwa tryby odpowiedzi i śledzenie serii.",
          },
          {
            type: "link",
            href: "https://piotrkacala.github.io/phonetic/",
            label: "Link: piotrkacala.github.io/phonetic/",
            external: true,
            externalLabel: "(otwiera się w nowej karcie)",
          },
        ],
      },
      {
        title: "Surfaced",
        blocks: [
          {
            type: "paragraph",
            text: "Pierwszy projekt zbudowany od zera, docs-driven, zero-code. Rozszerzenie do Firefoksa, które śledzi głębokość scrolla i powiadamia, gdy zajdziesz za daleko — trzy strefy głębokości i rosnący poziom pilności. Przeszło publiczny review Mozilli i jest opublikowane w Firefox Add-ons.",
          },
          {
            type: "link",
            href: "https://addons.mozilla.org/firefox/addon/surfaced/",
            label: "Link: addons.mozilla.org/firefox/addon/surfaced/",
            external: true,
            externalLabel: "(otwiera się w nowej karcie)",
          },
        ],
      },
      {
        title: "mojeaudyty.pl",
        blocks: [
          {
            type: "paragraph",
            text: "Pierwszy pełny projekt produkcyjny, zbudowany spec-first dla realnego klienta.",
          },
          {
            type: "metrics",
            heading: "Stan na kwiecień 2026",
            items: [
              { label: "Kod produkcyjny", value: "~21,000 linii" },
              { label: "Testy", value: "~9,400 linii" },
              { label: "Commity", value: "295" },
              { label: "Modele bazy danych", value: "25" },
              { label: "Endpointy API", value: "~96" },
              { label: "Strony", value: "37" },
              { label: "Komponenty", value: "50" },
              { label: "Internacjonalizacja", value: "Pełne i18n" },
            ],
          },
          {
            type: "paragraph",
            text: "Zanim projekt był skończony, zarówno modele AI, jak i doświadczony CEO szacowali 13–17 tygodni pracy dla jednego developera. CEO był wyraźnie zaskoczony, kiedy usłyszał, że to już jest gotowe. Łączny czas budowy: około 25–30 dni.",
          },
          {
            type: "paragraph",
            text: "Tylko na zaproszenie — bez publicznego linku.",
            tone: "aside",
          },
        ],
      },
    ],
  },
  contact: {
    heading: "Kontakt",
    prompt: "Kontakt",
    email: "kontakt@piotrkacala.pl",
  },
} satisfies SiteCopy & {
  languageSwitcher: {
    ariaLabel: string;
    en: string;
    pl: string;
  };
};
