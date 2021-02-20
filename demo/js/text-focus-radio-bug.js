const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('textfocusradiobug');
const trigger = document.getElementById('activate-textfocusradiobug');
const deactivateTrigger = document.getElementById(
  'deactivate-textfocusradiobug'
);

const focusTrap = createFocusTrap(container, {
  escapeDeactivates: false,
  onActivate: function () {
    container.className = 'trap is-active';
  },
  onDeactivate: function () {
    container.className = 'trap';
  },
});

trigger.addEventListener('click', focusTrap.activate.bind(focusTrap));
deactivateTrigger.addEventListener(
  'click',
  focusTrap.deactivate.bind(focusTrap)
);
