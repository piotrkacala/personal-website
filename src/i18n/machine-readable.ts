import { en } from "./en.ts";
import { pl } from "./pl.ts";
import type { LinkBlock, ProjectBlock, SiteCopy } from "./schema.ts";
import {
  externalProjectProfiles,
  getExternalProjectMarkdownUrl,
  type ExternalProjectProfile,
} from "../site/external-projects.ts";
import {
  getPhoneticBenchmarkMarkdownUrl,
  phoneticBenchmarkReports,
  type BenchmarkReportCopy,
} from "../site/phonetic-benchmark.ts";

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

  return `${lines.join("\n")}\n`;
}

function renderHomepageMarkdown(copy: SiteCopy): string {
  return `${heading(1, copy.metadata.title)}\n\n${renderHomepageBody(copy, 2)}`;
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
    `> Companion machine-readable profile for the public ${profile.title} tool linked from ${en.metadata.openGraph.url}.`,
    "",
    heading(2, "Summary"),
    "",
    profile.summary,
    "",
    heading(2, "Live tool"),
    "",
    `- URL: ${profile.liveUrl}`,
    `- Type: ${profile.type}`,
    `- Status: ${profile.status}`,
    "",
    ...renderBulletSection("What it does", profile.whatItDoes),
    "",
    ...renderBulletSection("Intended input", profile.intendedInput),
    "",
    ...renderBulletSection("Privacy and runtime", profile.privacyAndRuntime),
    "",
    ...renderBulletSection("Constraints", profile.constraints),
    "",
    heading(2, "Discovery note"),
    "",
    "- This markdown file is a companion profile owned by the public personal-site repo.",
    `- The interactive analyzer itself lives at ${profile.liveUrl}`,
    "",
  ];

  return lines.join("\n");
}

function renderBenchmarkReportMarkdown(report: BenchmarkReportCopy): string {
  const runs = [...report.runs].sort(
    (firstRun, secondRun) => firstRun.executionOrder - secondRun.executionOrder,
  );
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
  ];
  lines.push("");
  lines.push(heading(2, report.resultsHeading));
  lines.push("");
  lines.push(report.resultsIntro);
  lines.push("");

  runs.forEach((run) => {
    lines.push(heading(3, `${run.model} ${run.effort}`));
    lines.push("");
    lines.push(
      `- ${report.markdownRunLabels.executionOrder}: ${run.executionOrder}`,
    );
    lines.push(`- ${report.tableLabels.promptCount}: ${run.promptCount}`);
    lines.push(`- ${report.tableLabels.elapsed}: ${run.elapsed}`);
    lines.push(`- ${report.tableLabels.sourceLoc}: ${run.sourceLoc}`);
    lines.push(`- ${report.tableLabels.stack}: ${run.stack}`);
    lines.push(`- ${report.tableLabels.verdict}: ${run.verdict}`);
    lines.push(
      `- ${report.markdownRunLabels.primaryFinding}: ${run.primaryFinding}`,
    );
    lines.push(
      `- ${report.markdownRunLabels.notesDiscipline}: ${run.notesDiscipline}`,
    );
    lines.push(`- ${report.markdownRunLabels.gitUse}: ${run.gitUse}`);
    lines.push(
      `- ${report.markdownRunLabels.screenshot}: ${new URL(run.screenshotPath, report.metadata.openGraph.url).toString()}`,
    );
    lines.push(`- ${report.markdownRunLabels.demo}: ${run.demoUrl}`);
    lines.push("");
  });

  lines.push(heading(2, report.currentBestHeading));
  lines.push("");
  lines.push(report.currentBestText);
  lines.push("");
  lines.push(heading(2, report.findingsHeading));
  lines.push("");
  lines.push(report.findingsIntro);
  lines.push("");
  lines.push(heading(2, report.protocolHeading));
  lines.push("");
  report.protocol.forEach((item) => {
    lines.push(`- ${item}`);
  });
  lines.push("");
  lines.push(heading(2, report.artifactHeading));
  lines.push("");
  lines.push(report.artifactIntro);
  lines.push("");
  runs.forEach((run) => {
    lines.push(`- ${run.model} ${run.effort}: ${run.demoUrl}`);
  });
  lines.push("");
  lines.push(heading(2, report.closingHeading));
  lines.push("");
  lines.push(report.closingText);
  lines.push("");

  return lines.join("\n");
}
function collectPublicReferences(): readonly string[] {
  const references = [
    "English homepage: https://piotrkacala.pl/",
    "Polish homepage: https://piotrkacala.pl/pl/",
    "Phonetic Benchmark report: https://piotrkacala.pl/phonetic-benchmark/",
    "Polish Phonetic Benchmark report: https://piotrkacala.pl/pl/phonetic-benchmark/",
    `Phonetic Benchmark markdown report: ${getPhoneticBenchmarkMarkdownUrl("en")}`,
    `Polish Phonetic Benchmark markdown report: ${getPhoneticBenchmarkMarkdownUrl("pl")}`,
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
    "## English Phonetic Benchmark report",
    "",
    renderBenchmarkReportMarkdown(phoneticBenchmarkReports.en).trimEnd(),
    "",
    "## Polish Phonetic Benchmark report",
    "",
    renderBenchmarkReportMarkdown(phoneticBenchmarkReports.pl).trimEnd(),
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

  return [
    ...homepageArtifacts,
    ...externalProjectArtifacts,
    ...benchmarkReportArtifacts,
    {
      pathname: "/llms-full.txt",
      content: renderLlmsFull(),
    },
  ];
}
