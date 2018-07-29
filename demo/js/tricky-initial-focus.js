var createFocusTrap = require('../../');

var container = document.getElementById('tif');
var focusable = document.getElementById('tif-hide-focusable');

var focusTrap = createFocusTrap(container, {
  fallbackFocus: container,
  onActivate: function() {
    container.className = 'trap is-active';
  },
  onDeactivate: function() {
    container.className = 'trap';
  }
});

document.getElementById('activate-tif').addEventListener('click', function() {
  focusTrap.activate();
});

document.getElementById('deactivate-tif').addEventListener('click', function() {
  focusTrap.deactivate();
});

document
  .getElementById('tif-show-focusable')
  .addEventListener('click', function() {
    focusable.style.display = 'block';
  });

document
  .getElementById('tif-hide-focusable')
  .addEventListener('click', function() {
    focusable.style.display = 'none';
  });
