const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('sibling-first');
const second = document.getElementById('sibling-second');

const firstFocusTrap = createFocusTrap('#sibling-first', {
  onDeactivate: () => (container.className = 'trap'),
});

const secondFocusTrap = createFocusTrap('#sibling-second', {
  onDeactivate: function () {
    second.style.display = 'none';
    second.className = 'trap';
  },
});

document
  .getElementById('activate-first-sibling')
  .addEventListener('click', function () {
    container.className = 'trap is-active';
    firstFocusTrap.activate();
  });

document
  .getElementById('deactivate-first-sibling')
  .addEventListener('click', firstFocusTrap.deactivate);

document
  .getElementById('activate-second-sibling')
  .addEventListener('click', function () {
    second.style.display = 'block';
    second.className = 'trap is-active-nested';
    secondFocusTrap.activate();
  });

document
  .getElementById('deactivate-second-sibling')
  .addEventListener('click', secondFocusTrap.deactivate);
