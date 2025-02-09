import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends("plugin:react/recommended", "plugin:storybook/recommended"),
    {
        plugins: {
            react,
            "@typescript-eslint": typescriptEslint,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.jest,
                React: true,
                JSX: true,
            },

            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        settings: {
            react: {
                version: "detect",
            },
        },

        rules: {
            "react/prop-types": "off",
            camelcase: "off",
            "no-use-before-define": "off",
            "@typescript-eslint/no-use-before-define": ["error"],
            "comma-dangle": "off",
            "@typescript-eslint/comma-dangle": "off",
        },
    },
];