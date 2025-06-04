//
// ROOT ESLint Configuration
//

/* eslint-env node */

import url from 'node:url';
import path from 'node:path';
import js from '@eslint/js';
import globals from 'globals';
import babel from '@babel/eslint-plugin';
import babelParser from '@babel/eslint-parser';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import jestDom from 'eslint-plugin-jest-dom';
import cypress from 'eslint-plugin-cypress';
import importPlugin from 'eslint-plugin-import';
import testingLibrary from 'eslint-plugin-testing-library';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const ecmaVersion = 'latest';
const impliedStrict = true;
const tsconfigRootDir = __dirname;

//
// Plugins
//

// Plugins that apply to ALL envs
const basePlugins = {
  '@babel': babel, // @see https://www.npmjs.com/package/@babel/eslint-plugin
};

const importPluginSettings = {
  'import/resolver': {
    node: {
      extensions: [
        '.js',
        '.jsx',
        '.cts',
        '.mjs',
        '.ts',
        '.tsx',
        '.cts',
        '.mts',
      ],
      moduleDirectory: ['node_modules'],
    },
    typescript: {
      alwaysTryTypes: true,
    },
  },
};

//
// Globals
//

// Globals that apply to ALL envs
const baseGlobals = {
  // anything in addition to what `languageOptions.ecmaVersion` provides
  // @see https://eslint.org/docs/latest/use/configure/language-options#predefined-global-variables
};

// Globals for repo tooling scripts
const toolingGlobals = {
  ...globals.node,
};

// Globals for browser-based source code
const browserGlobals = {
  ...globals.browser,
};

// Globals for test files
const testGlobals = {
  ...globals.jest,
  ...cypress.configs.globals.languageOptions.globals,

  // `globals.browser` defines this global but it's also part of the `testing-library`
  //  API so needs to be overwritable to avoid ESLint's `no-redeclare` rule
  screen: 'off',
};

// Globals for BUNDLED (Webpack, Rollup, etc) source code
// NOTE: these must also be defined in <repo>/src/globals.d.ts referenced in the
//  <repo>/tsconfig.json as well as the `globals` property in <repo>/jest.config.mjs
const bundlerGlobals = {
  // RUP_* consts are defined in the Rollup build via the `replace` plugin
  RUP_BUILD_ENV: 'readonly',
  RUP_IS_CYPRESS_ENV: 'readonly',
};

//
// Base rules
// @see http://eslint.org/docs/rules/RULE-NAME
//

const baseRules = {
  ...js.configs.recommended.rules,
  'no-regex-spaces': 'off',
  'no-await-in-loop': 'error',
  'no-async-promise-executor': 'error',
  'no-misleading-character-class': 'error',
  'no-unsafe-optional-chaining': 'error',

  //// Best practices

  curly: 'error',
  'default-case': 'error',
  eqeqeq: 'error',
  'guard-for-in': 'error',
  'no-alert': 'error',
  'no-caller': 'error',
  'no-console': 'error',
  'no-else-return': 'error',
  'no-eq-null': 'error',
  'no-eval': 'error',
  'no-lone-blocks': 'error',
  'no-loop-func': 'error',
  'no-multi-spaces': 'error',
  'no-new': 'off',
  'no-new-func': 'error',
  'no-new-wrappers': 'error',
  'no-throw-literal': 'error',
  'no-warning-comments': [
    'error',
    {
      terms: ['DEBUG', 'FIXME', 'HACK'],
      location: 'start',
    },
  ],

  //// Strict mode

  strict: ['error', 'function'],

  //// Variables

  'no-catch-shadow': 'error',
  'no-shadow': 'error',
  'no-unused-vars': [
    'error',
    {
      args: 'none',
      caughtErrors: 'none',
      vars: 'local',
    },
  ],
  'no-use-before-define': 'error',

  //// Stylistic issues

  // NONE: Prettier will take care of these by reformatting the code on commit,
  //  save a few exceptions.

  // Prettier will format using single quotes per .prettierrc.js settings, but
  //  will not require single quotes instead of backticks/template strings
  //  when interpolation isn't used, so this rule will catch those cases
  quotes: [
    'error',
    'single',
    {
      avoidEscape: true,
      allowTemplateLiterals: false,
    },
  ],

  //// ECMAScript 6 (non-stylistic issues only)

  'no-duplicate-imports': ['error', { includeExports: true }],
  'no-useless-constructor': 'error',
  'no-var': 'error',
  'prefer-const': 'error',
};

//
// TypeScript-specific rules
//

const typescriptRules = {
  ...typescript.configs['recommended-type-checked'].rules,

  // AFTER TypeScript rules to turn off `import` rules that TypeScript covers
  ...importPlugin.flatConfigs.typescript.rules,
};

//
// Test-specific rules
//

const testRules = {
  //// jest plugin

  'jest/no-disabled-tests': 'error',
  'jest/no-focused-tests': 'error',
  'jest/no-identical-title': 'error',
  'jest/valid-title': 'error',

  // doesn't work well when expect() used with Cypress API
  'jest/valid-expect': 'off',

  //// jest-dom plugin

  // this rule is buggy, and doesn't seem to work well with the Testing Library's queries
  'jest-dom/prefer-in-document': 'off',

  //// testing-library plugin

  // this prevents expect(document.querySelector('foo')), which is useful because not
  //  all elements can be found using RTL queries (sticking to RTL queries probably
  //  means less fragile tests, but then there are things we wouldn't be able to
  //  test like whether something renders in Light mode or Dark mode as expected)
  'testing-library/no-node-access': 'off',

  // we use custom queries, which don't get added to `screen` (that's a miss in RTL, IMO),
  //  which means we _must_ destructure the result from `render()` in order to get to
  //  our custom queries
  'testing-library/prefer-screen-queries': 'off',

  // not much value in this one, and it's not sophisticated enough to detect all usage
  //  scenarios so we get false-positives
  'testing-library/await-async-utils': 'off',

  //// Cypress plugin

  ...cypress.configs.recommended.rules,
};

