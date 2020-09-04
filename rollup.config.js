/* eslint-env node */

import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';

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
  },
  {
    ...commonConfig,
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
  },
  {
    ...commonConfig,
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
  },
  {
    ...commonConfig,
    output: {
      file: `dist/${libName}.umd.min.js`,
      format: 'umd',
      noConflict: true,
      name: 'focusTrap',
      ...commonOutput,
    },
    plugins: [...commonPlugins, terser(terserOptions)],
  },
];

let config = {};
console.log(process.env.BUILD_ENV);
switch (process.env.BUILD_ENV) {
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
