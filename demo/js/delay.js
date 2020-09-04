var { focusTrap: createFocusTrap } = require('../../dist/focus-trap');

var container = document.getElementById('delay');

var focusTrap = createFocusTrap(container, {
  onActivate() {
    container.style.opacity = '1';
    container.classList.add('is-active');
  },
  onDeactivate() {
    container.style.opacity = '0.2';
    container.classList.remove('is-active');
  },
});

document
  .getElementById('activate-delay')
  .addEventListener('keydown', showContainer);
document
  .getElementById('close-button-delay')
  .addEventListener('click', hideContainer);

function showContainer(e) {
  if (e.keyCode === 13) {
    focusTrap.activate();
  }
}

function hideContainer() {
  focusTrap.deactivate();
}
