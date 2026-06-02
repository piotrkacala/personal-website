import { en } from "./en.ts";
import { pl } from "./pl.ts";
import type {
  ConsultingCopy,
  LinkBlock,
  ProjectBlock,
  SiteCopy,
} from "./schema.ts";
import {
  externalProjectProfiles,
  getExternalProjectMarkdownUrl,
  type ExternalProjectProfile,
} from "../site/external-projects.ts";
import {
  getPhoneticBenchmarkMethodologyMarkdownUrl,
  getPhoneticBenchmarkMarkdownUrl,
  getPhoneticBenchmarkResultsCsvUrl,
  getPhoneticBenchmarkResultsData,
  getPhoneticBenchmarkResultsJsonUrl,
  phoneticBenchmarkInterpretationLimitations,
  phoneticBenchmarkMetadata,
  phoneticBenchmarkMethodology,
  phoneticBenchmarkReports,
  phoneticBenchmarkResultsCsvPath,
  phoneticBenchmarkResultsJsonPath,
  phoneticBenchmarkRuns,
  type BenchmarkMethodologyCopy,
  type BenchmarkReportCopy,
  type BenchmarkRunCopy,
} from "../site/phonetic-benchmark.ts";
import { getConsultingMarkdownUrl, siteProfile } from "../site/profile.ts";

export interface MachineReadableArtifact {
  pathname: `/${string}`;
  content: string;
}

const siteCopies = [en, pl] as const satisfies readonly SiteCopy[];

function heading(level: number, text: string): string {
  return `${"#".repeat(level)} ${text}`;
}

function formatProjectLink(block: LinkBlock): string {
  return `${block.machineLabel}: ${block.href}`;
}

function renderProjectBlock(
  block: ProjectBlock,
  sectionLevel: number,
): string[] {
  if (block.type === "paragraph") {
    return [block.text];
  }

  if (block.type === "metrics") {
    return [
      heading(sectionLevel + 2, block.heading),
      "",
      ...block.items.map((item) => `- ${item.label}: ${item.value}`),
    ];
  }

  return [`- ${formatProjectLink(block)}`];
}

function renderHomepageBody(copy: SiteCopy, sectionLevel: number): string {
  const lines: string[] = [
    `> ${copy.metadata.description}`,
    "",
    heading(sectionLevel, copy.hero.headline),
    "",
    copy.hero.expansion,
    "",
    heading(sectionLevel, copy.projects.heading),
    "",
    copy.projects.arc,
  ];

  copy.projects.items.forEach((project, index) => {
    lines.push("");
    lines.push(heading(sectionLevel + 1, `${index + 1}. ${project.title}`));

    project.blocks.forEach((block, blockIndex) => {
      const previousBlock = project.blocks[blockIndex - 1];

      if (!(previousBlock?.type === "link" && block.type === "link")) {
        lines.push("");
      }

      lines.push(...renderProjectBlock(block, sectionLevel));
    });
  });

  lines.push("");
  lines.push(heading(sectionLevel, copy.contact.heading));
  lines.push("");
  lines.push(`${copy.contact.prompt}: ${copy.contact.email}`);
  lines.push("");
  lines.push(
    `${copy.contact.consultingLink.label}: ${new URL(
      copy.contact.consultingLink.href,
      siteProfile.siteUrl,
    ).toString()}`,
  );

  return `${lines.join("\n")}\n`;
}

function renderHomepageMarkdown(copy: SiteCopy): string {
  return `${heading(1, copy.metadata.title)}\n\n${renderHomepageBody(copy, 2)}`;
}

function renderConsultingMarkdown(copy: ConsultingCopy): string {
  const lines = [
    heading(1, copy.metadata.title),
    "",
    `> ${copy.metadata.description}`,
    "",
    heading(2, copy.title),
    "",
    copy.intro,
    "",
    heading(2, copy.scope.heading),
    "",
    ...copy.scope.paragraphs.flatMap((paragraph) => [paragraph, ""]),
    copy.scope.deliverablesHeading,
    "",
    ...copy.scope.deliverables.map((deliverable) => `- ${deliverable}`),
    "",
    heading(2, copy.delivery.heading),
    "",
    ...copy.delivery.paragraphs.flatMap((paragraph) => [paragraph, ""]),
    heading(2, copy.ai.heading),
    "",
    ...copy.ai.paragraphs.flatMap((paragraph) => [paragraph, ""]),
    heading(2, copy.fit.goodHeading),
    "",
    ...copy.fit.goodItems.map((item) => `- ${item}`),
    "",
    heading(2, copy.fit.notHeading),
    "",
    ...copy.fit.notItems.map((item) => `- ${item}`),
    "",
    heading(2, copy.selectedWork.heading),
    "",
    copy.selectedWork.body,
    "",
    `${copy.selectedWork.linkLabel}: ${new URL(
      copy.selectedWork.href,
      copy.metadata.openGraph.url,
    ).toString()}`,
    "",
    heading(2, copy.contact.heading),
    "",
    copy.contact.body,
    "",
    `Email: ${copy.contact.email}`,
    "",
  ];

  return lines.join("\n");
}

