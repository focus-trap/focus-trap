---
'focus-trap': patch
---

Prevent a delayed focus return from overriding a newer trap activation, including reopening the same trap. Preserve post-deactivation callbacks and normal nested-trap focus restoration.
