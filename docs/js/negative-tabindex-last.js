const { createFocusTrap } = require('../../index');

module.exports = () => {
  const container = document.getElementById('negative-tabindex-last');

  const focusTrap = createFocusTrap('#negative-tabindex-last', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  });

  document
    .getElementById('activate-negative-tabindex-last')
    .addEventListener('click', focusTrap.activate);
  document
    .getElementById('deactivate-negative-tabindex-last')
    .addEventListener('click', focusTrap.deactivate);
};
