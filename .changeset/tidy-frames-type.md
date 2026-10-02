---
'focus-trap': patch
---

Preserve an input's existing caret position or text selection when activating a trap in an iframe. Typing after activation no longer replaces the input's entire value.

Keep track of an already-focused input so removing it restores focus inside the trap.
