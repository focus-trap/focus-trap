const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('escape-key-cancelation');
  const escapeCancelingInput = document.getElementById('escape-handling-input');

  escapeCancelingInput.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
    }
  });

  const focusTrap = createFocusTrap('#escape-key-cancelation', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
    escapeDeactivates: (event) => {
      return !event.defaultPrevented;
    },
  });

  document
    .getElementById('activate-escape-key-cancelation')
    .addEventListener('click', focusTrap.activate);
  document
    .getElementById('deactivate-escape-key-cancelation')
    .addEventListener('click', focusTrap.deactivate);
};
