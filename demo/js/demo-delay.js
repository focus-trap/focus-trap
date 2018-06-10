var createFocusTrap = require('../../');

var containerNine = document.getElementById('demo-delay');

var focusTrapNine = createFocusTrap(containerNine);

document.getElementById('activate-delay').addEventListener('keydown', showContainer);
document.getElementById('close-button-delay').addEventListener('click', hideContainer);

function showContainer(e) {
  if (e.keyCode !== 13) return;

  containerNine.style.opacity = '1';
  focusTrapNine.activate();
}

function hideContainer() {
  containerNine.style.opacity = '0.2';
  focusTrapNine.deactivate();
}
