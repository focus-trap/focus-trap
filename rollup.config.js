import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import modify from 'rollup-plugin-modify';

export default [
  {
    input: 'index.js',
    output: {
      file: 'dist/focus-trap.mjs',
      format: 'esm'
    },
    plugins: [
      modify({
        // swap tababble require load to ES6 import
        "var tabbable = require('tabbable');":
          "import tabbable from 'tabbable';",
        // ES6 module support implicitly means Object.assign support, so xtend can drop out
        "var xtend = require('xtend');": '',
        'xtend(': 'Object.assign(',
        // swap focus-trap from node module.exports to ES6 named export
        'function focusTrap(': 'export function focusTrap(',
        'module.exports = focusTrap;': ''
      }),
      resolve(),
      commonjs({
        include: [
          // tabbable is not an ES6 module, so bundle it
          'node_modules/tabbable/index.js'
        ]
      })
    ]
  }
];
