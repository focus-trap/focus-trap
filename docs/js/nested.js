const { createFocusTrap } = require('../../index');
module.exports = () => {
  const primary = document.getElementById('nested');
  const nested = document.getElementById('nested-nested');

  // for e2e test purposes
  primary.dataset.ftTestPrimaryOnPauseCalledTimes = 0;
  primary.dataset.ftTestPrimaryOnPostPauseCalledTimes = 0;
  primary.dataset.ftTestPrimaryOnUnpauseCalledTimes = 0;
  primary.dataset.ftTestPrimaryOnPostUnpauseCalledTimes = 0;

  const primaryFocusTrap = createFocusTrap('#nested', {
    onDeactivate: () => (primary.style.display = 'none'),
    onPause: () => primary.dataset.ftTestPrimaryOnPauseCalledTimes++,
    onPostPause: () => primary.dataset.ftTestPrimaryOnPostPauseCalledTimes++,
    onUnpause: () => primary.dataset.ftTestPrimaryOnUnpauseCalledTimes++,
    onPostUnpause: () =>
      primary.dataset.ftTestPrimaryOnPostUnpauseCalledTimes++,
  });

  const nestedFocusTrap = createFocusTrap('#nested-nested', {
    onDeactivate: function () {
      nested.style.display = 'none';
    },
  });

  document
    .getElementById('activate-nested')
    .addEventListener('click', function () {
      primary.style.display = 'block';
      primaryFocusTrap.activate();
    });

  document
    .getElementById('deactivate-nested')
    .addEventListener('click', primaryFocusTrap.deactivate);

  document
    .getElementById('nested-activate-nested')
    .addEventListener('click', function () {
      nested.style.display = 'block';
      nestedFocusTrap.activate();
    });

  document
    .getElementById('nested-deactivate-nested')
    .addEventListener('click', nestedFocusTrap.deactivate);
};
