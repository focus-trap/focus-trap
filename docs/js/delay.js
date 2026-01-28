const { createFocusTrap } = require('../../index');

const container = document.getElementById('delay');
module.exports = () => {
  const focusTrap = createFocusTrap(container, {
    onActivate() {
      container.style.opacity = '1';
      container.classList.add('is-active');
    },
    onPostActivate() {
      // NOTE: this is used when running e2e tests to check that onPostActivate() is indeed being
      //  called AFTER the initial focus node has been focused, whether the initial focus is
      //  delayed or not (`no-delay.js` demo has the same check)
      const hideEl = document.getElementById('close-button-delay');
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
      // NOTE: By delaying the initial focus (default trap behavior), the CLICK event auto-generated
      //  after the Enter key down event ends-up being captured by the Activate button which still
      //  has focus due to the delay. Post-delay (i.e. next execution frame), the Hide button
      //  gets focused and all is well. So calling `preventDefault()` on the event is not necessary
      //  to activate the trap (see counter-comment in the `no-delay.js` demo.
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
