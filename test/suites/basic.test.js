import { waitFor } from '@testing-library/dom';

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

  it('should run all lifecycle callbacks', async () => {
    /** @type {import('../tools/testingUtility.js').RenderResults} */
    const results = renderFixture('basic');
    const { activateEl, trapEl } = results;

    const lifecycleEvents = [];

    // eslint-disable-next-line prefer-const -- disabling as ignoreReadBeforeAssign is set to false
    let focusTrap;
    const makeLifecycleCallback = (name, effect) =>
      jest.fn(({ trap }) => {
        lifecycleEvents.push(name);
        expect(trap).toBe(focusTrap);
        effect?.();
      });

    const onActivate = makeLifecycleCallback('onActivate', () =>
      trapEl?.classList.add('is-active')
    );
    const onPostActivate = makeLifecycleCallback('onPostActivate');
    const onPause = makeLifecycleCallback('onPause');
    const onPostPause = makeLifecycleCallback('onPostPause');
    const onUnpause = makeLifecycleCallback('onUnpause');
    const onPostUnpause = makeLifecycleCallback('onPostUnpause');
    const onDeactivate = makeLifecycleCallback('onDeactivate', () =>
      trapEl?.classList.remove('is-active')
    );
    const onPostDeactivate = makeLifecycleCallback('onPostDeactivate');

    focusTrap = createFocusTrap(trapEl, {
      ...trapOptions,
      delayInitialFocus: false,
      onActivate,
      onPostActivate,
      onPause,
      onPostPause,
      onUnpause,
      onPostUnpause,
      onDeactivate,
      onPostDeactivate,
    });

    activateEl?.focus();
    expect(activateEl).toHaveFocus();
    expect(trapEl).not.toHaveClass('is-active');
    expect(focusTrap.active).toBe(false);
    expect(focusTrap.paused).toBe(false);

    focusTrap.activate();
    await waitFor(() => {
      expect(trapEl).toHaveClass('is-active');
      expect(onActivate).toHaveBeenCalledTimes(1);
      expect(onPostActivate).toHaveBeenCalledTimes(1);
    });

    expect(onActivate).toHaveBeenCalledWith({ trap: focusTrap });
    expect(onPostActivate).toHaveBeenCalledWith({ trap: focusTrap });
    expect(focusTrap.active).toBe(true);
    expect(focusTrap.paused).toBe(false);

    focusTrap.pause();
    await waitFor(() => {
      expect(onPause).toHaveBeenCalledTimes(1);
      expect(onPostPause).toHaveBeenCalledTimes(1);
    });

    expect(onPause).toHaveBeenCalledWith({ trap: focusTrap });
    expect(onPostPause).toHaveBeenCalledWith({ trap: focusTrap });
    expect(focusTrap.active).toBe(true);
    expect(focusTrap.paused).toBe(true);

    focusTrap.unpause();
    await waitFor(() => {
      expect(onUnpause).toHaveBeenCalledTimes(1);
      expect(onPostUnpause).toHaveBeenCalledTimes(1);
    });

    expect(onUnpause).toHaveBeenCalledWith({ trap: focusTrap });
    expect(onPostUnpause).toHaveBeenCalledWith({ trap: focusTrap });
    expect(focusTrap.active).toBe(true);
    expect(focusTrap.paused).toBe(false);

    focusTrap.deactivate();
    await waitFor(() => {
      expect(trapEl).not.toHaveClass('is-active');
      expect(activateEl).toHaveFocus();
      expect(onDeactivate).toHaveBeenCalledTimes(1);
      expect(onPostDeactivate).toHaveBeenCalledTimes(1);
    });

    expect(onDeactivate).toHaveBeenCalledWith({ trap: focusTrap });
    expect(onPostDeactivate).toHaveBeenCalledWith({ trap: focusTrap });
    expect(focusTrap.active).toBe(false);
    expect(focusTrap.paused).toBe(false);

    expect(lifecycleEvents).toEqual([
      'onActivate',
      'onPostActivate',
      'onPause',
      'onPostPause',
      'onUnpause',
      'onPostUnpause',
      'onDeactivate',
      'onPostDeactivate',
    ]);
  });
});
