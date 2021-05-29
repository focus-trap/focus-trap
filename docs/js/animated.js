var createFocusTrap = require('../..');

var container = document.getElementById('animated');

var focusTrap = createFocusTrap('#animated', {
  // There is a delay between when the class is applied
  // and when the element is focusable
  checkCanActivate: function(trapElement) {
    return getComputedStyle(trapElement).visibility !== 'hidden';
  },
  onActivate: function() {
    container.classList.add('is-active');
  },
  onDeactivate: function() {
    container.classList.remove('is-active');
  }
});

document
  .getElementById('activate-animated')
  .addEventListener('click', function() {
    focusTrap.activate();
  });

document
  .getElementById('deactivate-animated')
  .addEventListener('click', function() {
    focusTrap.deactivate();
  });
