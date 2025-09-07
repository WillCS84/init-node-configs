import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['prettierrc.js', 'eslint.config.mjs', 'tsconfig.json'],
  },
  // Configurações padrão do ESLint
  pluginJs.configs.recommended,

  // Configurações e regras do TypeScript
  ...tseslint.configs.recommended,

  // Suas regras e configurações personalizadas
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 11,
      sourceType: 'module',
      // Substitui o "env" para definir variáveis globais
      globals: {
        ...globals.browser,
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        module: 'readonly',
      },
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      // Regra para integração com o Prettier
      'prettier/prettier': 'error',
    },
  },

  // Configuração para o plugin do Prettier
  {
    plugins: {
      prettier: (await import('eslint-plugin-prettier')).default,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
