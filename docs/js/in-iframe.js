require('regenerator-runtime/runtime'); // needed for the async function we export here

const { createFocusTrap } = require('../../index');

module.exports = async () => {
  const contextIframe = document.getElementById('in-iframe');
  // wait for iFrame DOM to completely load
  while (
    !contextIframe.contentWindow.document.getElementById('in-iframe-trap')
  ) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 500));
  }

  const targetDocument = contextIframe.contentWindow.document;
  if (targetDocument) {
    const trapWrapper = targetDocument.getElementById('in-iframe-trap');
    const focusTrap = createFocusTrap('#in-iframe-trap', {
      document: targetDocument,
      onActivate: () => trapWrapper.classList.add('is-active'),
      onDeactivate: () => trapWrapper.classList.remove('is-active'),
    });
    document
      .getElementById('activate-in-iframe')
      .addEventListener('click', focusTrap.activate);

    targetDocument
      .getElementById('deactivate-in-iframe')
      .addEventListener('click', focusTrap.deactivate);
  }
};
