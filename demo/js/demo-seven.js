var createFocusTrap = require('../../');

var containerSeven = document.getElementById('demo-seven');
var focusableSeven = document.getElementById('demo-seven-hide-focusable');

var focusTrapSeven = createFocusTrap(containerSeven, {
  fallbackFocus: containerSeven,
  onActivate: function () {
    containerSeven.className = 'trap is-active';
  },
  onDeactivate: function () {
    containerSeven.className = 'trap';
  },
});

document.getElementById('activate-seven').addEventListener('click', function () {
  focusTrapSeven.activate();
});

document.getElementById('deactivate-seven').addEventListener('click', function () {
  focusTrapSeven.deactivate();
});

document.getElementById('demo-seven-show-focusable').addEventListener('click', function () {
  focusableSeven.style.display = 'block';
});

document.getElementById('demo-seven-hide-focusable').addEventListener('click', function () {
  focusableSeven.style.display = 'none';
});
