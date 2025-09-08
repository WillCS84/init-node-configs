import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Regras básicas JS
  pluginJs.configs.recommended,

  // Regras TypeScript
  ...tseslint.configs.recommended,

  // Desativa regras conflitantes com Prettier
  prettierConfig,

  // Configurações personalizadas para TS
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'prettier/prettier': 'error', // Prettier manda na formatação
    },
  },
];
