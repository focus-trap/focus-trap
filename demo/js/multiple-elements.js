const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('multipleelements');
const selectors = ['#multipleelements-1', '#multipleelements-3'];

const focusTrap = createFocusTrap(selectors, {
  clickOutsideDeactivates: true,
  onActivate: function () {
    container.className = 'trap is-active';
    selectors.forEach(
      (selector) =>
        (document.querySelector(selector).className = 'is-active-nested')
    );
  },
  onDeactivate: function () {
    container.className = 'trap';
    selectors.forEach(
      (selector) => (document.querySelector(selector).className = null)
    );
  },
});

document
  .getElementById('activate-multipleelements')
  .addEventListener('click', function () {
    focusTrap.activate();
  });

document
  .getElementById('deactivate-multipleelements')
  .addEventListener('click', function () {
    focusTrap.deactivate();
  });
