---
'focus-trap': patch
---

Fixes lifecycle ordering bug introduced in v8.0.0 that always delays the order even if `delayInitialFocus=false`, `delayReturnFocus=false`, `checkCanFocusTrap=undefined`, `checkCanReturnFocus=undefined` (which would indicate a fully synchronous activation/pause/unpause/deactivation process) [#1862](https://github.com/focus-trap/focus-trap/issues/1862)