function renderBulletSection(
  title: string,
  items: readonly string[],
): string[] {
  return [heading(2, title), "", ...items.map((item) => `- ${item}`)];
}

function renderExternalProjectProfile(profile: ExternalProjectProfile): string {
  const lines = [
    heading(1, profile.title),
    "",
    `> Companion machine-readable profile for ${profile.title}, linked from ${en.metadata.openGraph.url}.`,
    "",
    heading(2, "Summary"),
    "",
    profile.summary,
    "",
    heading(2, profile.linksHeading),
    "",
    ...profile.publicLinks.map(
      (link) => `- ${link.label}: ${link.url ?? link.note}`,
    ),
    `- Type: ${profile.type}`,
    `- Status: ${profile.status}`,
    ...profile.sections.flatMap((section) => [
      "",
      ...renderBulletSection(section.heading, section.items),
    ]),
    "",
    heading(2, "Discovery note"),
    "",
    ...profile.discoveryNotes.map((note) => `- ${note}`),
    "",
  ];

  return lines.join("\n");
}

function renderBenchmarkReportMarkdown(report: BenchmarkReportCopy): string {
  const runs = [...report.runs].sort(
    (firstRun, secondRun) => firstRun.executionOrder - secondRun.executionOrder,
  );
  const renderParagraphs = (paragraphs: readonly string[]): void => {
    paragraphs.forEach((paragraph) => {
      lines.push(paragraph);
      lines.push("");
    });
  };
  const lines: string[] = [
    heading(1, report.title),
    "",
    `> ${report.metadata.description}`,
    "",
    report.summary,
    "",
    `Report URL: ${report.metadata.openGraph.url}`,
    `Markdown URL: ${getPhoneticBenchmarkMarkdownUrl(report.lang)}`,
    `Homepage: ${new URL(report.homeHref, report.metadata.openGraph.url).toString()}`,
    `Benchmark version: ${phoneticBenchmarkMetadata.benchmarkVersion}`,
    `Published: ${phoneticBenchmarkMetadata.publishedDate}`,
    `Updated: ${phoneticBenchmarkMetadata.updatedDate}`,
    `Covered through: ${phoneticBenchmarkMetadata.coveredThroughDate}`,
    `Methodology: ${phoneticBenchmarkMethodology.metadata.openGraph.url}`,
    `Results JSON: ${getPhoneticBenchmarkResultsJsonUrl()}`,
    `Results CSV: ${getPhoneticBenchmarkResultsCsvUrl()}`,
  ];
  lines.push("");
  lines.push(heading(2, report.benchmarkHeading));
  lines.push("");
  renderParagraphs(report.benchmarkParagraphs);
  lines.push(heading(2, report.readingHeading));
  lines.push("");
  lines.push(report.readingIntro);
  lines.push("");
  Object.entries(report.statusDescriptions).forEach(([status, description]) => {
    lines.push(`- \`${status}\`: ${description}`);
  });
  lines.push("");
  lines.push(report.evidenceText);
  lines.push("");
  lines.push(heading(2, report.resultsHeading));
  lines.push("");
  lines.push(report.resultsIntro);
  lines.push("");

  runs.forEach((run) => {
    lines.push(heading(3, run.model));
    lines.push("");
    lines.push(`- ID: ${run.id}`);
    lines.push(`- Benchmark version: ${run.benchmarkVersion}`);
    lines.push(`- Status: ${run.status}`);
    lines.push(
      `- ${report.tableLabels.failureTypes}: ${
        run.failureTypes.length > 0
          ? run.failureTypes
              .map((failureType) => report.failureTypeLabels[failureType])
              .join(", ")
          : report.noneLabel
      }`,
    );
    lines.push(`- ${report.detailLabels.runDate}: ${run.runDate}`);
    lines.push(`- ${report.tableLabels.sourceLoc}: ${run.sourceLoc}`);
    lines.push(`- ${report.tableLabels.testCount}: ${run.testCount}`);
    lines.push(`- ${report.detailLabels.stack}: ${run.stack}`);
    lines.push(`- ${report.tableLabels.functionalRead}: ${run.functionalRead}`);
    lines.push(`- Details: ${run.detailsUrl}`);
    lines.push(`- Markdown details: ${run.markdownUrl}`);
    lines.push(`- Screenshot: ${run.screenshotUrl}`);
    lines.push(`- Demo: ${run.demoUrl}`);
    lines.push("");
  });

  lines.push(heading(2, report.findingsHeading));
  lines.push("");
  report.findings.forEach((finding) => {
    lines.push(heading(3, finding.heading));
    lines.push("");
    renderParagraphs(finding.paragraphs);
  });
  lines.push(heading(2, report.caseNotesHeading));
  lines.push("");
  report.caseNotes.forEach((caseNote) => {
    lines.push(heading(3, caseNote.heading));
    lines.push("");
    renderParagraphs(caseNote.paragraphs);
  });
  lines.push(heading(2, report.artifactHeading));
  lines.push("");
  lines.push(report.artifactIntro);
  lines.push("");
  lines.push(
    `${report.galleryText} ${report.galleryLabel}: ${new URL(report.galleryHref, report.metadata.openGraph.url).toString()}`,
  );
  lines.push("");
  runs.forEach((run) => {
    lines.push(`- ${run.model}: ${run.demoUrl}`);
  });
  lines.push("");
  lines.push(heading(2, report.closingHeading));
  lines.push("");
  lines.push(report.closingText);
  lines.push("");

  return lines.join("\n");
}

