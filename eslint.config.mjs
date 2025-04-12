import { fixupConfigRules } from '@eslint/compat'
import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactJsx from 'eslint-plugin-react/configs/jsx-runtime.js'
import react from 'eslint-plugin-react/configs/recommended.js'
import globals from 'globals'
import ts from 'typescript-eslint'

export default [
  { languageOptions: { globals: {...globals.browser, ...globals.serviceworker} } },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...fixupConfigRules([
    {
      ...react,
      settings: {
        react: { version: 'detect' },
      },
    },
    reactJsx,
  ]),
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'semi': ['error', 'never'],
      'prefer-const': 'error',
      quotes: ['warn', 'single'],
      '@typescript-eslint/no-unused-vars': ['error', {'argsIgnorePattern': '^_'}],
      ...reactHooks.configs.recommended.rules,
    },
  },
  { ignores: ['dist/'] },
]
