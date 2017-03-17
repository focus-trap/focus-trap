var createFocusTrap = require('../../');

var containerEight = document.getElementById('demo-eight');

var focusTrapEight = createFocusTrap(containerEight, {
  onActivate: function () {
    containerEight.className = 'trap is-active';
  },
  onDeactivate: function () {
    containerEight.className = 'trap';
  },
  initialFocus: '#focused-input8',
  escapeDeactivates: false,
});

document.getElementById('focused-input8').addEventListener('input', function () {
  focusTrapEight.activate();
});

document.getElementById('deactivate-eight').addEventListener('click', function () {
  focusTrapEight.deactivate();
});
