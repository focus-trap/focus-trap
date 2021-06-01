const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('animated');

const focusTrap = createFocusTrap('#animated', {
  // There is a delay between when the class is applied
  // and when the element is focusable
  checkCanFocus: (trapContainers) => {
    const results = trapContainers.map(
      (trapContainer) =>
        new Promise((resolve) => {
          const interval = setInterval(() => {
            if (getComputedStyle(trapContainer).visibility !== 'hidden') {
              resolve();
              clearInterval(interval);
            }
          }, 5);
        })
    );
    // Return a promise that resolves when all the trap containers are able to receive focus
    return Promise.all(results).then(
      () => 'The value that you return here will be sent to onPostActivate'
    );
  },
  // Called before focus is sent
  onActivate: () => container.classList.add('is-active'),
  // Called after focus is sent
  // Only relevent if `checkCanActivate` is used
  onPostActivate: (value) => {
    // eslint-disable-next-line no-console
    console.log('Focus has been sent to the animated focus trap');
    // eslint-disable-next-line no-console
    console.log(value);
  },
  onDeactivate: () => container.classList.remove('is-active'),
});

document
  .getElementById('activate-animated')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-animated')
  .addEventListener('click', focusTrap.deactivate);
