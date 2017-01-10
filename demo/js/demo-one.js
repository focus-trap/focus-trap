var createFocusTrap = require('../../');

var containerOne = document.getElementById('demo-one');

var focusTrapOne = createFocusTrap('#demo-one', {
  onActivate: function () {
    containerOne.className = 'trap is-active';
  },
  onDeactivate: function () {
    containerOne.className = 'trap';
  },
});

document.getElementById('activate-one').addEventListener('click', function () {
  focusTrapOne.activate();
});

document.getElementById('deactivate-one').addEventListener('click', function () {
  focusTrapOne.deactivate();
});
