import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import { getMachineReadableArtifacts } from "../i18n/machine-readable";

export function machineReadableArtifacts(): AstroIntegration {
  return {
    name: "machine-readable-artifacts",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);

        await Promise.all(
          getMachineReadableArtifacts().map(async (artifact) => {
            const targetPath = join(
              distDir,
              artifact.pathname.replace(/^\//u, ""),
            );

            await mkdir(dirname(targetPath), { recursive: true });
            await writeFile(targetPath, artifact.content, "utf8");
          }),
        );

        logger.info("Generated machine-readable discovery assets.");
      },
    },
  };
}
