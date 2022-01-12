# Changelog

## 6.7.2

### Patch Changes

- c932330: Fixed bug where tabbing forward from an element with negative tabindex that is last in the trap would result in focus remaining on that element ([565](https://github.com/focus-trap/focus-trap/issues/565))

## 6.7.1

### Patch Changes

- 28a069f: Fix bug from #504 where it's no longer possible to create a trap without any options [#525]

## 6.7.0

### Minor Changes

- 893dd2c: Add `document` option to support focus traps inside `<iframe>` elements (#97)
- 244f0c1: Extend the `setReturnFocus` option to receive a reference to the element that had focus prior to the trap being activated when a function is specified. Additionally, the function can now return `false` to leave focus where it is at the time of deactivation. (#485)

### Patch Changes

- 60162eb: Fix bug where `KeyboardEvent` was not being passed to `escapeDeactivates` option when it's a function (#498)
- 7b6abfa: Fix how focus-trap determines the event's target, which was preventing traps inside open shadow DOMs from working properly (#496)
- 14b0ee8: Fix `initialFocus` option not supporting function returning `false` as documented (#490)

## 6.6.1

### Patch Changes

- 24063d7: Update tabbable to v5.2.1 to get bug fix for disabled fieldsets.

## 6.6.0

### Minor Changes

- 281e66c: Add option to allow no initial focus when trap activates via `initialFocus: false`

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

- 75be463: `escapeDeactivates` can now be either a boolean (as before) or a function that takes an event and returns a boolean.

### Patch Changes

- e2294f0: Fix race condition when activating a second trap where initial focus in the second trap may be thwarted because pausing of first trap clears the `delayInitialFocus` timer created for the second trap before during its activation sequence.

## 6.5.1

### Patch Changes

- c38bf3f: onPostDeactivate should always be called even if returnFocus/OnDeactivate is disabled.

## 6.5.0

### Minor Changes

- 278e77e: Adding 4 new configuration event options to improve support for animated dialogs and animated focus trap triggers: `checkCanFocusTrap()`, `onPostActivate()`, `checkCanReturnFocus()`, and `onPostDeactivate()`.

### Patch Changes

- 8d11e15: Improve docs and types for most options, adding `SVGElement` as a supported type of "DOM node" since it supports the `focus()` method, same as `HTMLElement`.

## 6.4.0

### Minor Changes

- 21c82ce: Bump tabbable from 5.1.6 to 5.2.0. There should be no changes in behavior as a result of this upgrade as `focus-trap` does not currently leverage the new `displayCheck` option.

### Patch Changes

- 1baf62e: Fix focus trapped on initial focus container with tabindex=-1 when pressing shift+tab (#363)

## 6.3.0

### Minor Changes

- a882d62: `clickOutsideDeactivates` can now also be a function that returns a `boolean`, similar to `allowOutsideClick`. The function receives the `MouseEvent` that triggered the click. (#289)

### Patch Changes

- 4d67dee: Fix a focus escape when pressing TAB after hiding element with focus (#281)
- ca32014: Bump tabbable from 5.1.4 to 5.1.5

## 6.2.3

### Patch Changes

- 036a72e: Fix crash in IE due to use of `Array.findIndex()` not supported in that browser (#257)

## 6.2.2

### Patch Changes

- fd3f2d1: Fix a bug where a multi-container trap would cease to work if all tabbable nodes were removed from one of the containers (fixes #223). As a result, an error is now thrown if the trap is left in a state where none of its containers contain any tabbable nodes (unless a `fallbackFocus` node has been configured in the trap's options). Also, the most-recently-focused node is more reliably tracked now, should focus somehow escape the trap and be brought back in by the trap, resulting in the truly most-recently-focused node to regain focus if that ever happens.

## 6.2.1

### Patch Changes

- f0c2aff: Bump tabbable to [5.1.4](https://github.com/focus-trap/tabbable/blob/master/CHANGELOG.md#514) for bug fix.
- 2ba512b:
  - Refactored code to use function declarations instead of hoisted functions (this should have no bearing on functionality in the build output included in `./dist`.
  - Fixed bugs where `trap.activate()` and `trap.deactivate()` would not always return the trap (now they do in all circumstances).
- d26d2e1: Refactoring to use const/let, and simplify a few lines. This does NOT impact the build output published in `./dist`, however, and hence does not impact browser support.

## 6.2.0

### Minor Changes

- 2267d17: Adding support for multiple elements to be passed in #217

## 6.1.4

### Patch Changes

- 38b6b98: Update tabbable to [5.1.3](https://github.com/focus-trap/tabbable/blob/master/CHANGELOG.md#513) to get bug fixes related to detail and summary elements.

## 6.1.3

### Patch Changes

- 6a39217: Close the gap with #172 and bump `tabbable` to 5.1.2 which has a similar fix.
- 756c79d: Fix #172 (again): Transpile ESM bundle down to the same browser target used for the CJS and UMD bundles. ESM is just the module system, not the browser target.

## 6.1.2

### Patch Changes

- 00674dd: Fix #172: Transpile non-minified bundles so they are compatible with IE11.
- 679009b: Update tabbable dependency to 5.1.1 to get transpiled non-minified bundles.

## 6.1.1

### Patch Changes

- fe2b0ad: Fixed #103: `returnFocusOnDeactivate` is now respected on auto-deactivation with `clickOutsideDeactivates=true`.

## 6.1.0

### Minor Changes

- 5174ce1: Add delayInitialFocus option

### Patch Changes

- 53b906b: Change `prepublishOnly` script to `prepare` script so that it also runs if someone installs the package directly from the git repo (e.g. from your work in which you fixed a bug or added a feature you're waiting to get merged to master and published to NPM).
- 31bb28e: Update tabbable dependency to 5.1.0. The most significant update for focus-trap is a bug fix related to fixed-position containers.

## 6.0.1

### Patch Changes

- 694e2fa: Package main/module entries no longer point to minified bundles.

## 6.0.0

- Add boolean value support for `allowOutsideClick` option.
- New `preventScroll` feature to _prevent_ scrolling to the element getting focus if not in the viewport.
- Changed code formatting to use dangling commas where ES5 supports them.
- **BREAKING**: Updated [tabbable](https://github.com/focus-trap/tabbable/blob/master/CHANGELOG.md#500) dependency to the new 5.0.0 release which contains breaking changes to its `isTabbableRadio()` internal function.
- Help with tree shaking by having `package.json` state `sideEffects: false` to mark this module as having no side effects as a result of merely importing it.
- **BREAKING**: This `package.json`'s "main" no longer points to `./index.js` in the package (although it still points to a CJS module, so it's possible this actually doesn't break anything). It now has:
  - "main": `dist/focus-trap.min.js` (the CJS bundle)
  - "module": `dist/focus-trap.esm.min.js` (the **new ESM bundle**)
  - the UMD is `dist/focus-trap.umd.min.js` if needed (convenient for loading directly in an older browser that doesn't support ESM)
  - **NOTE:** The CJS build no longer provides a function as a default export. Use `const { createFocusTrap } = require('focus-trap');` to get the function from before.
  - **NOTE:** The ESM build does not provide a default export. Use `import { createFocusTrap } from 'focus-trap';` to import the module.
- **New ESM Build**: Included in `dist/focus-trap.esm.*`.
- New UMD Build: Included in `dist/focus-trap.umd.*`.

## 5.1.0

- Add `setReturnFocus` option that allows you to set which element receives focus when the trap closes.

## 5.0.2

- Add `allowOutsideClick` option that allows you to pass a click event through, even when `clickOutsideDeactivates` is `false`.

## 5.0.0

- Update Tabbable to improve performance (see [Tabbable's changelog](https://github.com/davidtheclark/tabbable/blob/master/CHANGELOG.md)).
- **Breaking (kind of):** if the `onActivate` callback changes the list of tabbable nodes and the `initialFocus` option is not used, the initial focus will still go to the first element present before the callback.
- Improve performance of activating a trap.
- Register document-level event listeners as active (`passive: false`).

## 4.0.2

- Fix reference to root element that caused errors within Shadow DOM.

(Release 4.0.1 was a mistake, containing no changes.)

## 4.0.0

- **Breaking (kind of):** Focus trap now manages a queue of traps, so when a trap is paused because another trap activates, it will be unpaused when that other trap deactivates. If Trap A was automatically _paused_ because Trap B activated (existing behavior), when Trap B is deactivated Trap A will be automatically _unpaused_ (new behavior).

## 3.0.0

- **Breaking (kind of):** Update Tabbable to detect more elements and be more careful with radio buttons (see [Tabbable's changelog](https://github.com/davidtheclark/tabbable/blob/master/CHANGELOG.md)).
- **Breaking (kind of):** If `clickOutsideDeactivates` and `returnFocusOnDeactivate` are both `true`, focus will be returned to the pre-trap element only if the clicked element is not focusable.

## 2.4.6

- Add slight delay before moving focus to the first element in the trap. This should prevent an occasional bug caused when the first element in the trap will close the trap if it picks up on the event that triggered the trap's opening.

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

- Fixed: `clickOutsideDeactivates` no longer triggers deactivation when you click _inside_ the trap.

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
