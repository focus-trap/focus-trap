var { createFocusTrap } = require('../../dist/focus-trap');

var container = document.getElementById('multipleelements');

var focusTrap = createFocusTrap(
  ['#multipleelements-1', '#multipleelements-3'],
  {
    clickOutsideDeactivates: true,
    onActivate: function () {
      container.className = 'trap is-active';
    },
    onDeactivate: function () {
      container.className = 'trap';
    },
  }
);

document
  .getElementById('activate-multipleelements')
  .addEventListener('click', function () {
    focusTrap.activate();
  });

document
  .getElementById('deactivate-multipleelements')
  .addEventListener('click', function () {
    console.log('deactivated');
    focusTrap.deactivate();
  });
