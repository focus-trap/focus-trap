var createFocusTrap = require('../../');

var container = document.getElementById('sibling-first');
var second = document.getElementById('sibling-second');

var firstFocusTrap = createFocusTrap('#sibling-first', {
  onDeactivate: function() {
    container.className = 'trap';
  }
});

var secondFocusTrap = createFocusTrap('#sibling-second', {
  onDeactivate: function() {
    second.style.display = 'none';
    second.className = 'trap';
  }
});

document
  .getElementById('activate-first-sibling')
  .addEventListener('click', function() {
    container.className = 'trap is-active';
    firstFocusTrap.activate();
  });

document
  .getElementById('deactivate-first-sibling')
  .addEventListener('click', function() {
    firstFocusTrap.deactivate();
  });

document
  .getElementById('activate-second-sibling')
  .addEventListener('click', function() {
    second.style.display = 'block';
    second.className = 'trap is-active';
    secondFocusTrap.activate();
  });

document
  .getElementById('deactivate-second-sibling')
  .addEventListener('click', function() {
    secondFocusTrap.deactivate();
  });
