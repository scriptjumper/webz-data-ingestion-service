import js from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import prettierRecommended from 'eslint-config-prettier';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      '**/*.test.ts',
      'src/**/__tests__/**',
    ],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  prettierRecommended,
];
