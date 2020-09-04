var { focusTrap: createFocusTrap } = require('../../dist/focus-trap');

var container = document.getElementById('clickoutsidedeactivates');
var trigger = document.getElementById('activate-clickoutsidedeactivates');
var active = false;

const focusTrap = createFocusTrap('#clickoutsidedeactivates', {
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

function activate() {
  active = true;
  focusTrap.activate();
}

trigger.addEventListener('click', function () {
  if (!active) {
    activate();
  }
});
