import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export function machineReadableArtifacts() {
  return {
    name: "machine-readable-artifacts",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const { getMachineReadableArtifacts } = await import("../i18n/machine-readable.ts");
        const distDir = fileURLToPath(dir);

        await Promise.all(
          getMachineReadableArtifacts().map(async (artifact) => {
            const targetPath = join(distDir, artifact.pathname.replace(/^\//u, ""));

            await mkdir(dirname(targetPath), { recursive: true });
            await writeFile(targetPath, artifact.content, "utf8");
          }),
        );

        logger.info("Generated machine-readable markdown assets.");
      },
    },
  };
}
