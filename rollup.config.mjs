/* eslint-env node */

import { createRequire } from 'module';
import babelPlugin from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

// REQUIRED: process.env.BUILD_ENV: "esm" | "cjs" | "umd"

const terserOptions = {
  output: {
    comments(node, comment) {
      const text = comment.value;
      const type = comment.type;
      if (type === 'comment2') {
        // multiline comment: keep if it starts with a bang or contains
        //  some common preservation keywords
        return (
          text.indexOf('!') === 0 || /@preserve|@license|@cc_on/i.test(text)
        );
      }
    },
  },
};

const commonPlugins = [
  resolve(),
  commonjs({
    include: 'node_modules/**',
  }),
  babelPlugin({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
  }),
];

const banner = `/*!
* ${pkg.name} ${pkg.version}
* @license ${pkg.license}, ${pkg.homepage.replace(
  '#readme',
  '/blob/master/LICENSE'
)}
*/`;

const commonConfig = {
  input: './index.js',
};

const commonOutput = {
  preserveModules: false, // NOTE: must be false to 'roll-up' all code into one file
  sourcemap: true,
  banner,
};

const libName = 'focus-trap';

const cjs = [
  // NOTE: non-minified does NOT bundle dependencies
  {
    ...commonConfig,
    external: ['tabbable'],
    output: {
      file: `dist/${libName}.js`,
      format: 'cjs',
      ...commonOutput,
    },
    plugins: commonPlugins,
  },
  {
    ...commonConfig,
    external: ['tabbable'],
    output: {
      file: `dist/${libName}.min.js`,
      format: 'cjs',
      ...commonOutput,
    },
    plugins: [...commonPlugins, terser(terserOptions)],
  },
];

const esm = [
  // NOTE: non-minified does NOT bundle dependencies
  {
    ...commonConfig,
    external: ['tabbable'],
    output: {
      file: `dist/${libName}.esm.js`,
      format: 'esm',
      ...commonOutput,
    },
    plugins: commonPlugins,
  },
  {
    ...commonConfig,
    external: ['tabbable'],
    output: {
      file: `dist/${libName}.esm.min.js`,
      format: 'esm',
      ...commonOutput,
    },
    plugins: [...commonPlugins, terser(terserOptions)],
  },
];

const umd = [
  // NOTE: non-minified does NOT bundle dependencies
  {
    ...commonConfig,
    external: ['tabbable'],
    output: {
      file: `dist/${libName}.umd.js`,
      format: 'umd',
      noConflict: true,
      name: 'focusTrap',
      ...commonOutput,
      globals: {
        tabbable: 'tabbable',
      },
    },
    plugins: commonPlugins,
  },
  {
    ...commonConfig,
    external: ['tabbable'],
    output: {
      file: `dist/${libName}.umd.min.js`,
      format: 'umd',
      noConflict: true,
      name: 'focusTrap',
      ...commonOutput,
      globals: {
        tabbable: 'tabbable',
      },
    },
    plugins: [...commonPlugins, terser(terserOptions)],
  },
];

const isDevServer = process.env.SERVE === 'true';
const isLiveReload = process.env.RELOAD === 'true';
const isCypressRun =
  isDevServer && !isLiveReload && !!process.env.IS_CYPRESS_ENV;
const demoBanner = `/*!
* ${pkg.name} demo bundle${isCypressRun ? ' (cypress)' : ''}
*/`;

const demo = {
  input: './docs/js/index.js',
  output: {
    name: 'focusTrapDemoBundle',
    preserveModules: false,
    file: `docs/demo-bundle${isCypressRun ? '-cypress' : ''}.js`,
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
    banner: demoBanner,
  },
  plugins: [
    // ALWAYS FIRST: string token replacement
    replace({
      values: {
        RUP_BUILD_ENV: JSON.stringify(process.env.BUILD_ENV || null),
        RUP_IS_CYPRESS_ENV: JSON.stringify(process.env.IS_CYPRESS_ENV || null),
      },
      preventAssignment: true,
    }),
    resolve(),
    commonjs({
      strictRequires: 'auto',
    }),
    babelPlugin({ babelHelpers: 'bundled' }),
    isDevServer &&
      serve({
        port: 9966,
        contentBase: 'docs',
        openPage: `/index.html${isCypressRun ? '?bundle=cypress' : ''}`,
      }), // index.html should be in root of project
    isLiveReload && livereload({ port: 9966, watch: 'docs' }),
  ],
};

let config = [];
console.log('Building for env', process.env.BUILD_ENV);

switch (process.env.BUILD_ENV) {
  case 'demo':
    config = demo;
    break;
  case 'cjs':
    config = cjs;
    break;
  case 'esm':
    config = esm;
    break;
  case 'umd':
    config = umd;
    break;
  default:
    throw Error(
      'You must define process.env.BUILD_ENV before building with rollup. Check rollup.config.js for valid options.'
    );
}

export default config;
