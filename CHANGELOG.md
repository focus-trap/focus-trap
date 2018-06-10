# Changelog

## 2.4.6

- Add slight delay before moving focus to the first element in the trap.
  This should prevent an occasional bug caused when the first element in the trap will close the trap if it picks up on the event that triggered the trap's opening.

## 2.4.5

- Fix `"main"` field in `package.json`.

## 2.4.4

- Publish UMD build so people can download it from `unpkg.com`.

## 2.4.3

- Fixed: TypeScript signature for `activate` function.

## 2.4.2

- Added: TypeScript declaration file.

## 2.3.1

- Fixed: Activation does not re-focus already-focused node.
- Fixed: Tabbing works as expected when initially focused Node has a negative `tabindex` and is in the middle of other tabbable elements.

## 2.3.0

- Added: `initialFocus` and `fallbackFocus` options can take functions that return DOM nodes.
- Fixed: `pause` and `unpause` cannot accidentally add extra event listeners.

## 2.2.0

- Added/fixed, depending on your perspective: If focus is already inside the focus trap when it is activated, leave focus where it is instead of forcing it to the first tabbable node or `initialFocus`.

## 2.1.0

- Added: `fallbackFocus` option.

## 2.0.2

- Fixed: `clickOutsideDeactivates` no longer triggers deactivation when you click *inside* the trap.

## 2.0.1

- Fix bug when activating multiple focus traps.

## 2.0.0

- Rewrote the thing, altering the API. Read the new docs please.
- Update `tabbable` to fix handling of traps with changing contents.

## 1.1.1

- Improve `clickOutsideDeactivates` functionality.

## 1.1.0

- Add `clickOutsideDeactivates` option.
- Add `escapeDeactivates` option.

## 1.0.2

- Make sure to `select()` `<input>` elements when they receive focus via tab.

## 1.0.1

- Fix buggy attempts to focus nodes that don't exist.

## 1.0.0

- Initial release.
