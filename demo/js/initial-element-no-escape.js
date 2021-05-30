var createFocusTrap = require('../../');

var container = document.getElementById('iene');

var focusTrap = createFocusTrap(container, {
  onActivate: function() {
    container.className = 'trap is-active';
  },
  onDeactivate: function() {
    container.className = 'trap';
  },
  initialFocus: '#focused-input',
  escapeDeactivates: false
});

document.getElementById('activate-iene').addEventListener('click', function() {
  focusTrap.activate();
});

document
  .getElementById('deactivate-iene')
  .addEventListener('click', function() {
    focusTrap.deactivate();
  });
