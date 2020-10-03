const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('clickoutsidedeactivates');
const trigger = document.getElementById('activate-clickoutsidedeactivates');
let active = false;
let returnFocusOnDeactivate = true;

const initialize = function () {
  return createFocusTrap('#clickoutsidedeactivates', {
    returnFocusOnDeactivate,
    clickOutsideDeactivates: true,
    escapeDeactivates: false,
    onActivate: function () {
      container.className = 'trap is-active';
    },
    onDeactivate: function () {
      active = false;
      container.className = 'trap';
    },
  });
};

const activate = function () {
  active = true;
  focusTrap.activate();
};

let focusTrap = initialize();

trigger.addEventListener('click', function () {
  if (!active) {
    activate();
  }
});

document
  .getElementById('select-returnfocusondeactivate-clickoutsidedeactivates')
  .addEventListener('change', function (event) {
    returnFocusOnDeactivate = event.target.value === 'true';
    focusTrap = initialize();
  });
