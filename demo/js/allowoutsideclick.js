var createFocusTrap = require('../../');

var container = document.getElementById('allowoutsideclick');
var trigger = document.getElementById('activate-allowoutsideclick');
var active = false;

var focusTrap = createFocusTrap('#allowoutsideclick', {
  allowOutsideClick: function(event) {
    if (event.target === trigger) {
      return true;
    }
  },
  onActivate: function() {
    container.className = 'trap is-active';
  },
  onDeactivate: function() {
    container.className = 'trap';
  }
});

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

trigger.addEventListener('click', function() {
  if (active) {
    deactivate();
  } else {
    activate();
  }
});

document
  .getElementById('deactivate-allowoutsideclick')
  .addEventListener('click', function() {
    deactivate();
  });
