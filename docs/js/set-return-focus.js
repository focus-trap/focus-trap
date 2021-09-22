const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('setreturnfocus');

  const focusTrap = createFocusTrap('#setreturnfocus', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
    setReturnFocus: '#overwritten-element',
  });

  document
    .getElementById('activate-setreturnfocus')
    .addEventListener('click', focusTrap.activate);

  document
    .getElementById('deactivate-setreturnfocus')
    .addEventListener('click', focusTrap.deactivate);
};
