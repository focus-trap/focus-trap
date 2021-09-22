const { createFocusTrap } = require('../../index');

const container = document.getElementById('delay');
module.exports = () => {
  const focusTrap = createFocusTrap(container, {
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
      focusTrap.activate();
    }
  };

  const hideContainer = function () {
    focusTrap.deactivate();
  };

  document
    .getElementById('activate-delay')
    .addEventListener('keydown', showContainer);
  document
    .getElementById('close-button-delay')
    .addEventListener('click', hideContainer);
};
