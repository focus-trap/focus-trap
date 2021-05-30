var createFocusTrap = require('../../');

var container = document.getElementById('iframe');

var focusTrap = createFocusTrap('#iframe', {
  onActivate: function() {
    container.className = 'trap is-active';
  },
  onDeactivate: function() {
    container.className = 'trap';
  }
});

document
  .getElementById('activate-iframe')
  .addEventListener('click', function() {
    focusTrap.activate();
  });

document
  .getElementById('deactivate-iframe')
  .addEventListener('click', function() {
    focusTrap.deactivate();
  });
