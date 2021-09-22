const { createFocusTrap } = require('../../index');

module.exports = () => {
  const container = document.getElementById('default');

  const focusTrap = createFocusTrap('#default', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  });

  document
    .getElementById('activate-default')
    .addEventListener('click', focusTrap.activate);
  document
    .getElementById('deactivate-default')
    .addEventListener('click', focusTrap.deactivate);
};
