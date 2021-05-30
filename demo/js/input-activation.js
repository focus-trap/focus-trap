const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('input-activation');

const focusTrap = createFocusTrap(container, {
  onActivate: () => (container.className = 'trap is-active'),
  onDeactivate: () => (container.className = 'trap'),
});

document
  .getElementById('focused-input8')
  .addEventListener('input', focusTrap.activate);

document
  .getElementById('deactivate-input-activation')
  .addEventListener('click', focusTrap.deactivate);
