const { createFocusTrap } = require('../../index');

module.exports = () => {
  const container = document.getElementById('global-trap-stack');
  const counter = container.querySelector('.counter');
  window.__trapStack = [];

  const updateCounter = () => {
    counter.innerHTML = window.__trapStack.length;
  };

  const focusTrap = createFocusTrap('#global-trap-stack', {
    trapStack: window.__trapStack,
    onPostActivate: () => {
      container.classList.add('is-active');
      updateCounter();
    },
    onPostDeactivate: () => {
      container.classList.remove('is-active');
      updateCounter();
    },
  });

  updateCounter();

  document
    .getElementById('activate-global-trap-stack')
    .addEventListener('click', focusTrap.activate);
  document
    .getElementById('deactivate-global-trap-stack')
    .addEventListener('click', focusTrap.deactivate);
};
