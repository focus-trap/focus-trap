---
'focus-trap': patch
---

- Bump tabbable to `^5.3.1` (fixing previous update which was incorrectly set to `5.3.0`).
- Fix `tabbableOptions` not being used in all internal uses of tabbable APIs.
- Expose `displayCheck` option in `tabbableOptions` typings and pass it through to tabbable APIs.
- Add info to README about testing traps in JSDom (which is not officially supported).
