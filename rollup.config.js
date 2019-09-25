import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const BUILD = process.env.BUILD;

const configs = [
  {
    input: 'index.js',
    output: {
      name: 'focusTrap',
      file: pkg.browser.replace(/\.min(\.js)$/, '$1'),
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs()
    ]
  },
  {
    input: 'index.js',
    output: [
      { name: 'focusTrap', file: pkg.browser, format: 'umd' },
      { file: pkg.module, format: 'es', sourcemap: true }
    ],
    plugins: [
      resolve(),
      terser(),
      commonjs()
    ]
  },
  {
    input: 'demo/js/index.js',
    output: {
      name: 'focusTrapDemo',
      file: 'demo/demo-bundle.js',
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs()
    ]
  }
];

export default BUILD
  ? configs.filter((c,idx) => BUILD & (1<<idx))
  : configs;
