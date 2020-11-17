const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('iene');

const focusTrap = createFocusTrap(container, {
  onActivate: () => (container.className = 'trap is-active'),
  onDeactivate: () => (container.className = 'trap'),
  initialFocus: '#focused-input',
  escapeDeactivates: false,
});

document
  .getElementById('activate-iene')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-iene')
  .addEventListener('click', focusTrap.deactivate);
