---
'focus-trap': patch
---

Fixed bug where `clickOutsideDeactivate` handler would get called on the 'click' event even if the node clicked was in the trap. As with 'mousedown' and 'touchstart' events where this option is also used, the handler should only get called if the target node is _outside_ the trap.