//
// Config generators
//

/**
 * Project scripts.
 * @param {boolean} isModule
 * @param {boolean} isTypescript Ignored if `isModule=false`
 * @returns {Object} ESLint config.
 */
const createToolingConfig = (isModule = true, isTypescript = false) => ({
  files: isModule
    ? isTypescript
      ? ['**/*.{ts,mts}']
      : ['**/*.{js,mjs}']
    : ['**/*.{js,cjs}'],
  ignores: ['index.js', 'docs/**/*.*'],
  plugins: {
    ...basePlugins,
    ...(isModule ? { import: importPlugin } : {}),
    ...(isTypescript ? { '@typescript-eslint': typescript } : {}),
  },
  languageOptions: {
    ecmaVersion,
    parser: isTypescript ? typescriptParser : babelParser,
    parserOptions: {
      sourceType: isModule ? 'module' : 'script',
      ...(isModule && isTypescript
        ? {
            project: true,
            tsconfigRootDir,
          }
        : {}),
      ecmaFeatures: {
        impliedStrict,
        jsx: false,
      },
    },
    globals: {
      ...baseGlobals,
      ...toolingGlobals,
    },
  },
  settings: {
    ...(isModule ? importPluginSettings : {}),
  },
  rules: {
    ...baseRules,
    ...(isModule ? importPlugin.flatConfigs.recommended.rules : {}), // BEFORE TypeScript rules
    ...(isModule && isTypescript ? typescriptRules : {}),
    'no-console': 'off', // OK in repo scripts
  },
});

/**
 * JavaScript source files.
 * @returns ESLint config.
 */
const createSourceJSConfig = () => ({
  files: ['index.js'],
  plugins: {
    ...basePlugins,
    import: importPlugin,
  },
  languageOptions: {
    ecmaVersion,
    parser: babelParser,
    parserOptions: {
      sourceType: 'module',
      ecmaFeatures: {
        impliedStrict,
        jsx: false,
      },
    },
    globals: {
      ...baseGlobals,
      ...bundlerGlobals,
      ...browserGlobals,
    },
  },
  settings: {
    ...importPluginSettings,
  },
  rules: {
    ...baseRules,
    ...importPlugin.flatConfigs.recommended.rules,
  },
});

/**
 * JavaScript doc/example files.
 * @returns ESLint config.
 */
const createDocsJSConfig = () => {
  const config = createSourceJSConfig();
  config.files = ['docs/**/*.js'];
  config.languageOptions.parserOptions.sourceType = 'script';
  config.languageOptions.globals = {
    ...config.languageOptions.globals,
    ...globals.commonjs,
  };
  return config;
};

const createSourceTSConfig = () => ({
  files: ['index.d.ts', 'docs/**/*.ts'],
  plugins: {
    ...basePlugins,
    import: importPlugin,
    '@typescript-eslint': typescript,
  },
  languageOptions: {
    ecmaVersion,
    parser: typescriptParser,
    parserOptions: {
      project: true,
      tsconfigRootDir,
      sourceType: 'module',
      ecmaFeatures: {
        impliedStrict,
        jsx: false,
      },
    },
    globals: {
      ...baseGlobals,
      ...bundlerGlobals,
      ...browserGlobals,
    },
  },
  rules: {
    ...baseRules,
    ...importPlugin.flatConfigs.recommended.rules, // BEFORE TypeScript rules
    ...typescriptRules,
  },
});

const createTestConfig = (isTypescript = false) => ({
  files: isTypescript ? ['cypress/e2e/**/*.ts'] : ['cypress/e2e/**/*.js'],
  plugins: {
    ...basePlugins,
    import: importPlugin,
    ...(isTypescript ? { '@typescript-eslint': typescript } : {}),
    jest,
    'jest-dom': jestDom,
    'testing-library': testingLibrary,
    cypress,
  },
  languageOptions: {
    ecmaVersion,
    parser: isTypescript ? typescriptParser : babelParser,
    parserOptions: {
      ...(isTypescript
        ? {
            project: true,
            tsconfigRootDir,
          }
        : {}),
      sourceType: 'module',
      ecmaFeatures: {
        impliedStrict,
        jsx: false,
      },
    },
    globals: {
      ...baseGlobals,
      ...bundlerGlobals, // because tests execute code that also gets bundled
      ...browserGlobals,
      ...testGlobals,
    },
  },
  rules: {
    ...baseRules,
    ...importPlugin.flatConfigs.recommended.rules, // BEFORE TypeScript rules
    ...(isTypescript ? typescriptRules : {}),
    ...testRules,
  },
});

export default [
  // Ignores
  {
    ignores: [
      // third-party
      '**/node_modules/',
      // build output
      'dist/**',
      'docs/demo-bundle-*.*',
      // test output
      'coverage/**',
    ],
  },

  // Tooling Configs
  createToolingConfig(false), // CJS scripts
  createToolingConfig(true), // ESM scripts
  createToolingConfig(true, true), // TS scripts

  // Source Configs
  createSourceJSConfig(),
  createSourceTSConfig(),

  // Docs Config
  createDocsJSConfig(),

  // Test Configs
  createTestConfig(), // JS tests
  createTestConfig(true), // TS tests

  // Prettier
  // ALWAYS LAST: disable style rules that conflict with prettier
  // @see https://typescript-eslint.io/troubleshooting/formatting#suggested-usage---prettier
  {
    plugins: {
      prettier,
    },
    rules: prettier.rules,
  },
];
