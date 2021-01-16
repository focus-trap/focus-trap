# focus-trap [![CI](https://github.com/focus-trap/focus-trap/workflows/CI/badge.svg?branch=master&event=push)](https://github.com/focus-trap/focus-trap/actions?query=workflow:CI+branch:master) [![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-14-orange.svg?style=flat-square)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Trap focus within a DOM node.

There may come a time when you find it important to trap focus within a DOM node — so that when a user hits `Tab` or `Shift+Tab` or clicks around, she can't escape a certain cycle of focusable elements.

You will definitely face this challenge when you are trying to build **accessible modals**.

This module is a little, modular **vanilla JS** solution to that problem.

Use it in your higher-level components. For example, if you are using React check out [focus-trap-react](https://github.com/focus-trap/focus-trap-react), a light wrapper around this library. If you are not a React user, consider creating light wrappers in your framework-of-choice.

## What it does

When a focus trap is activated, this is what should happen:

- Some element within the focus trap receives focus. By default, this will be the first element in the focus trap's tab order (as determined by [tabbable](https://github.com/focus-trap/tabbable)). Alternately, you can specify an element that should receive this initial focus.
- The `Tab` and `Shift+Tab` keys will cycle through the focus trap's tabbable elements *but will not leave the focus trap*.
- Clicks within the focus trap behave normally; but clicks *outside* the focus trap are blocked.
- The `Escape` key will deactivate the focus trap.

When the focus trap is deactivated, this is what should happen:

- Focus is passed to *whichever element had focus when the trap was activated* (e.g. the button that opened the modal or menu).
- Tabbing and clicking behave normally everywhere.

[Check out the demos.](http://focus-trap.github.io/focus-trap/demo/)

For more advanced usage (e.g. focus traps within focus traps), you can also pause a focus trap's behavior without deactivating it entirely, then unpause at will.

## Installation

```
npm install focus-trap
```

### UMD

You can also use a UMD version published to `unpkg.com` as `dist/focus-trap.umd.js` and `dist/focus-trap.umd.min.js`.

> NOTE: The UMD build does not bundle the `tabbable` dependency. Therefore you will have to also include that one, and include it _before_ `focus-trap`.

```html
<head>
  <script src="https://unpkg.com/tabbable/dist/index.umd.js"></script>
  <script src="https://unpkg.com/focus-trap/dist/focus-trap.umd.js"></script>
</head>
```

## Browser Support

IE9+

Why?
Because this module uses [`EventTarget.addEventListener()`](document.createElement('button')).
And its only dependency, tabbable, uses [a couple of IE9+ functions](https://github.com/focus-trap/tabbable#browser-support).

## Usage

### createFocusTrap(element[, createOptions])

```javascript
import * as focusTrap from 'focus-trap'; // ESM
const focusTrap = require('focus-trap'); // CJS
// UMD: `focusTrap` is defined as a global on `window`

trap = focusTrap.createFocusTrap(element[, createOptions]);
```

Returns a new focus trap on `element` (one or more "containers" of tabbable nodes that, together, form the total set of nodes that can be visited, with clicks or the tab key, within the trap).

`element` can be
- a DOM node (the focus trap itself);
- a selector string (which will be passed to `document.querySelector()` to find the DOM node); or
- an array of DOM nodes or selector strings (where the order determines where the focus will go after the last tabbable element of a DOM node/selector is reached).

> A focus trap must have at least one container with at least one tabbable/focusable node in it to be considered valid. While nodes can be added/removed at runtime, with the trap adjusting to added/removed tabbable nodes, __an error will be thrown__ if the trap ever gets into a state where it determines none of its containers have any tabbable nodes in them _and_ the `fallbackFocus` option does not resolve to an alternate node where focus can go.

`createOptions`:

- **onActivate** {function}: A function that will be called when the focus trap activates.
- **onDeactivate** {function}: A function that will be called when the focus trap deactivates,
- **initialFocus** {element|string|function}: By default, when a focus trap is activated the first element in the focus trap's tab order will receive focus. With this option you can specify a different element to receive that initial focus. Can be a DOM node, or a selector string (which will be passed to `document.querySelector()` to find the DOM node), or a function that returns a DOM node.
- **fallbackFocus** {element|string|function}: By default, an error will be thrown if the focus trap contains no elements in its tab order. With this option you can specify a fallback element to programmatically receive focus if no other tabbable elements are found. For example, you may want a popover's `<div>` to receive focus if the popover's content includes no tabbable elements. *Make sure the fallback element has a negative `tabindex` so it can be programmatically focused.* The option value can be a DOM node, a selector string (which will be passed to `document.querySelector()` to find the DOM node), or a function that returns a DOM node.
- **escapeDeactivates** {boolean}: Default: `true`. If `false`, the `Escape` key will not trigger deactivation of the focus trap. This can be useful if you want to force the user to make a decision instead of allowing an easy way out.
- **clickOutsideDeactivates** {boolean|(e: MouseEvent) => boolean}: If `true` or returns `true`, a click outside the focus trap will deactivate the focus trap and allow the click event to do its thing (i.e. to pass-through to the element that was clicked). This option **takes precedence** over `allowOutsideClick` when it's set to `true`. Default: `false`.
  - ⚠️ If you're using a password manager such as 1Password, where the app adds a clickable icon to all fillable fields, you should avoid using this option, and instead use the `allowOutsideClick` option to better control exactly when the focus trap can be deactivated. The clickable icons are usually positioned absolutely, floating on top of the fields, and therefore _not_ part of the container the trap is managing. When using the `clickOutsideDeactivates` option, clicking on a field's 1Password icon will likely cause the trap to be unintentionally deactivated.
- **allowOutsideClick** {boolean|(e: MouseEvent) => boolean}: If set and is or returns `true`, a click outside the focus trap will not be prevented, even when `clickOutsideDeactivates` is `false`. When `clickOutsideDeactivates` is `true`, this option is **ignored** (i.e. if it's a function, it will not be called). Use this option to control if (and even which) clicks are allowed outside the trap in conjunction with `clickOutsideDeactivates: false`. Default: `false`.
- **returnFocusOnDeactivate** {boolean}: Default: `true`. If `false`, when the trap is deactivated, focus will *not* return to the element that had focus before activation.
- **setReturnFocus** {element|string|function}: By default, focus trap on deactivation will return to the element that was focused before activation. With this option you can specify another element to programmatically receive focus after deactivation. Can be a DOM node, or a selector string (which will be passed to `document.querySelector()` to find the DOM node), or a function that returns a DOM node.
- **preventScroll** {boolean}: By default, focus() will scroll to the element if not in viewport. It can produce unintended effects like scrolling back to the top of a modal. If set to `true`, no scroll will happen.
- **delayInitialFocus** {boolean}: Default: `true`. Delays the autofocus when the focus trap is activated. This prevents elements within the focusable element from capturing the event that triggered the focus trap activation.

### trap.activate([activateOptions])

Activates the focus trap, adding various event listeners to the document.

If focus is already within it the trap, it remains unaffected. Otherwise, focus-trap will try to focus the following nodes, in order:

- `createOptions.initialFocus`
- The first tabbable node in the trap
- `createOptions.fallbackFocus`

If none of the above exist, an error will be thrown. You cannot have a focus trap that lacks focus.

Returns the `trap`.

`activateOptions`:

These options are used to override the focus trap's default behavior for this particular activation.

- **onActivate** {function | null | false}: Default: whatever you chose for `createOptions.onActivate`. `null` or `false` are the equivalent of a `noop`.

### trap.deactivate([deactivateOptions])

Deactivates the focus trap.

Returns the `trap`.

`deactivateOptions`:

These options are used to override the focus trap's default behavior for this particular deactivation.

- **returnFocus** {boolean}: Default: whatever you chose for `createOptions.returnFocusOnDeactivate`.
- **onDeactivate** {function | null | false}: Default: whatever you chose for `createOptions.onDeactivate`. `null` or `false` are the equivalent of a `noop`.

### trap.pause()

Pause an active focus trap's event listening without deactivating the trap.

If the focus trap has not been activated, nothing happens.

Returns the `trap`.

Any `onDeactivate` callback will not be called, and focus will not return to the element that was focused before the trap's activation. But the trap's behavior will be paused.

This is useful in various cases, one of which is when you want one focus trap within another. `demo-six` exemplifies how you can implement this.

### trap.unpause()

Unpause an active focus trap. (See `pause()`, above.)

Focus is forced into the trap just as described for `focusTrap.activate()`.

If the focus trap has not been activated or has not been paused, nothing happens.

Returns the `trap`.

### trap.updateContainerElements()

Update the element(s) that are used as containers for the focus trap.

When you call the function `createFocusTrap`, you pass in an element (or selector), or an array of elements (or selectors) to keep the focus within.  This method simply allows you to update which elements to keep the focus within.

A use case for this is found in focus-trap-react, where React `ref`'s may not be initialized yet, but when they are you want to have them be a container element.

Returns the `trap`.

## Examples

Read code in `demo/` and [see how it works](http://focus-trap.github.io/focus-trap/demo/).

Here's what happens in `default.js` (the "default behavior" demo):

```js
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('default');

const focusTrap = createFocusTrap('#default', {
  onActivate: function () {
    container.className = 'trap is-active';
  },
  onDeactivate: function () {
    container.className = 'trap';
  },
});

document
  .getElementById('activate-default')
  .addEventListener('click', function () {
    focusTrap.activate();
  });

document
  .getElementById('deactivate-default')
  .addEventListener('click', function () {
    focusTrap.deactivate();
  });
```

## Other details

### One at a time

*Only one focus trap can be listening at a time.* If a second focus trap is activated the first will automatically pause. The first trap is unpaused and again traps focus when the second is deactivated.

Focus trap manages a queue of traps: if A activates; then B activates, pausing A; then C activates, pausing B; when C then deactivates, B is unpaused; and when B then deactivates, A is unpaused.

### Use predictable elements for the first and last tabbable elements in your trap

The focus trap will work best if the *first* and *last* focusable elements in your trap are simple elements that all browsers treat the same, like buttons and inputs.**

Tabbing will work as expected with trickier, less predictable elements — like iframes, shadow trees, audio and video elements, etc. — as long as they are *between* more predictable elements (that is, if they are not the first or last tabbable element in the trap).

This limitation is ultimately rooted in browser inconsistencies and inadequacies, but it comes to focus-trap through its dependency [Tabbable](https://github.com/focus-trap/tabbable). You can read about more details [in the Tabbable documentation](https://github.com/focus-trap/tabbable#more-details).

### Your trap should include a tabbable element or a focusable container

You can't have a focus trap without focus, so an error will be thrown if you try to initialize focus-trap with an element that contains no tabbable nodes.

If you find yourself in this situation, you should give you container `tabindex="-1"` and set it as `initialFocus` or `fallbackFocus`. A couple of demos illustrate this.

## Development

Because of the nature of the functionality, involving keyboard and click and (especially) focus events, JavaScript unit tests don't make sense. After all, JSDom does not fully support focus events. Since the demo was developed to also be the test, we use Cypress to automate running through all demos in the demo page.

# Contributing

See [CONTRIBUTING](CONTRIBUTING.md).

## Contributors

In alphabetical order:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://davidtheclark.com/"><img src="https://avatars2.githubusercontent.com/u/628431?v=4" width="100px;" alt=""/><br /><sub><b>David Clark</b></sub></a><br /><a href="https://github.com/focus-trap/focus-trap/commits?author=davidtheclark" title="Code">💻</a> <a href="https://github.com/focus-trap/focus-trap/issues?q=author%3Adavidtheclark" title="Bug reports">🐛</a> <a href="#infra-davidtheclark" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/focus-trap/focus-trap/commits?author=davidtheclark" title="Tests">⚠️</a> <a href="https://github.com/focus-trap/focus-trap/commits?author=davidtheclark" title="Documentation">📖</a> <a href="#maintenance-davidtheclark" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://stefancameron.com/"><img src="https://avatars3.githubusercontent.com/u/2855350?v=4" width="100px;" alt=""/><br /><sub><b>Stefan Cameron</b></sub></a><br /><a href="https://github.com/focus-trap/focus-trap/commits?author=stefcameron" title="Code">💻</a> <a href="https://github.com/focus-trap/focus-trap/issues?q=author%3Astefcameron" title="Bug reports">🐛</a> <a href="#infra-stefcameron" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/focus-trap/focus-trap/commits?author=stefcameron" title="Tests">⚠️</a> <a href="https://github.com/focus-trap/focus-trap/commits?author=stefcameron" title="Documentation">📖</a> <a href="#maintenance-stefcameron" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/liunate"><img src="https://avatars2.githubusercontent.com/u/38996291?v=4" width="100px;" alt=""/><br /><sub><b>Nate Liu</b></sub></a><br /><a href="https://github.com/focus-trap/focus-trap/commits?author=liunate" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/sadick254"><img src="https://avatars2.githubusercontent.com/u/5238135?v=4" width="100px;" alt=""/><br /><sub><b>Sadick</b></sub></a><br /><a href="https://github.com/focus-trap/focus-trap/commits?author=sadick254" title="Code">💻</a> <a href="https://github.com/focus-trap/focus-trap/commits?author=sadick254" title="Tests">⚠️</a> <a href="https://github.com/focus-trap/focus-trap/commits?author=sadick254" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/michael-ar"><img src="https://avatars3.githubusercontent.com/u/18557997?v=4" width="100px;" alt=""/><br /><sub><b>Michael Reynolds</b></sub></a><br /><a href="https://github.com/focus-trap/focus-trap/issues?q=author%3Amichael-ar" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://seanmcp.com/"><img src="https://avatars1.githubusercontent.com/u/6360367?v=4" width="100px;" alt=""/><br /><sub><b>Sean McPherson</b></sub></a><br /><a href="https://github.com/focus-trap/focus-trap/commits?author=SeanMcP" title="Code">💻</a> <a href="https://github.com/focus-trap/focus-trap/commits?author=SeanMcP" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/features/security"><img src="https://avatars1.githubusercontent.com/u/27347476?v=4" width="100px;" alt=""/><br /><sub><b>Dependabot</b></sub></a><br /><a href="#maintenance-dependabot" title="Maintenance">🚧</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://recollectr.io"><img src="https://avatars2.githubusercontent.com/u/6835891?v=4" width="100px;" alt=""/><br /><sub><b>Slapbox</b></sub></a><br /><a href="https://github.com/focus-trap/focus-trap/issues?q=author%3ASlapbox" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/bparish628"><img src="https://avatars1.githubusercontent.com/u/8492971?v=4" width="100px;" alt=""/><br /><sub><b>Benjamin Parish</b></sub></a><br /><a href="https://github.com/focus-trap/focus-trap/issues?q=author%3Abparish628" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://scottblinch.me/"><img src="https://avatars2.githubusercontent.com/u/4682114?v=4" width="100px;" alt=""/><br /><sub><b>Scott Blinch</b></sub></a><br /><a href="https://github.com/focus-trap/focus-trap/commits?author=scottblinch" title="Documentation">📖</a></td>
    <td align="center"><a href="https://clintgoodman.com"><img src="https://avatars3.githubusercontent.com/u/5473697?v=4" width="100px;" alt=""/><br /><sub><b>Clint Goodman</b></sub></a><br /><a href="https://github.com/focus-trap/focus-trap/commits?author=cgood92" title="Code">💻</a> <a href="https://github.com/focus-trap/focus-trap/commits?author=cgood92" title="Documentation">📖</a> <a href="#example-cgood92" title="Examples">💡</a> <a href="https://github.com/focus-trap/focus-trap/commits?author=cgood92" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/zioth"><img src="https://avatars3.githubusercontent.com/u/945603?v=4" width="100px;" alt=""/><br /><sub><b>Zioth</b></sub></a><br /><a href="#ideas-zioth" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/focus-trap/focus-trap/issues?q=author%3Azioth" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/randypuro"><img src="https://avatars2.githubusercontent.com/u/2579?v=4" width="100px;" alt=""/><br /><sub><b>Randy Puro</b></sub></a><br /><a href="https://github.com/focus-trap/focus-trap/issues?q=author%3Arandypuro" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://tylerhawkins.info/201R/"><img src="https://avatars0.githubusercontent.com/u/13806458?v=4" width="100px;" alt=""/><br /><sub><b>Tyler Hawkins</b></sub></a><br /><a href="#tool-thawkin3" title="Tools">🔧</a> <a href="https://github.com/focus-trap/focus-trap/commits?author=thawkin3" title="Tests">⚠️</a> <a href="https://github.com/focus-trap/focus-trap/commits?author=thawkin3" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
