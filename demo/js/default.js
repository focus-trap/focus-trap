const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('default');

const focusTrap = createFocusTrap('#default', {
  onActivate: () => (container.className = 'trap is-active'),
  onDeactivate: () => (container.className = 'trap'),
});

document
  .getElementById('activate-default')
  .addEventListener('click', focusTrap.activate);
document
  .getElementById('deactivate-default')
  .addEventListener('click', focusTrap.deactivate);
