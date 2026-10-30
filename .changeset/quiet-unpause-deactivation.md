---
'focus-trap': patch
---

Fix a trap deactivated while unpausing (e.g. by a focus handler on its initial focus node) still isolating its subtrees and calling `onPostUnpause()` after it was deactivated, which left adjacent elements `inert` or `aria-hidden` with no active trap.
