/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    // Scopes reflect project structure under src/ plus cross-cutting concerns
    'scope-enum': [
      2,
      'always',
      [
        // src/app/
        'app',
        // src/core/
        'core',
        // src/features/
        'weather',
        'social-media',
        'image-gallery',
        // src/
        'router',
        'styles',
        // tests/
        'tests',
        // src/mocks/ + tests/msw-server.ts
        'mocks',
        // docs/
        'docs',
        // cross-cutting
        'deps',
        'ci',
        'release',
      ],
    ],

    // Scope is optional (e.g. "chore: bump node version")
    'scope-empty': [0],
  },
}
