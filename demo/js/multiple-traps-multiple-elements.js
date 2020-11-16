var { createFocusTrap } = require('../../dist/focus-trap');

var container = document.getElementById('multipleelements-multipletraps');

const focusTrapOptions = {
  onActivate: () => (container.className = 'trap is-active'),
  onDeactivate: () => (container.className = 'trap'),
  allowOutsideClick: (e) => e.target.className === 'enable-outside',
};

var focusTrap1 = createFocusTrap(
  ['#multipleelements-multipletraps-1', '#multipleelements-multipletraps-3'],
  focusTrapOptions
);

var focusTrap2 = createFocusTrap(
  ['#multipleelements-multipletraps-2', '#multipleelements-multipletraps-4'],
  focusTrapOptions
);

document
  .getElementById('activate-multipleelements-multipletraps-1')
  .addEventListener('click', function () {
    console.log('got here...');
    focusTrap1.activate();
  });

document
  .getElementById('deactivate-multipleelements-multipletraps-1')
  .addEventListener('click', function () {
    console.log('deactivated');
    focusTrap1.deactivate();
  });

document
  .getElementById('activate-multipleelements-multipletraps-2')
  .addEventListener('click', focusTrap2.activate);

document
  .getElementById('deactivate-multipleelements-multipletraps-2')
  .addEventListener('click', function () {
    console.log('deactivated');
    focusTrap2.deactivate();
  });
