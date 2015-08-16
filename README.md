# focus-trap

Trap focus within a DOM node.

There may come a time when you find it important to trap focus within a DOM node — so that when a user hits Tab or Shift+Tab or clicks around, she can't escape a certain cycle of focusable elements.

*You will face this challenge when you are try to build an **accessible** modal or dropdown menu.*

This module is a little **vanilla JS** solution to the problem.

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
Because this module [`EventTarget.addEventListener()`](document.createElement('button')).
And its only dependency, tabbable, uses [a couple of IE9+ functions](https://github.com/davidtheclark/tabbable#browser-support).

## Usage

The module exposes two functions.

### focusTrap.activate(element[, options])

Turn `element` into a focus trap.

`element` can be a DOM node (the focus trap itself) or a string (which will be interpreted as the `id` of the intended focus trap).

Options:

- **initialFocus**: By default, when a focus trap is activated the first element in the focus trap's tab order will receive focus. With this option you can specify a different element to receive that initial focus. Can be a DOM node or a string (which will be interpreted as the `id` of the intended element).
- **onDeactivate**: A function that will be called when the focus trap deactivates. This can be useful if, for example, you want to remove a modal from the screen when the user hits Escape and thereby deactivates the focus trap.

### focusTrap.deactivate()

Simply deactivate any currently active focus trap.

## Examples

Read code in `demo/` (it's very simple), and [see how it works](http://davidtheclark.github.io/focus-trap/demo/).

## Other details

- *Only one focus trap can be active at a time.* So if Focus Trap X is active and you try to activate Focus Trap Y, *first* Focus Trap X will be deactivated, *then* Focus Trap Y will be activated.

## Development

Because of the nature of the functionality, involving keyboard and click and (especially) focus events, JavaScript unit tests didn't make sense. (If you disagree and can help out, please PR!) So the demo is also the test: run it in browsers and see how it works.
