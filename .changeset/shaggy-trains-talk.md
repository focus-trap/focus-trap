---
'focus-trap': patch
---

Loosen checkCanFocusTrap Promise resolution type to `unknown` to make it easier to use `Promise.all()` or `Promise.allSettled()` as the returned Promise (`Promise<void>` was causing issues because those Promise APIs do not resolve with a `void` value).
