var createFocusTrap = require('../..');

var container = document.getElementById('animated');

var focusTrap = createFocusTrap('#animated', {
  // There is a delay between when the class is applied
  // and when the element is focusable
  checkCanActivate: function(trapElement) {
    return getComputedStyle(trapElement).visibility !== 'hidden';
  },
  // Called before focus is sent
  onActivate: function() {
    container.classList.add('is-active');
  },
  // Called after focus is sent
  // Only relevent if `checkCanActivate` is used
  onSuccessfulActivation: function() {
    console.log('Focus has been sent to the animated focus trap');
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
