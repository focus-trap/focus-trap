const { createFocusTrap } = require('../../index');

module.exports = () => {
  const container = document.getElementById('dom-remove');

  document
    .getElementById('dom-remove-button')
    .addEventListener('click', function (event) {
      event.target.remove();
    });

  const focusTrap = createFocusTrap('#dom-remove', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  });

  document
    .getElementById('activate-dom-remove')
    .addEventListener('click', focusTrap.activate);
  document
    .getElementById('deactivate-dom-remove')
    .addEventListener('click', focusTrap.deactivate);
};
