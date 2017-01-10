var createFocusTrap = require('../../');

var containerTwo = document.getElementById('demo-two');

var focusTrapTwo = createFocusTrap(containerTwo, {
  onActivate: function () {
    containerTwo.className = 'trap is-active';
  },
  onDeactivate: function () {
    containerTwo.className = 'trap';
  },
  initialFocus: '#focused-input',
  escapeDeactivates: false,
});

document.getElementById('activate-two').addEventListener('click', function () {
  focusTrapTwo.activate();
});

document.getElementById('deactivate-two').addEventListener('click', function () {
  focusTrapTwo.deactivate();
});
