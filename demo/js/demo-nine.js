var createFocusTrap = require('../../');

var containerNine = document.getElementById('demo-nine');

var focusTrapNine = createFocusTrap(containerNine, {
  onActivate: function () {
    containerNine.className = 'trap is-active';
  },
  onDeactivate: function () {
    containerNine.className = 'trap';
  },
  trapCallback: function() {
    alert('event prevented! You should deactivate trap if you want to do something outside trap zone.');
  },
  initialFocus: '#focused-input9',
  escapeDeactivates: false,
});

document.getElementById('focused-input9').addEventListener('input', function () {
  focusTrapNine.activate();
});

document.getElementById('deactivate-nine').addEventListener('click', function () {
  focusTrapNine.deactivate();
});
