var { createFocusTrap } = require('../../dist/focus-trap');

var container = document.getElementById('multipleelements');
var selectors = ['#multipleelements-1', '#multipleelements-3'];

var focusTrap = createFocusTrap(selectors, {
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
    console.log('deactivated');
    focusTrap.deactivate();
  });
