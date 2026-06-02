import { siteProfile } from "./profile.ts";

export interface ExternalProjectProfile {
  slug: string;
  title: string;
  companionPath: `/${string}`;
  summary: string;
  status: string;
  type: string;
  linksHeading: string;
  publicLinks: readonly {
    label: string;
    url?: string;
    note?: string;
  }[];
  sections: readonly {
    heading: string;
    items: readonly string[];
  }[];
  discoveryNotes: readonly string[];
  sitemapUrls?: readonly string[];
}

export const externalProjectProfiles: readonly ExternalProjectProfile[] = [
  {
    slug: "400m",
    title: "400m",
    companionPath: "/projects/400m.md",
    summary:
      "400m is a free local-first GPX analyzer for runners on standard athletics tracks. It estimates completed laps and corrected running distance from lap progress instead of relying on raw GPS path length.",
    status: "Public utility linked from the personal site.",
    type: "Browser-based GPX analyzer",
    linksHeading: "Live tool",
    publicLinks: [{ label: "URL", url: "https://piotrkacala.pl/400m/" }],
    sections: [
      {
        heading: "What it does",
        items: [
          "Parses a GPX file from a track workout.",
          "Lets the runner choose the lane explicitly.",
          "Estimates completed laps on a standard 400 m track.",
          "Calculates corrected distance from lap count and official lane length.",
          "Keeps raw GPX distance as a diagnostic value rather than the main result.",
        ],
      },
      {
        heading: "Intended input",
        items: [
          "GPX file recorded during a run.",
          "Sessions on a standard 400 m athletics track.",
          "Explicit lane selection by the runner.",
        ],
      },
      {
        heading: "Privacy and runtime",
        items: [
          "Presented publicly as a local-first tool.",
          "GPX analysis runs in the browser.",
          "No GPX file, coordinates, or telemetry are sent to a server for the calculation.",
        ],
      },
      {
        heading: "Constraints",
        items: [
          "Designed for track sessions, not general route analysis.",
          "Can warn about GPS jumps, noisy direction changes, or long recording gaps.",
          "Those warnings do not override the selected lane-length table.",
        ],
      },
    ],
    discoveryNotes: [
      "This markdown file is a companion profile owned by the public personal-site repo.",
      "The interactive analyzer itself lives at https://piotrkacala.pl/400m/",
    ],
    sitemapUrls: ["https://piotrkacala.pl/400m/"],
  },
  {
    slug: "phonetic-alphabet-trainer",
    title: "Phonetic Alphabet Trainer",
    companionPath: "/projects/phonetic-alphabet-trainer.md",
    summary:
      "Phonetic Alphabet Trainer is a bilingual browser app for practicing NATO and Polish Ministry of Defence phonetic alphabets. Reopening this existing React codebase marked the first deliberate test of an AI-agent workflow on a real project.",
    status: "Public browser app linked from the personal site.",
    type: "Browser-based phonetic alphabet trainer",
    linksHeading: "Public links",
    publicLinks: [
      { label: "Live app", url: "https://piotrkacala.github.io/phonetic/" },
    ],
    sections: [
      {
        heading: "What it does",
        items: [
          "Supports English and Polish phonetic alphabet practice.",
          "Includes scoring, two answer modes, and streak tracking.",
          "Surfaces the missing-letter gap found in the official Polish Ministry of Defence phonetic alphabet source.",
        ],
      },
      {
        heading: "Project role",
        items: [
          "Started as an existing React project reopened to test how AI handles a real codebase.",
          "Later became the product brief for Phonetic Benchmark.",
        ],
      },
    ],
    discoveryNotes: [
      "This markdown file is a companion profile owned by the public personal-site repo.",
      "Phonetic Benchmark has its own richer report and methodology surfaces.",
    ],
  },
  {
    slug: "surfaced",
    title: "Surfaced",
    companionPath: "/projects/surfaced.md",
    summary:
      "Surfaced is a browser extension that tracks scroll depth and adds escalating reminders when a user goes too far into infinite scroll. It was the first project built from scratch with a docs-driven, zero-code AI-agent workflow.",
    status:
      "Public browser extension available from Firefox Add-ons and the Chrome Web Store.",
    type: "Browser extension",
    linksHeading: "Public links",
    publicLinks: [
      {
        label: "Firefox Add-ons",
        url: "https://addons.mozilla.org/firefox/addon/surfaced/",
      },
      {
        label: "Chrome Web Store",
        url: "https://chromewebstore.google.com/detail/surfaced/bpbidikjpaffmpcbincadomhbfnoaaem",
      },
    ],
    sections: [
      {
        heading: "What it does",
        items: [
          "Tracks scroll depth during browsing.",
          "Uses three depth zones with escalating urgency.",
          "Adds a stopping cue to interfaces with no natural endpoint.",
        ],
      },
      {
        heading: "Project role",
        items: [
          "First project built from scratch with a docs-driven, zero-code workflow.",
          "Passed Mozilla's public add-on review.",
        ],
      },
    ],
    discoveryNotes: [
      "This markdown file is a companion profile owned by the public personal-site repo.",
    ],
  },
  {
    slug: "client-audit-platform",
    title: "Private client audit platform",
    companionPath: "/projects/client-audit-platform.md",
    summary:
      "This private client audit platform is a dated record of the first full production project built spec-first for a real customer.",
    status: "Private client project. Snapshot dated April 2026.",
    type: "Client audit platform",
    linksHeading: "Public runtime",
    publicLinks: [{ label: "Runtime", note: "No public runtime link." }],
    sections: [
      {
        heading: "Public snapshot",
        items: [
          "As of April 2026: approximately 21,000 lines of production code.",
          "As of April 2026: approximately 9,400 lines of tests.",
          "As of April 2026: 295 commits.",
        ],
      },
      {
        heading: "Publication boundary",
        items: [
          "This profile is a dated private-project record, not a public runtime claim.",
          "Private customer data and implementation details are intentionally excluded.",
        ],
      },
    ],
    discoveryNotes: [
      "This markdown file is a companion profile owned by the public personal-site repo.",
      "There is no public runtime link for this private client project.",
    ],
  },
] as const;

export function getExternalProjectMarkdownUrl(
  profile: Pick<ExternalProjectProfile, "companionPath">,
): string {
  return new URL(profile.companionPath, siteProfile.siteUrl).toString();
}
