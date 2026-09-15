import eslint from "@eslint/js";
import astro from "eslint-plugin-astro";
import * as mdx from "eslint-plugin-mdx";
import yml from "eslint-plugin-yml";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/.astro/**",
      "**/.vercel/**",
      "**/coverage/**",
    ],
  },

  eslint.configs.recommended,

  ...tseslint.configs.recommended,

  ...astro.configs["flat/recommended"],

  mdx.flat,

  ...yml.configs["flat/recommended"],

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,astro}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    files: ["**/*.{ts,mts,cts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  {
    files: ["**/*.{md,mdx}"],
    rules: {
      "no-unused-vars": "off",
    },
  },

  eslintConfigPrettier, // Disables ESLint formatting rules that conflict with Prettier.
);
