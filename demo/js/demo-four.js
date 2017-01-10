var createFocusTrap = require('../../');

var containerFour = document.getElementById('demo-four');

var focusTrapfour = createFocusTrap('#demo-four', {
  onActivate: function () {
    containerFour.className = 'trap is-active';
  },
  onDeactivate: function () {
    containerFour.className = 'trap';
  },
  initialFocus: '#demo-four',
});

document.getElementById('activate-four').addEventListener('click', function () {
  focusTrapfour.activate();
});

document.getElementById('deactivate-four').addEventListener('click', function () {
  focusTrapfour.deactivate();
});
