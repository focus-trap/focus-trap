const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('ifc');

const focusTrap = createFocusTrap('#ifc', {
  onActivate: () => container.classList.add('is-active'),
  onDeactivate: () => container.classList.remove('is-active'),
  initialFocus: () => document.getElementById('ifc'),
  clickOutsideDeactivates: true,
});

document
  .getElementById('activate-ifc')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-ifc')
  .addEventListener('click', focusTrap.deactivate);
