var createFocusTrap = require('../../');

var container = document.getElementById('delay');

var focusTrap = createFocusTrap(container);

document
  .getElementById('activate-delay')
  .addEventListener('keydown', showContainer);
document
  .getElementById('close-button-delay')
  .addEventListener('click', hideContainer);

function showContainer(e) {
  if (e.keyCode !== 13) return;

  container.style.opacity = '1';
  focusTrap.activate();
}

function hideContainer() {
  container.style.opacity = '0.2';
  focusTrap.deactivate();
}
