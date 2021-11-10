module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
    },
    ecmaVersion: 6,
    sourceType: 'script',
  },
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'prettier', // ALWAYS LAST: disable style rules that conflict with prettier
  ],
  env: {
    es6: true,
    commonjs: true,
    browser: true,
  },
  overrides: [
    {
      files: ['index.js', 'rollup.config.js', 'cypress/support/index.js'],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
  rules: {
    //// possible errors

    'no-regex-spaces': 'off',
    'no-await-in-loop': 'error',
    'no-async-promise-executor': 'error',
    'no-misleading-character-class': 'error',

    //// best practices

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
    'no-new': 'off', // OFF to allow `myFunction(new RegExp('foo'))`, for example
    'no-new-func': 'error', // disallow `new Function(...)` to declare a new function
    'no-new-wrappers': 'error', // disallow `new Number/String/Boolean()`
    'no-throw-literal': 'error',
    'no-warning-comments': [
      'error',
      {
        terms: ['DEBUG', 'FIXME', 'HACK'],
        location: 'start',
      },
    ],

    //// strict mode

    strict: ['error', 'function'],

    //// variables

    'no-catch-shadow': 'error',
    'no-shadow': 'error',
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        caughtErrors: 'none',
      },
    ],
    'no-use-before-define': 'error',

    //// stylistic issues

    // NONE: Prettier will take care of these by reformatting the code on commit,
    //  save a few exceptions.

    // Prettier will format using single quotes per mds-format settings, but
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
    'prefer-arrow-callback': 'off',
    'prefer-const': 'error',
  },
};
