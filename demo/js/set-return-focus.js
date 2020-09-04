var { createFocusTrap } = require('../../dist/focus-trap');

var container = document.getElementById('setreturnfocus');

var focusTrap = createFocusTrap('#setreturnfocus', {
  onActivate: function () {
    container.className = 'trap is-active';
  },
  onDeactivate: function () {
    container.className = 'trap';
  },
  setReturnFocus: '#overwritten-element',
});

document
  .getElementById('activate-setreturnfocus')
  .addEventListener('click', function () {
    focusTrap.activate();
  });

document
  .getElementById('deactivate-setreturnfocus')
  .addEventListener('click', function () {
    focusTrap.deactivate();
  });
