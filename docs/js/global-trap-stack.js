const { createFocusTrap } = require('../../index');

module.exports = () => {
  const container = document.getElementById('global-trap-stack');
  const counter = container.querySelector('.counter');
  const trapStack = []

  const focusTrap = createFocusTrap('#global-trap-stack', {
    trapStack,
    onPostActivate: () => {
      container.classList.add('is-active')
      counter.innerHTML = trapStack.length
    },
    onPostDeactivate: () => {
      container.classList.remove('is-active')
      counter.innerHTML = trapStack.length
    },
  });

  document
    .getElementById('activate-global-trap-stack')
    .addEventListener('click', focusTrap.activate);
  document
    .getElementById('deactivate-global-trap-stack')
    .addEventListener('click', focusTrap.deactivate);
};
