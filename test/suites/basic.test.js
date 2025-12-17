import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { createFocusTrap } from '../../index';

describe('basic', () => {
  let trapOptions;

  beforeEach(() => {
    // NOTE: in jest, the only display check that's expected to work is 'none' because
    //  jsDom doesn't support the APIs needed to make the other modes work
    trapOptions = {
      tabbableOptions: { displayCheck: 'none' },
    };
  });

  it('should activate and deactivate', async () => {
    /** @type {import('../tools/testingUtility.js').RenderResults} */
    const results = renderFixture('basic');
    const { activateEl, deactivateEl, trapEl } = results;

    const focusTrap = createFocusTrap(trapEl, {
      ...trapOptions,
      onActivate: () => trapEl?.classList.add('is-active'),
      onDeactivate: () => trapEl?.classList.remove('is-active'),
    });
    activateEl?.addEventListener('click', focusTrap.activate);
    deactivateEl?.addEventListener('click', focusTrap.deactivate);

    expect(trapEl).not.toHaveClass('is-active');

    userEvent.click(activateEl);
    await waitFor(() => expect(trapEl).toHaveClass('is-active'));

    userEvent.click(deactivateEl);
    await waitFor(() => expect(trapEl).not.toHaveClass('is-active'));
  });
});
