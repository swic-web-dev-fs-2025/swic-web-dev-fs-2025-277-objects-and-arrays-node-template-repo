import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import prettier from "eslint-config-prettier";

// Clean Code principle: Named constants instead of magic numbers
const ESLINT_THRESHOLDS = {
  MAX_CYCLOMATIC_COMPLEXITY: 5,
  MAX_LINES_PER_FUNCTION: 50, // Functions should do one thing
  MAX_FUNCTION_PARAMS: 3, // Functions should have 2 or fewer params ideally
};

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      ...js.configs.recommended.rules,

      // Variables (Clean Code)
      "no-var": "error",
      "prefer-const": "error",

      // Functions (Clean Code)
      "max-params": ["warn", ESLINT_THRESHOLDS.MAX_FUNCTION_PARAMS],
      "max-lines-per-function": [
        "warn",
        ESLINT_THRESHOLDS.MAX_LINES_PER_FUNCTION,
      ],
      "no-nested-ternary": "error", // Avoid complex conditionals
      complexity: ["warn", ESLINT_THRESHOLDS.MAX_CYCLOMATIC_COMPLEXITY],
      "prefer-arrow-callback": "error",

      // Objects and Arrays
      "prefer-destructuring": [
        "warn",
        {
          array: false,
          object: true,
        },
      ],
      "object-shorthand": ["error", "always"],
      "no-array-constructor": "error",
      "no-new-object": "error",
      "prefer-template": "warn",
      "prefer-spread": "error",

      // Clean Code Basics
      eqeqeq: ["error", "always"],
      "no-else-return": "warn",
      "no-lonely-if": "warn",
      "no-unneeded-ternary": "error",
      "operator-assignment": ["error", "always"],

      // Side Effects & Immutability
      "no-param-reassign": ["warn", { props: true }],

      // General Quality
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-shadow": "error",
      "no-redeclare": "error",
      "no-use-before-define": [
        "error",
        {
          functions: false,
        },
      ],

      "no-console": [
        "warn",
        {
          allow: ["info", "warn", "error", "table"],
        },
      ],

      // Comments (Clean Code)
      "no-warning-comments": [
        "warn",
        {
          terms: ["todo", "fixme", "hack"],
          location: "start",
        },
      ],
      "multiline-comment-style": ["warn", "separate-lines"],
    },
  },
  {
    files: ["**/*.json", "**/*.jsonc"],
    language: "json/json",
    ...json.configs.recommended,
  },
  {
    files: ["**/*.md"],
    language: "markdown/gfm",
    ...markdown.configs.recommended,
  },
  prettier,
];
