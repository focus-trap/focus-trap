var createFocusTrap = require('../../');

var container = document.getElementById('sibling-first');
var second = document.getElementById('sibling-second');

var firstFocusTrap = createFocusTrap('#sibling-first');

var secondFocusTrap = createFocusTrap('#sibling-second');

document
  .getElementById('activate-first-sibling')
  .addEventListener('click', function() {
    container.className = 'trap is-active';
    firstFocusTrap.activate();
  });

document
  .getElementById('deactivate-first-sibling')
  .addEventListener('click', function() {
    container.className = 'trap';
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
    second.style.display = 'none';
    second.className = 'trap';
    secondFocusTrap.deactivate();
  });
