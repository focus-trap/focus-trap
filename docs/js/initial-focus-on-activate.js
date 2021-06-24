const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('initialfocusonactivate');
const activateTrigger = document.getElementById(
  'activate-initialfocusonactivate'
);
const deactivateTrigger = document.getElementById(
  'deactivate-initialfocusonactivate'
);
const select = document.getElementById('select-initialfocusonactivate');

let active = false;
let initialFocusOnActivate = true;

const initialize = function () {
  return createFocusTrap('#initialfocusonactivate', {
    initialFocusOnActivate,
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => {
      active = false;
      container.classList.remove('is-active');
    },
  });
};

let focusTrap = initialize();

const activate = function () {
  active = true;
  focusTrap.activate();
};

activateTrigger.addEventListener('click', function () {
  if (!active) {
    activate();
  }
});

deactivateTrigger.addEventListener('click', function () {
  if (active) {
    focusTrap.deactivate();
  }
});

select.addEventListener('change', function (event) {
  initialFocusOnActivate = event.target.value === 'true';

  focusTrap = initialize();
});
