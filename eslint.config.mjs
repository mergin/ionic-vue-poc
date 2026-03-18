import js from '@eslint/js'
import globals from 'globals'
import jsdoc from 'eslint-plugin-jsdoc'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  {
    ignores: [
      '**/node_modules/**',
      '**/coverage/**',
      '**/dist/**',
      '**/public/mockServiceWorker.js',
      '**/ios/**',
      '**/android/**',
      'capacitor.config.ts',
      'playwright.config.ts',
      '.env.local',
      '.env.*.local',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'pnpm-debug.log*',
      '.idea/**',
      '.vscode/**',
      '*.suo',
      '*.ntvs*',
      '*.njsproj',
      '*.sln',
      '*.sw?',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    plugins: {
      jsdoc,
    },
    rules: {
      'jsdoc/require-jsdoc': [
        'error',
        {
          publicOnly: true,
          require: {
            FunctionDeclaration: true,
            ClassDeclaration: true,
            MethodDefinition: false,
            ArrowFunctionExpression: false,
            FunctionExpression: false,
          },
        },
      ],
      'jsdoc/require-description': 'error',
    },
  },
  {
    rules: {
      // Always warn on console.log/console.debug (allow intentional console.info/warn/error)
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      // Always error on debugger statements - never commit them
      'no-debugger': 'error',
      // Ionic uses slot=... for Shadow DOM slot assignment - not the deprecated Vue slot
      'vue/no-deprecated-slot-attribute': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // Enforce TypeScript interface syntax for defineProps
      'vue/define-props-declaration': ['error', 'type-based'],
      // Enforce script-setup API style across all SFCs
      'vue/component-api-style': ['error', ['script-setup']],
      // Enforce consistent template - script - style block order
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
      // Enforce import type for type-only imports (helps tree-shaking and clarity)
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
    },
  },
)
