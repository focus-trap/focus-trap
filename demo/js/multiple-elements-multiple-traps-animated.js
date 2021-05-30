const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById(
  'multipleelements-multipletraps-animated'
);
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
  selectors.forEach((selector) =>
    document
      .querySelector(selector)
      .classList.toggle('is-active-nested', isActive)
  );
};

const trap1Selectors = [
  '#multipleelements-multipletraps-animated-1',
  '#multipleelements-multipletraps-animated-3',
];

const trap2Selectors = [
  '#multipleelements-multipletraps-animated-2',
  '#multipleelements-multipletraps-animated-4',
];

const focusTrap1 = createFocusTrap(trap1Selectors, {
  checkCanActivate: (trapElement) =>
    getComputedStyle(trapElement).visibility !== 'hidden',
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
  checkCanActivate: (trapElement) =>
    getComputedStyle(trapElement).visibility !== 'hidden',
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
  .getElementById('activate-multipleelements-multipletraps-animated-1')
  .addEventListener('click', function () {
    focusTrap1.activate();
  });

document
  .getElementById('deactivate-multipleelements-multipletraps-animated-1')
  .addEventListener('click', function () {
    focusTrap1.deactivate();
  });

document
  .getElementById('activate-multipleelements-multipletraps-animated-2')
  .addEventListener('click', function () {
    focusTrap2.activate();
  });

document
  .getElementById('deactivate-multipleelements-multipletraps-animated-2')
  .addEventListener('click', function () {
    focusTrap2.deactivate();
  });
