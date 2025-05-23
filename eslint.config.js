import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  files: ["**/*.{ts,tsx}"],
  plugins: {
    react: reactPlugin,
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
});
