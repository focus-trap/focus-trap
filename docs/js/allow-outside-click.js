const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('allowoutsideclick');
  const trigger = document.getElementById('activate-allowoutsideclick');
  let active = false;
  let allowOutsideClick = true;

  function initialize() {
    return createFocusTrap('#allowoutsideclick', {
      allowOutsideClick: allowOutsideClick,
      escapeDeactivates: false,
      onActivate: () => container.classList.add('is-active'),
      onDeactivate: () => container.classList.remove('is-active'),
    });
  }

  let focusTrap = initialize();

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
    .addEventListener('click', deactivate);

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
};
