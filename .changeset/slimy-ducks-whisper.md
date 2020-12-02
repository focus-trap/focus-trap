---
'focus-trap': patch
---

Fix a bug where a multi-container trap would cease to work if all tabbable nodes were removed from one of the containers (fixes #223). As a result, an error is now thrown if the trap is left in a state where none of its containers contain any tabbable nodes (unless a `fallbackFocus` node has been configured in the trap's options). Also, the most-recently-focused node is more reliably tracked now, should focus somehow escape the trap and be brought back in by the trap, resulting in the truly most-recently-focused node to regain focus if that ever happens.
