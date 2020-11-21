const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('no-delay');

const focusTrap = createFocusTrap(container, {
  delayInitialFocus: false,
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
  .getElementById('activate-no-delay')
  .addEventListener('keydown', showContainer);
document
  .getElementById('close-button-no-delay')
  .addEventListener('click', hideContainer);

function showContainer(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    focusTrap.activate();
  }
}

function hideContainer() {
  focusTrap.deactivate();
}
