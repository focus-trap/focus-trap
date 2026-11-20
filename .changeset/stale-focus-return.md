---
'focus-trap': patch
---

Prevent a delayed focus return from overriding a newer trap interaction from the same library copy in the same document, including pending activations, separate trap stacks, explicit unpause, and reopening and closing the same trap. Recheck ownership after custom return-target resolvers run. Preserve post-deactivation callbacks, normal nested-trap focus restoration, and independent documents.
