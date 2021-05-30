const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('iframe');

const focusTrap = createFocusTrap('#iframe', {
  onActivate: () => (container.className = 'trap is-active'),
  onDeactivate: () => (container.className = 'trap'),
});

document
  .getElementById('activate-iframe')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-iframe')
  .addEventListener('click', focusTrap.deactivate);