function renderBenchmarkMethodologyMarkdown(
  methodology: BenchmarkMethodologyCopy,
): string {
  const lines = [
    heading(
      1,
      `Phonetic Benchmark ${phoneticBenchmarkMetadata.benchmarkVersion} Methodology`,
    ),
    "",
    `> ${methodology.metadata.description}`,
    "",
    methodology.summary,
    "",
    `Methodology URL: ${methodology.metadata.openGraph.url}`,
    `Markdown URL: ${getPhoneticBenchmarkMethodologyMarkdownUrl()}`,
    `Report URL: ${phoneticBenchmarkReports.en.metadata.openGraph.url}`,
    `Public benchmark package: ${methodology.sourcePackageUrl}`,
    `Published: ${phoneticBenchmarkMetadata.publishedDate}`,
    `Updated: ${phoneticBenchmarkMetadata.updatedDate}`,
    `Covered through: ${phoneticBenchmarkMetadata.coveredThroughDate}`,
  ];

  methodology.sections.forEach((section) => {
    lines.push("");
    lines.push(heading(2, section.heading));
    lines.push("");

    section.paragraphs?.forEach((paragraph) => {
      lines.push(paragraph);
      lines.push("");
    });
    section.items?.forEach((item) => {
      lines.push(`- ${item}`);
    });
  });

  lines.push("");
  lines.push(heading(2, "Public Benchmark Package"));
  lines.push("");
  lines.push(
    `- ${methodology.sourcePackageLabel}: ${methodology.sourcePackageUrl}`,
  );
  lines.push("");

  return lines.join("\n");
}

