---
'focus-trap': patch
---

Fix race condition when activating a second trap where initial focus in the second trap may be thwarted because pausing of first trap clears the `delayInitialFocus` timer created for the second trap before during its activation sequence.
