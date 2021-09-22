const { createFocusTrap } = require('../../index');
module.exports = () => {
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

  const showContainer = function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      focusTrap.activate();
    }
  };

  const hideContainer = function () {
    focusTrap.deactivate();
  };

  document
    .getElementById('activate-no-delay')
    .addEventListener('keydown', showContainer);
  document
    .getElementById('close-button-no-delay')
    .addEventListener('click', hideContainer);
};
