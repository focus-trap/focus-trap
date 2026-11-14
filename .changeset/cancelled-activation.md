---
'focus-trap': patch
---

Fix several issues with a trap's activation being cancelled, superseded, or interrupted before it completes:

- Deactivating a trap while its `checkCanFocusTrap()` promise is pending no longer completes the activation (adding listeners, isolating subtrees, and calling `onPostActivate()`) once the promise settles.
- Reactivating a trap before a previous activation's `checkCanFocusTrap()` promise settles no longer lets that stale activation finish against the new one.
- Deactivating a trap while its initial focus is delayed (`delayInitialFocus: true`) no longer completes the activation.
- Deactivating a trap from a focus handler on its initial focus node (`delayInitialFocus: false`) no longer leaves document listeners behind that keep intercepting focus, clicks, and keys.
- Pausing a trap during activation (e.g. in `onActivate()`) or while it sets its initial focus no longer adds listeners to the paused trap or isolates other content.
- Cancelling a pending activation now restores the previous trap's subtree isolation instead of leaving it removed, and no longer removes `inert` or `aria-hidden` attributes the page had already set on adjacent elements.
- A trap that resumes while another trap's activation is still pending no longer re-isolates its subtrees, which hid the pending trap's container and, with `inert`, made its activation fail for lack of tabbable nodes.
