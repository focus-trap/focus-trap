# focus-trap

Trap focus within a DOM node.

There may come a time when you find it important to trap focus within a DOM node — so that when a user hits Tab or Shift+Tab or clicks around, she can't escape a certain cycle of focusable elements.

You will definitely face this challenge when you are try to build an **accessible modal or dropdown menu**.

This module is a little **vanilla JS** solution to the problem.

If you are using React, check out [focus-trap-react](https://github.com/davidtheclark/focus-trap-react), a light wrapper around this library. If you are not a React user, consider creating light wrappers in your framework-of-choice!

## What it does

[Check out the demo.](http://davidtheclark.github.io/focus-trap/demo/)

When a focus trap is activated, this is what should happen:

- Some element within the focus trap receives focus. By default, this will be the first element in the focus trap's tab order (as determined by [tabbable](https://github.com/davidtheclark/tabbable)); alternately, you can specify an element that should receive this initial focus.
- The Tab and Shift+Tab keys will cycle through the focus trap's tabbable elements *but will not leave the focus trap*.
- Clicks within the focus trap behave normally; but clicks *outside* the focus trap are blocked.
- The Escape key will deactivate the focus trap.

When the focus trap is deactivated, this is what should happen:

- Focus is passed to *whichever element had focus when the trap was activated*. In the case of a modal dialog, for instance, some trigger button probably initiated the activation; so when the modal closes, that trigger button will receive focus.
- Tabbing and clicking behave normally everywhere.

## Installation

```
npm install focus-trap
```

## Browser Support

IE9+

Why?
Because this module uses [`EventTarget.addEventListener()`](document.createElement('button')).
And its only dependency, tabbable, uses [a couple of IE9+ functions](https://github.com/davidtheclark/tabbable#browser-support).

## Usage

The module exposes two functions.

### focusTrap.activate(element[, options])

Turn `element` into a focus trap.

`element` can be a DOM node (the focus trap itself) or a selector string
(which will be pass to `document.querySelector()` to find the DOM node).

Options:

- **initialFocus** {element|string}: By default, when a focus trap is activated the first element in the focus trap's tab order will receive focus. With this option you can specify a different element to receive that initial focus. Can be a DOM node or a selector string (which will be pass to `document.querySelector()` to find the DOM node).
- **onDeactivate** {function}: A function that will be called when the focus trap deactivates. This can be useful if, for example, you want to remove a modal from the screen when the user hits Escape and thereby deactivates the focus trap.
- **escapeDeactivates** {boolean}: Default: `true`. If `false`, the Escape key will not trigger deactivation of the focus trap. This can be useful if you want to force the user to make a decision instead of allowing an easy way out.
- **clickOutsideDeactivates** {boolean}: Default: `false`. If `true`, a click outside the focus trap will deactivate the focus trap and allow the click event to carry on.

### focusTrap.deactivate()

Simply deactivate any currently active focus trap.

## Examples

Read code in `demo/` (it's very simple), and [see how it works](http://davidtheclark.github.io/focus-trap/demo/).

Here's what happens in `demo-one.js`:

```js
var focusTrap = require('focus-trap');

var el = document.getElementById('demo-one');

document.getElementById('activate-one').addEventListener('click', function() {
  focusTrap.activate(el, {
    onDeactivate: removeActiveClass,
  });
  el.className = 'trap is-active';
});

document.getElementById('deactivate-one').addEventListener('click', function() {
  focusTrap.deactivate();
  removeActiveClass();
});

function removeActiveClass() {
  el.className = 'trap';
}
```

## Other details

- *Only one focus trap can be active at a time.* So if Focus Trap X is active and you try to activate Focus Trap Y, *first* Focus Trap X will be deactivated, *then* Focus Trap Y will be activated.

## Development

Because of the nature of the functionality, involving keyboard and click and (especially) focus events, JavaScript unit tests didn't make sense. (If you disagree and can help out, please PR!) So the demo is also the test: run it in browsers and see how it works.