function renderBenchmarkRunMarkdown(run: BenchmarkRunCopy): string {
  const lines = [
    heading(1, `${run.model} — Phonetic Benchmark run details`),
    "",
    `> One observed output from one small browser-app task. This is not a general model review or universal ranking.`,
    "",
    run.functionalRead,
    "",
    `Details URL: ${run.detailsUrl}`,
    `Markdown URL: ${run.markdownUrl}`,
    `Report URL: ${phoneticBenchmarkReports.en.metadata.openGraph.url}`,
    `Methodology URL: ${phoneticBenchmarkMethodology.metadata.openGraph.url}`,
    "",
    heading(2, "Run Record"),
    "",
    `- Run ID: ${run.id}`,
    `- Model label: ${run.model}`,
    `- Benchmark version: ${run.benchmarkVersion}`,
    `- Run date: ${run.runDate}`,
    `- Status: ${run.status}`,
    `- Failure types: ${run.failureTypes.length > 0 ? run.failureTypes.join(", ") : "none"}`,
    `- Source LoC: ${run.sourceLoc}`,
    `- Static automated tests: ${run.testCount}`,
    `- Stack: ${run.stack}`,
    "",
    heading(2, "Observed Strengths"),
    "",
    ...run.observations.observedStrengths.map((item) => `- ${item}`),
    "",
    heading(2, "Observed Weaknesses"),
    "",
    ...run.observations.observedWeaknesses.map((item) => `- ${item}`),
    "",
    heading(2, "Evidence"),
    "",
    `- Archived demo: ${run.demoUrl}`,
    `- Screenshot: ${run.screenshotUrl}`,
    `- Main report: ${phoneticBenchmarkReports.en.metadata.openGraph.url}`,
    `- Methodology: ${phoneticBenchmarkMethodology.metadata.openGraph.url}`,
    "",
    heading(2, "Interpretation Limits"),
    "",
    ...phoneticBenchmarkInterpretationLimitations.map((item) => `- ${item}`),
    "",
  ];

  return lines.join("\n");
}

function renderBenchmarkResultsJson(): string {
  return `${JSON.stringify(getPhoneticBenchmarkResultsData(), null, 2)}\n`;
}

function escapeCsvCell(value: string | number): string {
  const text = String(value);

  return /[",\n\r]/u.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function renderBenchmarkResultsCsv(): string {
  const header = [
    "run_id",
    "execution_order",
    "model",
    "run_date",
    "benchmark_version",
    "status",
    "failure_types",
    "source_loc",
    "static_automated_tests",
    "stack",
    "functional_read",
    "details_url",
    "markdown_url",
    "demo_url",
    "screenshot_url",
  ];
  const rows = phoneticBenchmarkRuns.map((run) => [
    run.id,
    run.executionOrder,
    run.model,
    run.runDate,
    run.benchmarkVersion,
    run.status,
    run.failureTypes.join(" | "),
    run.sourceLoc,
    run.testCount,
    run.stack,
    run.functionalRead,
    run.detailsUrl,
    run.markdownUrl,
    run.demoUrl,
    run.screenshotUrl,
  ]);

  return `${[header, ...rows]
    .map((row) => row.map(escapeCsvCell).join(","))
    .join("\n")}\n`;
}

interface SitemapAlternate {
  lang: string;
  href: string;
}

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  alternates?: readonly SitemapAlternate[];
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function getPairedAlternates(enUrl: string, plUrl: string): SitemapAlternate[] {
  return [
    { lang: "en", href: enUrl },
    { lang: "pl", href: plUrl },
    { lang: "x-default", href: enUrl },
  ];
}

function renderSitemap(): string {
  const benchmarkLastmod = phoneticBenchmarkMetadata.updatedDate;
  const reportAlternates = getPairedAlternates(
    phoneticBenchmarkReports.en.metadata.openGraph.url,
    phoneticBenchmarkReports.pl.metadata.openGraph.url,
  );
  const galleryAlternates = getPairedAlternates(
    "https://piotrkacala.pl/phonetic-benchmark/gallery/",
    "https://piotrkacala.pl/pl/phonetic-benchmark/gallery/",
  );
  const homepageAlternates = getPairedAlternates(
    "https://piotrkacala.pl/",
    "https://piotrkacala.pl/pl/",
  );
  const consultingAlternates = getPairedAlternates(
    en.consulting.metadata.openGraph.url,
    pl.consulting.metadata.openGraph.url,
  );
  const entries: SitemapEntry[] = [
    { loc: "https://piotrkacala.pl/", alternates: homepageAlternates },
    { loc: "https://piotrkacala.pl/pl/", alternates: homepageAlternates },
    { loc: "https://piotrkacala.pl/index.md" },
    { loc: "https://piotrkacala.pl/pl/index.md" },
    {
      loc: en.consulting.metadata.openGraph.url,
      alternates: consultingAlternates,
    },
    {
      loc: pl.consulting.metadata.openGraph.url,
      alternates: consultingAlternates,
    },
    { loc: getConsultingMarkdownUrl("en") },
    { loc: getConsultingMarkdownUrl("pl") },
    {
      loc: phoneticBenchmarkReports.en.metadata.openGraph.url,
      lastmod: benchmarkLastmod,
      alternates: reportAlternates,
    },
    {
      loc: phoneticBenchmarkReports.pl.metadata.openGraph.url,
      lastmod: benchmarkLastmod,
      alternates: reportAlternates,
    },
    {
      loc: "https://piotrkacala.pl/phonetic-benchmark/gallery/",
      lastmod: benchmarkLastmod,
      alternates: galleryAlternates,
    },
    {
      loc: "https://piotrkacala.pl/pl/phonetic-benchmark/gallery/",
      lastmod: benchmarkLastmod,
      alternates: galleryAlternates,
    },
    {
      loc: getPhoneticBenchmarkMarkdownUrl("en"),
      lastmod: benchmarkLastmod,
    },
    {
      loc: getPhoneticBenchmarkMarkdownUrl("pl"),
      lastmod: benchmarkLastmod,
    },
    {
      loc: phoneticBenchmarkMethodology.metadata.openGraph.url,
      lastmod: benchmarkLastmod,
    },
    {
      loc: getPhoneticBenchmarkMethodologyMarkdownUrl(),
      lastmod: benchmarkLastmod,
    },
    { loc: getPhoneticBenchmarkResultsJsonUrl(), lastmod: benchmarkLastmod },
    { loc: getPhoneticBenchmarkResultsCsvUrl(), lastmod: benchmarkLastmod },
    ...phoneticBenchmarkRuns.flatMap((run) => [
      { loc: run.detailsUrl, lastmod: benchmarkLastmod },
      { loc: run.markdownUrl, lastmod: benchmarkLastmod },
    ]),
    ...externalProjectProfiles.flatMap((profile) => [
      ...(profile.sitemapUrls ?? []).map((loc) => ({ loc })),
      { loc: getExternalProjectMarkdownUrl(profile) },
    ]),
  ];
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];

  entries.forEach((entry) => {
    lines.push("  <url>");
    lines.push(`    <loc>${escapeXml(entry.loc)}</loc>`);

    if (entry.lastmod) {
      lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    }

    entry.alternates?.forEach((alternate) => {
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.lang)}" href="${escapeXml(alternate.href)}" />`,
      );
    });
    lines.push("  </url>");
  });
  lines.push("</urlset>");
  lines.push("");

  return lines.join("\n");
}

