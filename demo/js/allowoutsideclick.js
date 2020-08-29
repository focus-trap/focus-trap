var createFocusTrap = require('../../');

var container = document.getElementById('allowoutsideclick');
var trigger = document.getElementById('activate-allowoutsideclick');
var active = false;
var allowOutsideClick = true;

function initialize() {
  return createFocusTrap('#allowoutsideclick', {
    allowOutsideClick: allowOutsideClick,
    escapeDeactivates: false,
    onActivate: function () {
      container.className = 'trap is-active';
    },
    onDeactivate: function () {
      container.className = 'trap';
    },
  });
}

var focusTrap = initialize();

function activate() {
  focusTrap.activate();
  active = true;
  trigger.innerText = 'deactivate trap';
}

function deactivate() {
  focusTrap.deactivate();
  active = false;
  trigger.innerText = 'activate trap';
}

trigger.addEventListener('click', function () {
  if (active) {
    deactivate();
  } else {
    activate();
  }
});

document
  .getElementById('deactivate-allowoutsideclick')
  .addEventListener('click', function () {
    deactivate();
  });

document
  .getElementById('select-allowoutsideclick')
  .addEventListener('change', function (event) {
    allowOutsideClick = {
      boolean: true,
      function: function (e) {
        if (e.target === trigger) {
          return true;
        }
      },
    }[event.target.value];

    focusTrap = initialize();
  });
