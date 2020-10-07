---
'focus-trap': patch
---

Fix #172 (again): Add `browser` target in package.json for use by bundlers. Both Webpack and Rollup can use this target above `module` and `main`, when specified, and our UMD bundle is transpiled down to basic ES5 for maximum browser compatibility. Our ESM bundle targets ESM browsers (which means is does not support IE 11). Webpack does this [by default](https://webpack.js.org/configuration/resolve/#resolvemainfields). Rollup, however, needs to be [configured](https://github.com/rollup/plugins/tree/master/packages/node-resolve#mainfields).