function collectPublicReferences(): readonly string[] {
  const references = [
    "English homepage: https://piotrkacala.pl/",
    "Polish homepage: https://piotrkacala.pl/pl/",
    `Consulting: ${en.consulting.metadata.openGraph.url}`,
    `Polish consulting: ${pl.consulting.metadata.openGraph.url}`,
    `Consulting markdown: ${getConsultingMarkdownUrl("en")}`,
    `Polish consulting markdown: ${getConsultingMarkdownUrl("pl")}`,
    "Phonetic Benchmark report: https://piotrkacala.pl/phonetic-benchmark/",
    "Polish Phonetic Benchmark report: https://piotrkacala.pl/pl/phonetic-benchmark/",
    "Phonetic Benchmark screenshot gallery: https://piotrkacala.pl/phonetic-benchmark/gallery/",
    "Polish Phonetic Benchmark screenshot gallery: https://piotrkacala.pl/pl/phonetic-benchmark/gallery/",
    `Phonetic Benchmark markdown report: ${getPhoneticBenchmarkMarkdownUrl("en")}`,
    `Polish Phonetic Benchmark markdown report: ${getPhoneticBenchmarkMarkdownUrl("pl")}`,
    `Phonetic Benchmark methodology: ${phoneticBenchmarkMethodology.metadata.openGraph.url}`,
    `Phonetic Benchmark methodology markdown: ${getPhoneticBenchmarkMethodologyMarkdownUrl()}`,
    `Phonetic Benchmark results JSON: ${getPhoneticBenchmarkResultsJsonUrl()}`,
    `Phonetic Benchmark results CSV: ${getPhoneticBenchmarkResultsCsvUrl()}`,
    "Phonetic Benchmark run details pattern: https://piotrkacala.pl/phonetic-benchmark/runs/{run-id}/",
    `Contact: mailto:${en.contact.email}`,
  ];

  const projectLinks = en.projects.items.flatMap((project) =>
    project.blocks.flatMap((block) =>
      block.type === "link"
        ? [`${project.title} — ${formatProjectLink(block)}`]
        : [],
    ),
  );

  const companionProfiles = externalProjectProfiles.map(
    (profile) =>
      `${profile.title} — Companion profile: ${getExternalProjectMarkdownUrl(profile)}`,
  );

  return [...references, ...projectLinks, ...companionProfiles];
}

