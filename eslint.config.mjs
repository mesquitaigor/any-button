// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  {
    rules: {
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/explicit-function-return-type": "error"
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];