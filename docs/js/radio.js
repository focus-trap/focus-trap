const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('radio');

  const focusTrap = createFocusTrap('#radio', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  });

  document
    .getElementById('activate-radio')
    .addEventListener('click', focusTrap.activate);

  document
    .getElementById('deactivate-radio')
    .addEventListener('click', focusTrap.deactivate);
};
