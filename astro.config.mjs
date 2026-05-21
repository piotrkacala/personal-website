import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { machineReadableArtifacts } from "./src/integrations/machine-readable-artifacts.mjs";

export default defineConfig({
  output: "static",
  integrations: [machineReadableArtifacts()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pl"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
