const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('radio');

const focusTrap = createFocusTrap('#radio', {
  onActivate: () => (container.className = 'trap is-active'),
  onDeactivate: () => (container.className = 'trap'),
});

document
  .getElementById('activate-radio')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-radio')
  .addEventListener('click', focusTrap.deactivate);
