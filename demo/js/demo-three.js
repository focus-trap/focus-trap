var createFocusTrap = require('../../');

var containerThree = document.getElementById('demo-three');

var focusTrapThree = createFocusTrap(containerThree, {
  onActivate: function () {
    containerThree.className = 'trap is-active';
  },
  onDeactivate: function () {
    containerThree.className = 'trap';
  },
  clickOutsideDeactivates: true,
});

document.getElementById('activate-three').addEventListener('click', function () {
  focusTrapThree.activate();
});

document.getElementById('deactivate-three').addEventListener('click', function () {
  focusTrapThree.deactivate();
});
