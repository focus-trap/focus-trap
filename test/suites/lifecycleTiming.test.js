import { waitFor } from '@testing-library/dom';

import { createFocusTrap } from '../../index';

describe('lifecycle timing', () => {
  const baseTrapOptions = {
    tabbableOptions: { displayCheck: 'none' },
    delayInitialFocus: false,
  };

  const renderTrap = (id) => {
    const triggerEl = document.createElement('button');
    triggerEl.id = `${id}-trigger`;
    triggerEl.textContent = `${id}-trigger`;

    const trapEl = document.createElement('div');
    trapEl.id = `${id}-trap`;

    const trapButtonEl = document.createElement('button');
    trapButtonEl.id = `${id}-inside`;
    trapButtonEl.textContent = `${id}-inside`;
    trapEl.appendChild(trapButtonEl);

    document.body.appendChild(triggerEl);
    document.body.appendChild(trapEl);

    return { triggerEl, trapEl };
  };

  const createLifecycleCallbacks = (events, prefix) => ({
    onActivate: () => events.push(`${prefix}:onActivate`),
    onPostActivate: () => events.push(`${prefix}:onPostActivate`),
    onPause: () => events.push(`${prefix}:onPause`),
    onPostPause: () => events.push(`${prefix}:onPostPause`),
    onUnpause: () => events.push(`${prefix}:onUnpause`),
    onPostUnpause: () => events.push(`${prefix}:onPostUnpause`),
    onDeactivate: () => events.push(`${prefix}:onDeactivate`),
    onPostDeactivate: () => events.push(`${prefix}:onPostDeactivate`),
  });

  it.each([
    ['resolve', false],
    ['reject', false],
    ['resolve', true],
    ['reject', true],
    ['resolve', 'before cancellation'],
    ['reject', 'before cancellation'],
    ['resolve', 'newer trap before cancellation'],
  ])(
    'restores isolation after cancelled permission %s, reapplied=%s',
    async (outcome, reapplied) => {
      const first = renderTrap('isolated-first');
      const second = renderTrap('isolated-second');
      const trapStack = [];
      const firstTrap = createFocusTrap(first.trapEl, {
        ...baseTrapOptions,
        trapStack,
        isolateSubtrees: 'aria-hidden',
      });
      let settlePermission;
      const secondTrap = createFocusTrap(second.trapEl, {
        ...baseTrapOptions,
        trapStack,
        checkCanFocusTrap: () =>
          new Promise((resolve, reject) => {
            settlePermission = outcome === 'resolve' ? resolve : reject;
          }),
      });
      firstTrap.activate();
      expect(second.trapEl).toHaveAttribute('aria-hidden', 'true');
      secondTrap.activate();
      expect(second.trapEl).not.toHaveAttribute('aria-hidden');
      if (reapplied === 'before cancellation') {
        firstTrap.pause();
        firstTrap.unpause();
      }
      if (reapplied === 'newer trap before cancellation') {
        const third = renderTrap('temporary-isolated');
        const thirdTrap = createFocusTrap(third.trapEl, {
          ...baseTrapOptions,
          trapStack,
          isolateSubtrees: 'aria-hidden',
        });
        thirdTrap.activate();
        thirdTrap.deactivate({ returnFocus: false });
      }
      secondTrap.deactivate({ returnFocus: false });
      if (reapplied) {
        firstTrap.pause();
        firstTrap.unpause();
      } else {
        expect(second.trapEl).toHaveAttribute('aria-hidden', 'true');
      }
      settlePermission();
      await Promise.resolve();
      expect(firstTrap.active).toBe(true);
      expect(firstTrap.paused).toBe(false);
      expect(second.trapEl).toHaveAttribute('aria-hidden', 'true');
      firstTrap.deactivate({ returnFocus: false });
      expect(second.trapEl).not.toHaveAttribute('aria-hidden');
    }
  );

  it('preserves a newer trap isolation when a pending activation is cancelled', async () => {
    const first = renderTrap('older-isolated');
    const second = renderTrap('pending-isolated');
    const third = renderTrap('newer-isolated');
    const trapStack = [];
    const options = {
      ...baseTrapOptions,
      trapStack,
      isolateSubtrees: 'aria-hidden',
    };
    const firstTrap = createFocusTrap(first.trapEl, options);
    let resolvePermission;
    const secondTrap = createFocusTrap(second.trapEl, {
      ...options,
      checkCanFocusTrap: () =>
        new Promise((resolve) => (resolvePermission = resolve)),
    });
    const thirdTrap = createFocusTrap(third.trapEl, options);
    firstTrap.activate();
    secondTrap.activate();
    thirdTrap.activate();
    secondTrap.deactivate({ returnFocus: false });
    resolvePermission();
    await Promise.resolve();
    expect(third.trapEl).not.toHaveAttribute('aria-hidden');
    expect(first.trapEl).toHaveAttribute('aria-hidden', 'true');
    thirdTrap.deactivate({ returnFocus: false });
    firstTrap.deactivate({ returnFocus: false });
    expect(second.trapEl).not.toHaveAttribute('aria-hidden');
    expect(third.trapEl).not.toHaveAttribute('aria-hidden');
  });

  it.each([
    [true, 'inert', ''],
    ['aria-hidden', 'aria-hidden', 'true'],
  ])(
    'preserves existing isolation when containers change, mode=%s',
    (mode, attribute, value) => {
      const first = renderTrap('old-container');
      const second = renderTrap('new-container');
      const hidden = document.createElement('div');
      hidden.setAttribute(attribute, value);
      document.body.appendChild(hidden);
      const trap = createFocusTrap(first.trapEl, {
        ...baseTrapOptions,
        isolateSubtrees: mode,
      });
      trap.activate();
      trap.updateContainerElements(second.trapEl);
      expect(first.trapEl).toHaveAttribute(attribute);
      expect(second.trapEl).not.toHaveAttribute(attribute);
      trap.deactivate({ returnFocus: false });
      expect(first.trapEl).not.toHaveAttribute(attribute);
      expect(second.trapEl).not.toHaveAttribute(attribute);
      expect(hidden).toHaveAttribute(attribute);
      hidden.remove();
    }
  );

  it('does not finish activation after its focus permission resolves following deactivation', async () => {
    const { triggerEl, trapEl } = renderTrap('cancelled');
    let resolvePermission;
    const onPostActivate = jest.fn();
    const trap = createFocusTrap(trapEl, {
      ...baseTrapOptions,
      onPostActivate,
      checkCanFocusTrap: () =>
        new Promise((resolve) => (resolvePermission = resolve)),
    });
    triggerEl.focus();
    trap.activate();
    trap.deactivate({ returnFocus: false });
    resolvePermission();
    await Promise.resolve();
    expect(onPostActivate).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(triggerEl);
  });

  it('ignores a superseded activation permission after reactivation', async () => {
    const { trapEl } = renderTrap('reactivated');
    let resolvePermission;
    const oldPostActivate = jest.fn();
    const newPostActivate = jest.fn();
    const trap = createFocusTrap(trapEl, baseTrapOptions);
    trap.activate({
      onPostActivate: oldPostActivate,
      checkCanFocusTrap: () =>
        new Promise((resolve) => (resolvePermission = resolve)),
    });
    trap.deactivate({ returnFocus: false });
    trap.activate({ onPostActivate: newPostActivate });
    resolvePermission();
    await Promise.resolve();
    expect(oldPostActivate).not.toHaveBeenCalled();
    expect(newPostActivate).toHaveBeenCalledTimes(1);
    trap.deactivate({ returnFocus: false });
  });

  it('does not complete activation when delayed focus deactivates the trap', async () => {
    const { trapEl } = renderTrap('focus-cancelled');
    const onPostActivate = jest.fn();
    const trap = createFocusTrap(trapEl, {
      ...baseTrapOptions,
      delayInitialFocus: true,
      onPostActivate,
    });
    trapEl.firstChild.addEventListener(
      'focus',
      () => trap.deactivate({ returnFocus: false }),
      { once: true }
    );
    trap.activate();
    await waitFor(() => expect(trap.active).toBe(false));
    expect(onPostActivate).not.toHaveBeenCalled();
  });

  it('should keep deactivation post-callbacks asynchronous by default across stacked traps', async () => {
    const events = [];
    const trapStack = [];
    const first = renderTrap('first');
    const second = renderTrap('second');

    const firstTrap = createFocusTrap(first.trapEl, {
      ...baseTrapOptions,
      trapStack,
      ...createLifecycleCallbacks(events, 'trap1'),
    });
    const secondTrap = createFocusTrap(second.trapEl, {
      ...baseTrapOptions,
      trapStack,
      ...createLifecycleCallbacks(events, 'trap2'),
    });

    first.triggerEl.focus();
    firstTrap.activate();
    await waitFor(() => expect(events).toContain('trap1:onPostActivate'));

    second.triggerEl.focus();
    secondTrap.activate();
    await waitFor(() => expect(events).toContain('trap2:onPostActivate'));

    secondTrap.deactivate();
    firstTrap.deactivate();

    await waitFor(() =>
      expect(
        events.filter((eventName) => eventName.endsWith('onPostDeactivate'))
          .length
      ).toBe(2)
    );

    expect(events).toEqual([
      'trap1:onActivate',
      'trap1:onPostActivate',
      'trap2:onActivate',
      'trap1:onPause',
      'trap1:onPostPause',
      'trap2:onPostActivate',
      'trap1:onUnpause',
      'trap1:onPostUnpause',
      'trap2:onDeactivate',
      'trap1:onDeactivate',
      'trap2:onPostDeactivate',
      'trap1:onPostDeactivate',
    ]);
  });

  it('should pair deactivation callbacks when delayReturnFocus is false', async () => {
    const events = [];
    const trapStack = [];
    const first = renderTrap('first-no-delay');
    const second = renderTrap('second-no-delay');

    const firstTrap = createFocusTrap(first.trapEl, {
      ...baseTrapOptions,
      trapStack,
      delayReturnFocus: false,
      ...createLifecycleCallbacks(events, 'trap1'),
    });
    const secondTrap = createFocusTrap(second.trapEl, {
      ...baseTrapOptions,
      trapStack,
      delayReturnFocus: false,
      ...createLifecycleCallbacks(events, 'trap2'),
    });

    first.triggerEl.focus();
    firstTrap.activate();
    await waitFor(() => expect(events).toContain('trap1:onPostActivate'));

    second.triggerEl.focus();
    secondTrap.activate();
    await waitFor(() => expect(events).toContain('trap2:onPostActivate'));

    secondTrap.deactivate();
    firstTrap.deactivate();

    await waitFor(() =>
      expect(
        events.filter((eventName) => eventName.endsWith('onPostDeactivate'))
          .length
      ).toBe(2)
    );

    expect(events).toEqual([
      'trap1:onActivate',
      'trap1:onPostActivate',
      'trap2:onActivate',
      'trap1:onPause',
      'trap1:onPostPause',
      'trap2:onPostActivate',
      'trap1:onUnpause',
      'trap1:onPostUnpause',
      'trap2:onDeactivate',
      'trap2:onPostDeactivate',
      'trap1:onDeactivate',
      'trap1:onPostDeactivate',
    ]);
  });

  it('should fire all lifecycle callbacks synchronously across stacked traps when delays are disabled', () => {
    // Verifies the fix for #1862: with delayInitialFocus=false and delayReturnFocus=false,
    //  the entire activate -> activate -> deactivate -> deactivate sequence must complete within a
    //  single microtask, with onPostActivate and onPostUnpause firing inline instead of
    //  being deferred by an unnecessary `await Promise.resolve()`.
    const events = [];
    const trapStack = [];
    const first = renderTrap('sync-first');
    const second = renderTrap('sync-second');

    const firstTrap = createFocusTrap(first.trapEl, {
      ...baseTrapOptions,
      trapStack,
      delayReturnFocus: false,
      ...createLifecycleCallbacks(events, 'trap1'),
    });
    const secondTrap = createFocusTrap(second.trapEl, {
      ...baseTrapOptions,
      trapStack,
      delayReturnFocus: false,
      ...createLifecycleCallbacks(events, 'trap2'),
    });

    first.triggerEl.focus();
    firstTrap.activate();
    secondTrap.activate();
    secondTrap.deactivate();
    firstTrap.deactivate();

    // all callbacks must have fired synchronously — no awaits needed
    expect(events).toEqual([
      'trap1:onActivate',
      'trap1:onPostActivate',
      'trap2:onActivate',
      'trap1:onPause',
      'trap1:onPostPause',
      'trap2:onPostActivate',
      'trap1:onUnpause',
      'trap1:onPostUnpause',
      'trap2:onDeactivate',
      'trap2:onPostDeactivate',
      'trap1:onDeactivate',
      'trap1:onPostDeactivate',
    ]);
  });

  it('should keep one-frame delay after checkCanReturnFocus settles by default', async () => {
    jest.useFakeTimers();
    try {
      const events = [];
      const { triggerEl, trapEl } = renderTrap('single-default-delay');
      let resolveCanReturnFocus;
      const checkCanReturnFocus = jest.fn(
        () =>
          new Promise((resolve) => {
            resolveCanReturnFocus = resolve;
          })
      );

      const trap = createFocusTrap(trapEl, {
        ...baseTrapOptions,
        checkCanReturnFocus,
        onDeactivate: () => events.push('onDeactivate'),
        onPostDeactivate: () => events.push('onPostDeactivate'),
      });

      triggerEl.focus();
      trap.activate();
      trap.deactivate();

      expect(checkCanReturnFocus).toHaveBeenCalledTimes(1);
      expect(events).toEqual(['onDeactivate']);

      resolveCanReturnFocus();
      await Promise.resolve();

      expect(events).toEqual(['onDeactivate']);

      jest.runOnlyPendingTimers();

      expect(events).toEqual(['onDeactivate', 'onPostDeactivate']);
    } finally {
      jest.useRealTimers();
    }
  });

  it('should call onPostDeactivate synchronously when returnFocus is false with default delayReturnFocus', () => {
    jest.useFakeTimers();
    try {
      const events = [];
      const { triggerEl, trapEl } = renderTrap('single-no-return-focus');
      const trap = createFocusTrap(trapEl, {
        ...baseTrapOptions,
        onDeactivate: () => events.push('onDeactivate'),
        onPostDeactivate: () => events.push('onPostDeactivate'),
      });

      triggerEl.focus();
      trap.activate();
      trap.deactivate({ returnFocus: false });

      expect(events).toEqual(['onDeactivate', 'onPostDeactivate']);

      jest.runOnlyPendingTimers();

      expect(events).toEqual(['onDeactivate', 'onPostDeactivate']);
    } finally {
      jest.useRealTimers();
    }
  });

  it('should skip one-frame delay after checkCanReturnFocus settles when delayReturnFocus is false', async () => {
    const events = [];
    const { triggerEl, trapEl } = renderTrap('single-no-delay');
    let resolveCanReturnFocus;
    const checkCanReturnFocus = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveCanReturnFocus = resolve;
        })
    );

    const trap = createFocusTrap(trapEl, {
      ...baseTrapOptions,
      delayReturnFocus: false,
      checkCanReturnFocus,
      onDeactivate: () => events.push('onDeactivate'),
      onPostDeactivate: () => events.push('onPostDeactivate'),
    });

    triggerEl.focus();
    trap.activate();
    trap.deactivate();

    expect(checkCanReturnFocus).toHaveBeenCalledTimes(1);
    expect(events).toEqual(['onDeactivate']);

    resolveCanReturnFocus();
    await Promise.resolve();

    expect(events).toEqual(['onDeactivate', 'onPostDeactivate']);
  });
});
