var createFocusTrap = require('../../');

var containerTen = document.getElementById('demo-ten');

var focusTrapTen = createFocusTrap(containerTen, {
  onActivate: function () {
    containerTen.className = 'trap is-active';
  },
  onDeactivate: function () {
    containerTen.className = 'trap';
  },
  initialFocus: function () {
    return document.getElementById('initial-ten');
  },
});

document.getElementById('activate-ten').addEventListener('click', function () {
  focusTrapTen.activate();
});

document.getElementById('deactivate-ten').addEventListener('click', function () {
  focusTrapTen.deactivate();
});
