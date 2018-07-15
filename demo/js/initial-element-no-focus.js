var createFocusTrap = require('../../');

var container = document.getElementById('ienf');

var focusTrap = createFocusTrap(container, {
  onActivate: function () {
    container.className = 'trap is-active';
  },
  onDeactivate: function () {
    container.className = 'trap';
  },
  initialFocus: '#focused-input',
  escapeDeactivates: false,
});

document.getElementById('activate-ienf').addEventListener('click', function () {
  focusTrap.activate();
});

document.getElementById('deactivate-ienf').addEventListener('click', function () {
  focusTrap.deactivate();
});
