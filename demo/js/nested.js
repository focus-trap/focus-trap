var createFocusTrap = require('../../');

var container = document.getElementById('nested');
var nested = document.getElementById('nested-nested');

var primaryFocusTrap = createFocusTrap('#nested', {
  onDeactivate: function() {
    container.style.display = 'none';
  }
});

var nestedFocusTrap = createFocusTrap('#nested-nested', {
  onDeactivate: function() {
    nested.style.display = 'none';
    primaryFocusTrap.unpause();
  }
});

document
  .getElementById('activate-nested')
  .addEventListener('click', function() {
    container.style.display = 'block';
    primaryFocusTrap.activate();
  });

document
  .getElementById('deactivate-nested')
  .addEventListener('click', function() {
    primaryFocusTrap.deactivate();
  });

document
  .getElementById('nested-activate-nested')
  .addEventListener('click', function() {
    nested.style.display = 'block';
    // primaryFocusTrap.pause();
    nestedFocusTrap.activate();
  });

document
  .getElementById('nested-deactivate-nested')
  .addEventListener('click', function() {
    nestedFocusTrap.deactivate();
  });
