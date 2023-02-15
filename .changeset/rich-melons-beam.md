---
'focus-trap': patch
---

Fix incorrect behavior of `returnFocusOnDeactivate` option when set to true (or defaulted to true) along with `clickOutsideDeactivates=true` and the outside click that deactivates is on a focusable node. Focus was remaining on that node instead of returning to the node focused just prior to activation. ([#893](https://github.com/focus-trap/focus-trap/issues/893))
