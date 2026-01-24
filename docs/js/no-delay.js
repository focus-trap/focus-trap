const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('no-delay');

  const focusTrap = createFocusTrap(container, {
    delayInitialFocus: false,
    onActivate() {
      container.style.opacity = '1';
      container.classList.add('is-active');
    },
    onPostActivate() {
      // NOTE: this is used when running e2e tests to check that onPostActivate() is indeed being
      //  called AFTER the initial focus node has been focused, whether the initial focus is
      //  delayed or not (`delay.js` demo has the same check)
      const hideEl = document.getElementById('close-button-no-delay');
      container.dataset.hideIsFocusedOnPostActivate =
        document.activeElement === hideEl;
    },
    onDeactivate() {
      container.style.opacity = '0.2';
      container.classList.remove('is-active');
    },
  });

  const showContainer = function (e) {
    if (e.keyCode === 13) {
      // NOTE: Preventing default is necessary in this case because we've configured
      //  the trap to NOT delay initial focus, so the activate button actually
      //  receives the event, which results in the trap activating, but then immediately
      //  deactivating because the HIDE button actually ends-up receiving the CLICK
      //  event that automatically follows the Enter key down event, which then triggers
      //  the trap to be deactivated.
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
