const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('iene');

const focusTrap = createFocusTrap(container, {
  onActivate: () => container.classList.add('is-active'),
  onDeactivate: () => container.classList.remove('is-active'),
  initialFocus: '#focused-input',
  escapeDeactivates: false,
});

document
  .getElementById('activate-iene')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-iene')
  .addEventListener('click', focusTrap.deactivate);
