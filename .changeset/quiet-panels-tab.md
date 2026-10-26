---
'focus-trap': patch
---

Fix Tab and Shift+Tab when focus is on a container (or a non-tabbable node at its edge) in a trap where some containers have no tabbable nodes. The trap used the container's position among all containers as its position among containers with tabbable nodes, so it threw `Cannot read properties of undefined (reading 'firstDomTabbableNode')` and let focus escape, or moved focus to the wrong container.
