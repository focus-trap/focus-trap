---
'focus-trap': patch
---

Fix a trap deactivated (even if then reactivated) or paused again while unpausing (e.g. by its `onUnpause()` handler, or a focus handler on its initial focus node) still finishing the cancelled unpause, isolating its subtrees and calling `onPostUnpause()` afterward, which could leave adjacent elements `inert` or `aria-hidden` with no active trap.
