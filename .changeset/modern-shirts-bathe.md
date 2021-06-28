---
'focus-trap': minor
---

Add option to allow no initial focus when trap activates via `initialFocus: false`

There may be cases where we don't want to focus the first tabbable element when a focus trap activates.

Examples use-cases:

- Modals/dialogs
- On mobile devices where "tabbing" doesn't make sense without a connected Bluetooth keyboard

In addition, this change ensures that any element inside the trap manually focused outside of `focus-trap` code will be brought back in focus if focus is somehow found outside of the trap.

Example usage:

When the trap activates, there will be no initially focused element inside the new trap.

```js
const focusTrap = createFocusTrap('#some-container', {
  initialFocus: false,
});
```
