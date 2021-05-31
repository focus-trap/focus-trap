const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('animated');

const focusTrap = createFocusTrap('#animated', {
  // There is a delay between when the class is applied
  // and when the element is focusable
  checkCanActivate: (trapContainers) =>
    trapContainers.map(
      (trapContainer) =>
        // Return `true` if the trap is able to activate
        // Return a number to determine how long to wait in milliseconds before attempting to activate again
        getComputedStyle(trapContainer).visibility !== 'hidden' || 5
    ),
  // How many seconds the trap will continue attempting to activate before it gives up
  activationCheckTimeout: 10,
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
