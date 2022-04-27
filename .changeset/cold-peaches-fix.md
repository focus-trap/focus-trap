---
'focus-trap': patch
---

Fixed: onDeactivate, onPostDeactivate, and checkCanReturnFocus options originally given to createFocusTrap() were not being used by default when calling `trap.deactivate({...})` with an option set even if that option set didn't specify any overrides of these options.
