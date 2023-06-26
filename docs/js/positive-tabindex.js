const { createFocusTrap } = require('../../index');

module.exports = () => {
  const container = document.getElementById('positive-tabindex');

  const focusTrap = createFocusTrap(container, {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  });

  document
    .getElementById('activate-positive-tabindex')
    .addEventListener('click', focusTrap.activate);
  document
    .getElementById('deactivate-positive-tabindex')
    .addEventListener('click', focusTrap.deactivate);
};
