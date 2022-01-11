const { createFocusTrap } = require('../../index');

module.exports = () => {
  const container = document.getElementById('negative-tabindex');

  const focusTrap = createFocusTrap('#negative-tabindex', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  });

  document
    .getElementById('activate-negative-tabindex')
    .addEventListener('click', focusTrap.activate);
  document
    .getElementById('deactivate-negative-tabindex')
    .addEventListener('click', focusTrap.deactivate);
};
