const { createFocusTrap } = require('../../index');

module.exports = () => {
  const container = document.getElementById('psif');
  const activateTrigger = document.getElementById('activate-psif');
  const deactivateTrigger = document.getElementById('deactivate-psif');

  const focusTrap = createFocusTrap(container, {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
    initialFocus: false,
    preventScroll: true,
  });

  activateTrigger.addEventListener('click', () => focusTrap.activate());
  deactivateTrigger.addEventListener('click', () => focusTrap.deactivate());
};
