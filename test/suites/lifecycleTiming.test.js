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

  it.each([
    [
      'deactivated',
      (trap) => trap.deactivate({ returnFocus: false }),
      ['first:onUnpause', 'first:onDeactivate'],
    ],
    [
      'reactivated',
      (trap) => {
        trap.deactivate({ returnFocus: false });
        trap.activate();
      },
      [
        'first:onUnpause',
        'first:onDeactivate',
        'first:onActivate',
        'first:onPostActivate',
      ],
    ],
    [
      'paused',
      (trap) => trap.pause(),
      ['first:onUnpause', 'first:onPause', 'first:onPostPause'],
    ],
  ])(
    'should not finish unpausing a trap %s by its initial focus',
    (_, interrupt, expectedEvents) => {
      const events = [];
      const trapStack = [];
      const first = renderTrap('unpause-interrupted-first');
      const second = renderTrap('unpause-interrupted-second');

      const firstTrap = createFocusTrap(first.trapEl, {
        ...baseTrapOptions,
        trapStack,
        isolateSubtrees: 'aria-hidden',
        onActivate: () => events.push('first:onActivate'),
        onPostActivate: () => events.push('first:onPostActivate'),
        onPause: () => events.push('first:onPause'),
        onPostPause: () => events.push('first:onPostPause'),
        onUnpause: () => events.push('first:onUnpause'),
        onPostUnpause: () => events.push('first:onPostUnpause'),
        onDeactivate: () => events.push('first:onDeactivate'),
      });
      const secondTrap = createFocusTrap(second.trapEl, {
        ...baseTrapOptions,
        trapStack,
      });

      firstTrap.activate();
      secondTrap.activate();
      events.length = 0;

      // interrupt the first trap as soon as it focuses its initial focus node on unpause
      first.trapEl.firstChild.addEventListener(
        'focus',
        () => interrupt(firstTrap),
        { once: true }
      );
      secondTrap.deactivate({ returnFocus: false });

      expect(events).toEqual(expectedEvents);

      firstTrap.deactivate({ returnFocus: false });
      expect(second.trapEl).not.toHaveAttribute('aria-hidden');
    }
  );
});