function renderLlmsFull(): string {
  return [
    "# Piotr Kacała — Full Public Site Context",
    "",
    "> Compact public context generated from the same source content as https://piotrkacala.pl/ and https://piotrkacala.pl/pl/.",
    "",
    "## Canonical summary",
    "",
    siteProfile.canonicalSummary,
    "",
    "## English homepage",
    "",
    `**${en.metadata.title}**`,
    "",
    renderHomepageBody(en, 3).trimEnd(),
    "",
    "## Polish homepage",
    "",
    `**${pl.metadata.title}**`,
    "",
    renderHomepageBody(pl, 3).trimEnd(),
    "",
    "## English consulting",
    "",
    renderConsultingMarkdown(en.consulting).trimEnd(),
    "",
    "## Polish consulting",
    "",
    renderConsultingMarkdown(pl.consulting).trimEnd(),
    "",
    "## English Phonetic Benchmark report",
    "",
    renderBenchmarkReportMarkdown(phoneticBenchmarkReports.en).trimEnd(),
    "",
    "## Polish Phonetic Benchmark report",
    "",
    renderBenchmarkReportMarkdown(phoneticBenchmarkReports.pl).trimEnd(),
    "",
    "## Phonetic Benchmark machine-readable resources",
    "",
    `- Methodology: ${phoneticBenchmarkMethodology.metadata.openGraph.url}`,
    `- Methodology markdown: ${getPhoneticBenchmarkMethodologyMarkdownUrl()}`,
    `- Results JSON: ${getPhoneticBenchmarkResultsJsonUrl()}`,
    `- Results CSV: ${getPhoneticBenchmarkResultsCsvUrl()}`,
    "",
    "### Run-details directory",
    "",
    ...phoneticBenchmarkRuns.map((run) => `- ${run.model}: ${run.detailsUrl}`),
    "",
    "## Public references",
    "",
    ...collectPublicReferences().map((reference) => `- ${reference}`),
    "",
  ].join("\n");
}

export function getMachineReadableArtifacts(): readonly MachineReadableArtifact[] {
  const homepageArtifacts: MachineReadableArtifact[] = siteCopies.map(
    (copy) => ({
      pathname:
        copy.lang === "en" ? ("/index.md" as const) : ("/pl/index.md" as const),
      content: renderHomepageMarkdown(copy),
    }),
  );

  const externalProjectArtifacts: MachineReadableArtifact[] =
    externalProjectProfiles.map((profile) => ({
      pathname: profile.companionPath,
      content: renderExternalProjectProfile(profile),
    }));

  const benchmarkReportArtifacts: MachineReadableArtifact[] = [
    phoneticBenchmarkReports.en,
    phoneticBenchmarkReports.pl,
  ].map((report) => ({
    pathname: report.markdownPath,
    content: renderBenchmarkReportMarkdown(report),
  }));

  const benchmarkRunArtifacts: MachineReadableArtifact[] =
    phoneticBenchmarkRuns.map((run) => ({
      pathname: new URL(run.markdownUrl).pathname as `/${string}`,
      content: renderBenchmarkRunMarkdown(run),
    }));

  return [
    ...homepageArtifacts,
    {
      pathname: "/consulting.md",
      content: renderConsultingMarkdown(en.consulting),
    },
    {
      pathname: "/pl/consulting.md",
      content: renderConsultingMarkdown(pl.consulting),
    },
    ...externalProjectArtifacts,
    ...benchmarkReportArtifacts,
    {
      pathname: phoneticBenchmarkMethodology.markdownPath,
      content: renderBenchmarkMethodologyMarkdown(phoneticBenchmarkMethodology),
    },
    ...benchmarkRunArtifacts,
    {
      pathname: phoneticBenchmarkResultsJsonPath,
      content: renderBenchmarkResultsJson(),
    },
    {
      pathname: phoneticBenchmarkResultsCsvPath,
      content: renderBenchmarkResultsCsv(),
    },
    {
      pathname: "/sitemap.xml",
      content: renderSitemap(),
    },
    {
      pathname: "/llms-full.txt",
      content: renderLlmsFull(),
    },
  ];
}
