var createFocusTrap = require('../../');

var container = document.getElementById('input-activation');

var focusTrap = createFocusTrap(container, {
  onActivate: function () {
    container.className = 'trap is-active';
  },
  onDeactivate: function () {
    container.className = 'trap';
  },
  initialFocus: '#focused-input8',
  escapeDeactivates: false,
});

document.getElementById('focused-input8').addEventListener('input', function () {
  focusTrap.activate();
});

document.getElementById('deactivate-input-activation').addEventListener('click', function () {
  focusTrap.deactivate();
});
