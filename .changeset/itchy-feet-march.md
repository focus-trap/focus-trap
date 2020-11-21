---
'focus-trap': patch
---

Refactored code to use function declarations instead of hoisted functions (this should have no bearing on functionality in the build output included in `./dist`, and fixed bugs where `trap.activate()` and `trap.deactivate()` would not always return the trap (now they do in all circumstances).
