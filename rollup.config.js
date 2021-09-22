/* eslint-disable no-console */
/* eslint-env node */

import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

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
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
  }),
  sourceMaps(),
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
const demo = {
  input: './docs/js/index.js',
  output: {
    name: 'focusTrapDemoBundle',
    preserveModules: false,
    file: 'docs/demo-bundle.js',
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
    banner,
  },
  plugins: [
    resolve(),
    commonjs(),
    injectProcessEnv({
      BUILD_ENV: process.env.BUILD_ENV,
      IS_CYPRESS_ENV: process.env.IS_CYPRESS_ENV,
    }),
    babel({ babelHelpers: 'bundled' }),
    isDevServer &&
      serve({
        port: 9966,
        contentBase: 'docs',
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
