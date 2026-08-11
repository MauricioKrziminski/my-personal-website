import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Artefatos de build do wrangler (pages dev). Sem isto, um `wrangler pages
    // dev` deixa bundles gerados em .wrangler/tmp que o lint passa a reportar
    // como se fossem codigo do projeto.
    ".wrangler/**",
  ]),
]);

export default eslintConfig;
