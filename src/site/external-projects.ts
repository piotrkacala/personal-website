import { siteProfile } from "./profile.ts";

export interface ExternalProjectProfile {
  slug: string;
  title: string;
  liveUrl: string;
  companionPath: `/${string}`;
  summary: string;
  status: string;
  type: string;
  whatItDoes: readonly string[];
  intendedInput: readonly string[];
  privacyAndRuntime: readonly string[];
  constraints: readonly string[];
}

export const externalProjectProfiles = [
  {
    slug: "400m",
    title: "400m",
    liveUrl: "https://piotrkacala.pl/400m/",
    companionPath: "/projects/400m.md",
    summary:
      "400m is a free local-first GPX analyzer for runners on standard athletics tracks. It estimates completed laps and corrected running distance from lap progress instead of relying on raw GPS path length.",
    status: "Public utility linked from the personal site.",
    type: "Browser-based GPX analyzer",
    whatItDoes: [
      "Parses a GPX file from a track workout.",
      "Lets the runner choose the lane explicitly.",
      "Estimates completed laps on a standard 400 m track.",
      "Calculates corrected distance from lap count and official lane length.",
      "Keeps raw GPX distance as a diagnostic value rather than the main result.",
    ],
    intendedInput: [
      "GPX file recorded during a run.",
      "Sessions on a standard 400 m athletics track.",
      "Explicit lane selection by the runner.",
    ],
    privacyAndRuntime: [
      "Presented publicly as a local-first tool.",
      "GPX analysis runs in the browser.",
      "No GPX file, coordinates, or telemetry are sent to a server for the calculation.",
    ],
    constraints: [
      "Designed for track sessions, not general route analysis.",
      "Can warn about GPS jumps, noisy direction changes, or long recording gaps.",
      "Those warnings do not override the selected lane-length table.",
    ],
  },
] as const satisfies readonly ExternalProjectProfile[];

export function getExternalProjectMarkdownUrl(profile: Pick<ExternalProjectProfile, "companionPath">): string {
  return new URL(profile.companionPath, siteProfile.siteUrl).toString();
}
