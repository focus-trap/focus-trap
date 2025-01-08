const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('multipletraps-manual-pause');
  let isTrap1Active = false;
  let isTrap2Active = false;

  const onActivateTrap = function () {
    container.classList.add('is-active');
  };

  const onDeactivateTrap = function () {
    if (!isTrap1Active && !isTrap2Active) {
      container.classList.remove('is-active');
    }
  };

  const allowOutsideClick = (e) => e.target.className === 'enable-outside';

  const setActive = function (selectors, isActive = true) {
    selectors.forEach(
      (selector) =>
        (document.querySelector(selector).className = isActive
          ? 'is-active-nested'
          : null)
    );
  };

  const trap1Selectors = ['#multipletraps-manual-pause-1'];

  const trap2Selectors = ['#multipletraps-manual-pause-2'];

  const focusTrap1 = createFocusTrap(trap1Selectors, {
    onActivate() {
      onActivateTrap();

      if (isTrap2Active) {
        setActive(trap2Selectors, false);
      }

      setActive(trap1Selectors);
      isTrap1Active = true;
    },
    onDeactivate() {
      setActive(trap1Selectors, false);

      if (isTrap2Active) {
        setActive(trap2Selectors);
      }

      isTrap1Active = false;
      onDeactivateTrap();
    },
    allowOutsideClick,
  });

  const focusTrap2 = createFocusTrap(trap2Selectors, {
    onActivate() {
      onActivateTrap();

      if (isTrap1Active) {
        setActive(trap1Selectors, false);
      }

      setActive(trap2Selectors);
      isTrap2Active = true;
    },
    onDeactivate() {
      setActive(trap2Selectors, false);

      if (isTrap1Active) {
        setActive(trap1Selectors);
      }

      isTrap2Active = false;
      onDeactivateTrap();
    },
    allowOutsideClick,
  });

  document
    .getElementById('activate-multipletraps-manual-pause-1')
    .addEventListener('click', function () {
      focusTrap1.activate();
    });

  document
    .getElementById('deactivate-multipletraps-manual-pause-1')
    .addEventListener('click', function () {
      focusTrap1.deactivate();
    });

  document
    .getElementById('pause-multipletraps-manual-pause-1')
    .addEventListener('click', function () {
      focusTrap1.pause();
    });

  document
    .getElementById('unpause-multipletraps-manual-pause-1')
    .addEventListener('click', function () {
      focusTrap1.unpause();
    });

  document
    .getElementById('activate-multipletraps-manual-pause-2')
    .addEventListener('click', function () {
      focusTrap2.activate();
    });

  document
    .getElementById('deactivate-multipletraps-manual-pause-2')
    .addEventListener('click', function () {
      focusTrap2.deactivate();
    });

  document
    .getElementById('pause-multipletraps-manual-pause-2')
    .addEventListener('click', function () {
      focusTrap2.pause();
    });

  document
    .getElementById('unpause-multipletraps-manual-pause-2')
    .addEventListener('click', function () {
      focusTrap2.unpause();
    });
};
