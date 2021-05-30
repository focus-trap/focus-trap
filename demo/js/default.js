var createFocusTrap = require('../../');

var container = document.getElementById('default');

var focusTrap = createFocusTrap('#default', {
  onActivate: function() {
    container.className = 'trap is-active';
  },
  onDeactivate: function() {
    container.className = 'trap';
  }
});

document
  .getElementById('activate-default')
  .addEventListener('click', function() {
    focusTrap.activate();
  });

document
  .getElementById('deactivate-default')
  .addEventListener('click', function() {
    focusTrap.deactivate();
  });
