import eslintJs from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintReact from '@eslint-react/eslint-plugin'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginStorybook from 'eslint-plugin-storybook'
import eslintConfigPrettier from 'eslint-config-prettier'
import stylisticJs from '@stylistic/eslint-plugin-js'

const tsFiles = ['**/*.{ts,tsx,mts,cts}']
const reactFiles = ['src/**/*.{js,jsx,ts,tsx}', '.storybook/preview.{jsx,tsx}']

export default [
  {
    ignores: [
      'node_modules/**',
      'build/**',
      'storybook-static/**',
      'coverage/**',
    ],
  },

  eslintJs.configs.recommended,

  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: tsFiles,
  })),

  eslintReact.configs['recommended-typescript'],

  {
    files: reactFiles,
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'react/prop-types': 'off',
    },
  },

  ...pluginStorybook.configs['flat/recommended'],

  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: [
      '*.config.{js,mjs,cjs,ts,mts,cts}',
      '.storybook/**/*.{js,jsx,mjs,ts,tsx,mts}',
    ],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: [
      '**/*.{test,spec}.{js,jsx,ts,tsx}',
      'src/setupTests.{js,ts}',
    ],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/quotes': ['error', 'single', { avoidEscape: true}],
      '@stylistic/js/semi': ['error', 'never'],
    },
  },
  {
    files: tsFiles,
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  eslintConfigPrettier,
]
