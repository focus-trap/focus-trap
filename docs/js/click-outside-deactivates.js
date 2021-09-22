const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('clickoutsidedeactivates');
  const trigger = document.getElementById('activate-clickoutsidedeactivates');
  const select = document.getElementById('select-clickoutsidedeactivates');
  const checkbox = document.getElementById('checkbox-clickoutsidedeactivates');

  let active = false;
  let clickOutsideDeactivates = true;
  let returnFocusOnDeactivate = true;

  const notice = document.createElement('span');
  notice.appendChild(
    document.createTextNode('-> Must click on checkbox to deactivate')
  );

  const initialize = function () {
    return createFocusTrap('#clickoutsidedeactivates', {
      returnFocusOnDeactivate,
      clickOutsideDeactivates,
      escapeDeactivates: false,
      onActivate: () => container.classList.add('is-active'),
      onDeactivate: () => {
        active = false;
        container.classList.remove('is-active');
      },
    });
  };

  let focusTrap = initialize();

  const activate = function () {
    active = true;
    focusTrap.activate();
  };

  trigger.addEventListener('click', function () {
    if (!active) {
      activate();
    }
  });

  document
    .getElementById('select-returnfocusondeactivate-clickoutsidedeactivates')
    .addEventListener('change', function (event) {
      returnFocusOnDeactivate = event.target.value === 'true';
      focusTrap = initialize();
    });

  select.addEventListener('change', function (event) {
    clickOutsideDeactivates = {
      boolean: true, // deactivate when click on anything
      function: function (e) {
        // only deactivate when click on checkbox
        return e.target === checkbox;
      },
    }[event.target.value];

    if (event.target.value === 'function') {
      select.parentNode.append(notice);
    } else {
      select.parentNode.removeChild(notice);
    }

    focusTrap = initialize();
  });
};
