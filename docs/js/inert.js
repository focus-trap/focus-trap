const { createFocusTrap } = require('../../index');

module.exports = () => {
  const container = document.getElementById('inert');

  const focusTrap = createFocusTrap('#inert', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  });

  document
    .getElementById('activate-inert')
    .addEventListener('click', focusTrap.activate);
  document
    .getElementById('deactivate-inert')
    .addEventListener('click', focusTrap.deactivate);
};
