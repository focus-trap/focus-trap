const { createFocusTrap } = require('../../index');

module.exports = () => {
  const container = document.getElementById('arrow-keys');

  const focusTrap = createFocusTrap('#arrow-keys', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
    isKeyForward: (event) => event.key === 'k',
    isKeyBackward: (event) => event.key === 'j',
  });

  document
    .getElementById('activate-arrow-keys')
    .addEventListener('click', focusTrap.activate);
  document
    .getElementById('deactivate-arrow-keys')
    .addEventListener('click', focusTrap.deactivate);
};
