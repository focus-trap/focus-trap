var createFocusTrap = require('../../');

var container = document.getElementById('ifc');

var focusTrap = createFocusTrap('#ifc', {
  onActivate: function() {
    container.className = 'trap is-active';
  },
  onDeactivate: function() {
    container.className = 'trap';
  },
  initialFocus: function() {
    return document.getElementById('ifc');
  },
  clickOutsideDeactivates: true
});

document.getElementById('activate-ifc').addEventListener('click', function() {
  focusTrap.activate();
});

document.getElementById('deactivate-ifc').addEventListener('click', function() {
  focusTrap.deactivate();
});
