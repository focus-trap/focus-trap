const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('ht');
  const more = document.getElementById('ht-more');

  const focusTrap = createFocusTrap(container, {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  });

  document
    .getElementById('activate-ht')
    .addEventListener('click', focusTrap.activate);

  document
    .getElementById('ht-show-more')
    .addEventListener('click', function () {
      more.style.display = 'block';
    });

  document
    .getElementById('ht-show-less')
    .addEventListener('click', function () {
      more.style.display = 'none';
    });
};
