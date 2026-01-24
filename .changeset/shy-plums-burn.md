---
'focus-trap': major
---

__Breaking:__ Fixed a long-standing bug where `onPostActivate()` would be called _before_ the initial focus node was focused and the trap was fully activated. ([#1747](https://github.com/focus-trap/focus-trap/issues/1747))
    - By default (and for many years now), a trap delays setting focus to the initial focus node to the next frame (`setTimeout(0)`) but wasn't delaying calling `onPostActivate()` until after that delay.
    - With the new `isolateSubtrees='aria-hidden'` option, the currently-focused node's container (a non-subtree being "disabled") would get hidden before the delay was up, resulting in Chrome preventing the effect of `aria-hidden` on that subtree with a warning in the console due to the container being hidden still containing focus (e.g. the "activate trap" button).
    - __With the fix__, subtree isolation and the call to `onPostActivate()` await the initial focus delay (if there is one, which is default behavior; remove it with `delayInitialFocus=false`) before being applied/called.
    - This may cause tests to fail, requiring the addition of slight delays before testing a given state (e.g. `await waitFor(() => expect(initialFocusNode).toBeFocused())`.
    - It may also disrupt current assumptions about the state of the initial focus node in code that runs in your `onPostActivate()` handler (prior to this change, that node would __not__ be focused yet; after this change, __it will be focused__).
