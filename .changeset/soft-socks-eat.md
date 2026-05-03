---
'focus-trap': patch
---

Fix bug where removing the ancestor of a focused node within a trap would result in focus landing on the body instead of remaining in the trap (#1660).
