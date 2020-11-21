const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('ht');
const more = document.getElementById('ht-more');

const focusTrap = createFocusTrap(container, {
  onActivate: () => (container.className = 'trap is-active'),
  onDeactivate: () => (container.className = 'trap'),
});

document
  .getElementById('activate-ht')
  .addEventListener('click', focusTrap.activate);

document.getElementById('ht-show-more').addEventListener('click', function () {
  more.style.display = 'block';
});

document.getElementById('ht-show-less').addEventListener('click', function () {
  more.style.display = 'none';
});
