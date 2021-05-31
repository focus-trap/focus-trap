const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('animated');

const focusTrap = createFocusTrap('#animated', {
  // There is a delay between when the class is applied
  // and when the element is focusable
  checkCanActivate: (trapElement) =>
    getComputedStyle(trapElement).visibility !== 'hidden',
  // Called before focus is sent
  onActivate: () => container.classList.add('is-active'),
  // Called after focus is sent
  // Only relevent if `checkCanActivate` is used
  onSuccessfulActivation: () =>
    // eslint-disable-next-line no-console
    console.log('Focus has been sent to the animated focus trap'),
  onDeactivate: () => container.classList.remove('is-active'),
});

document
  .getElementById('activate-animated')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-animated')
  .addEventListener('click', focusTrap.deactivate);
