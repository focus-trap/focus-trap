const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('iframe');

  const focusTrap = createFocusTrap('#iframe', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  });
  document
    .getElementById('activate-iframe')
    .addEventListener('click', focusTrap.activate);

  document
    .getElementById('deactivate-iframe')
    .addEventListener('click', focusTrap.deactivate);
};
