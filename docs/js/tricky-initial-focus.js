const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('tif');
  const focusable = document.getElementById('tif-hide-focusable');

  const focusTrap = createFocusTrap(container, {
    fallbackFocus: container,
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  });

  document
    .getElementById('activate-tif')
    .addEventListener('click', focusTrap.activate);

  document
    .getElementById('deactivate-tif')
    .addEventListener('click', focusTrap.deactivate);

  document
    .getElementById('tif-show-focusable')
    .addEventListener('click', () => (focusable.style.display = 'block'));

  document
    .getElementById('tif-hide-focusable')
    .addEventListener('click', () => (focusable.style.display = 'none'));
};
