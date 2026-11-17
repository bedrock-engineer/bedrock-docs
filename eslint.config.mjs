// Main job: the Tailwind guard rails. Classes in markup must be Tailwind
// utilities (built-in, generated from @theme tokens, or declared with
// @utility), and arbitrary values are banned.
//
// No typescript-eslint: it needs TypeScript's JS compiler API, which
// TypeScript 7 no longer ships. Babel parses the TypeScript syntax instead;
// type checking is left to the compiler.
import babelParser from "@babel/eslint-parser";
import js from "@eslint/js";
import * as astroParser from "astro-eslint-parser";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import { getDefaultSelectors } from "eslint-plugin-better-tailwindcss/defaults";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

// Babel only parses here (no transform), so parser plugins are enough.
// JSX stays off for .ts, where it would misread `<T>value` casts.
const babelParserOptions = (plugins) => ({
  requireConfigFile: false,
  babelOptions: { babelrc: false, configFile: false, parserOpts: { plugins } },
});
const parseTs = babelParserOptions(["typescript"]);
const parseTsx = babelParserOptions(["typescript", "jsx"]);

// Core scope analysis sees neither type positions nor components used as
// Astro tags, so these two rules misfire on TypeScript. The compiler checks
// both.
const tsSyntaxRules = {
  "no-undef": "off",
  "no-unused-vars": "off",
};

export default defineConfig(
  // The ignored folders of .gitignore (ESLint doesn't read it), plus public/.
  // .cache/ holds the upstream repositories `just sources` copies from.
  globalIgnores(["dist/", ".astro/", ".cache/", ".venv/", "__marimo__/", "public/"]),

  js.configs.recommended,
  { rules: { curly: ["error", "all"] } },

  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: { parser: babelParser, parserOptions: parseTs },
    rules: tsSyntaxRules,
  },

  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: { parser: babelParser, ...parseTsx },
      globals: { ...globals.browser, ...globals.node },
    },
    rules: tsSyntaxRules,
  },

  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.node },
  },
  {
    // Web components: plain browser scripts.
    files: ["src/components/**/*.js"],
    languageOptions: { globals: globals.browser },
  },

  // Tailwind guard rails.
  {
    files: ["**/*.{astro,ts,js,mjs}"],
    plugins: { "better-tailwindcss": betterTailwindcss },
    settings: {
      "better-tailwindcss": {
        // Tailwind v4 has no JS config; the plugin reads the theme, tokens
        // and @utility declarations from the stylesheet that imports it.
        entryPoint: "src/styles/custom.css",
        // Keep false: true would accept every class *defined* in the CSS,
        // i.e. exactly the invented class names the rule is meant to stop.
        detectComponentClasses: false,
        // The defaults read class attributes and variables named classNames,
        // classes or styles. The remark plugins and popup-link.js build markup
        // in JS, so they keep their classes in a `classNames` variable; this
        // also reads it when it is an object of class strings.
        selectors: [
          ...getDefaultSelectors(),
          { kind: "variable", name: "^classNames$", match: [{ type: "objectValues" }] },
        ],
      },
    },
    rules: {
      "better-tailwindcss/no-unknown-classes": ["error", { ignore: [] }],
      "better-tailwindcss/no-restricted-classes": [
        "error",
        {
          // A bracket group at the end of the class (before an optional
          // /modifier and ! suffix) is an arbitrary value: w-[37px],
          // md:bg-[url(x)], bg-gray-3/[0.5], [mask-type:alpha]. A bracket
          // starting a variant is an arbitrary variant: [&>p]:mt-2.
          // Bracketed *named* variants stay allowed: data-[state=open]:,
          // aria-[sort=ascending]:, supports-[display:grid]:.
          restrict: [
            {
              pattern: String.raw`\[[^\]]*\](?:/\S*)?!?$`,
              message:
                "Arbitrary value: name it as an @theme token or add an @utility instead.",
            },
            {
              pattern: String.raw`(?:^|:)!?\[`,
              message:
                "Arbitrary property or variant: add an @utility or @custom-variant instead.",
            },
          ],
        },
      ],
    },
  },
);
