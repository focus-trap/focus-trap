const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('input-activation');

  const focusTrap = createFocusTrap(container, {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  });

  document
    .getElementById('focused-input8')
    .addEventListener('input', focusTrap.activate);

  document
    .getElementById('deactivate-input-activation')
    .addEventListener('click', focusTrap.deactivate);
};
