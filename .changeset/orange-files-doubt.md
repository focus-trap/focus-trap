---
'focus-trap': patch
---

Fix #172 (again): Transpile ESM bundle down to the same browser target used for the CJS and UMD bundles. ESM is just the module system, not the browser target.
