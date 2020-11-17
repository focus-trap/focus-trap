const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('setreturnfocus');

const focusTrap = createFocusTrap('#setreturnfocus', {
  onActivate: () => (container.className = 'trap is-active'),
  onDeactivate: () => (container.className = 'trap'),
  setReturnFocus: '#overwritten-element',
});

document
  .getElementById('activate-setreturnfocus')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-setreturnfocus')
  .addEventListener('click', focusTrap.deactivate);
