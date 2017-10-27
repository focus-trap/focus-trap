var createFocusTrap = require('../../');

var containerNine = document.getElementById('demo-nine');

var focusTrapNine = createFocusTrap(containerNine, {
  onActivate: function () {
    containerNine.className = 'trap is-active';
  },
  onDeactivate: function () {
    containerNine.className = 'trap';
  },
  initialFocus: function () {
    return document.getElementById('initial-nine');
  },
});

document.getElementById('activate-nine').addEventListener('click', function () {
  focusTrapNine.activate();
});

document.getElementById('deactivate-nine').addEventListener('click', function () {
  focusTrapNine.deactivate();
});
