import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { createFocusTrap } from '../../index';

describe('isolateSubtrees', () => {
  let trapOptions;

  beforeEach(() => {
    // NOTE: in jest, the only display check that's expected to work is 'none' because
    //  jsDom doesn't support the APIs needed to make the other modes work
    trapOptions = {
      tabbableOptions: { displayCheck: 'none' },
    };
  });

  /**
   * INERT USAGE
   */

  it('should manage `inert` on activation and deactivation', async () => {
    /** @type {import('../tools/testingUtility.js').RenderResults} */
    const { containerEl } = renderFixture('isolateSubtrees');

    const firstTrapEl = containerEl.querySelector('#first-trap');
    const activateFirst = containerEl.querySelector('#activate-first');
    const deactivateFirst = containerEl.querySelector('#deactivate-first');
    const firstTrap = createFocusTrap(firstTrapEl, {
      ...trapOptions,
      isolateSubtrees: true,
    });
    activateFirst.addEventListener('click', firstTrap.activate);
    deactivateFirst.addEventListener('click', firstTrap.deactivate);

    const secondTrapEl = containerEl.querySelector('#second-trap');
    const activateSecond = containerEl.querySelector('#activate-second');
    const deactivateSecond = containerEl.querySelector('#deactivate-second');
    const secondTrap = createFocusTrap(secondTrapEl, {
      ...trapOptions,
      isolateSubtrees: true,
    });
    activateSecond.addEventListener('click', secondTrap.activate);
    deactivateSecond.addEventListener('click', secondTrap.deactivate);

    const nestedTrapEl = containerEl.querySelector('#nested-trap');
    const activateNested = containerEl.querySelector('#activate-nested');
    const deactivateNested = containerEl.querySelector('#deactivate-nested');
    const nestedTrap = createFocusTrap(nestedTrapEl, {
      ...trapOptions,
      isolateSubtrees: true,
    });
    activateNested.addEventListener('click', nestedTrap.activate);
    deactivateNested.addEventListener('click', nestedTrap.deactivate);

    // Activate first trap.
    expect(secondTrapEl.inert).not.toBe(true);
    userEvent.click(activateFirst);
    await waitFor(() => expect(secondTrapEl.inert).toBe(true));
    expect(activateFirst.inert).toBe(true);
    expect(nestedTrapEl.inert).not.toBe(true);

    // Deactivate first trap.
    userEvent.click(deactivateFirst);
    await waitFor(() => expect(secondTrapEl.inert).not.toBe(true));
    expect(activateFirst.inert).not.toBe(true);
    expect(nestedTrapEl.inert).not.toBe(true);
  });

  it('should manage `inert` across multiple traps', async () => {
    /** @type {import('../tools/testingUtility.js').RenderResults} */
    const { containerEl } = renderFixture('isolateSubtrees');

    const firstTrapEl = containerEl.querySelector('#first-trap');
    const activateFirst = containerEl.querySelector('#activate-first');
    const deactivateFirst = containerEl.querySelector('#deactivate-first');
    const firstTrap = createFocusTrap(firstTrapEl, {
      ...trapOptions,
      isolateSubtrees: true,
    });
    activateFirst.addEventListener('click', firstTrap.activate);
    deactivateFirst.addEventListener('click', firstTrap.deactivate);

    const secondTrapEl = containerEl.querySelector('#second-trap');
    const activateSecond = containerEl.querySelector('#activate-second');
    const deactivateSecond = containerEl.querySelector('#deactivate-second');
    const secondTrap = createFocusTrap(secondTrapEl, {
      ...trapOptions,
      isolateSubtrees: true,
    });
    activateSecond.addEventListener('click', secondTrap.activate);
    deactivateSecond.addEventListener('click', secondTrap.deactivate);

    const nestedTrapEl = containerEl.querySelector('#nested-trap');
    const activateNested = containerEl.querySelector('#activate-nested');
    const deactivateNested = containerEl.querySelector('#deactivate-nested');
    const nestedTrap = createFocusTrap(nestedTrapEl, {
      ...trapOptions,
      isolateSubtrees: true,
    });
    activateNested.addEventListener('click', nestedTrap.activate);
    deactivateNested.addEventListener('click', nestedTrap.deactivate);

    // Activate first trap.
    userEvent.click(activateFirst);
    await waitFor(() => expect(secondTrapEl.inert).toBe(true));
    expect(firstTrapEl.inert).not.toBe(true);
    expect(activateFirst.inert).toBe(true);
    expect(nestedTrapEl.inert).not.toBe(true);

    // Activate second trap.
    userEvent.click(activateSecond);
    await waitFor(() => expect(secondTrapEl.inert).not.toBe(true));
    expect(firstTrapEl.inert).toBe(true);
    expect(activateFirst.inert).toBe(true);

    // Deactivate second trap.
    userEvent.click(deactivateSecond);
    await waitFor(() => expect(secondTrapEl.inert).toBe(true));
    expect(firstTrapEl.inert).not.toBe(true);
    expect(activateFirst.inert).toBe(true);
    expect(nestedTrapEl.inert).not.toBe(true);

    // Activate nested trap.
    userEvent.click(activateNested);
    await waitFor(() => expect(activateNested.inert).toBe(true));

    // Deactivate nested trap.
    userEvent.click(deactivateNested);
    await waitFor(() => expect(activateNested.inert).not.toBe(true));

    // Deactivate first trap.
    userEvent.click(deactivateFirst);
    await waitFor(() => expect(secondTrapEl.inert).not.toBe(true));
    expect(activateFirst.inert).not.toBe(true);
    expect(nestedTrapEl.inert).not.toBe(true);
  });

  it('should track elements that were inert before activation', async () => {
    /** @type {import('../tools/testingUtility.js').RenderResults} */
    const { containerEl } = renderFixture('isolateSubtrees');

    const firstTrapEl = containerEl.querySelector('#first-trap');
    const activateFirst = containerEl.querySelector('#activate-first');
    const deactivateFirst = containerEl.querySelector('#deactivate-first');
    const firstTrap = createFocusTrap(firstTrapEl, {
      ...trapOptions,
      isolateSubtrees: true,
    });
    activateFirst.addEventListener('click', firstTrap.activate);
    deactivateFirst.addEventListener('click', firstTrap.deactivate);

    const secondTrapEl = containerEl.querySelector('#second-trap');
    const activateSecond = containerEl.querySelector('#activate-second');
    const deactivateSecond = containerEl.querySelector('#deactivate-second');
    const secondTrap = createFocusTrap(secondTrapEl, {
      ...trapOptions,
      isolateSubtrees: true,
    });
    activateSecond.addEventListener('click', secondTrap.activate);
    deactivateSecond.addEventListener('click', secondTrap.deactivate);

    const nestedTrapEl = containerEl.querySelector('#nested-trap');
    const activateNested = containerEl.querySelector('#activate-nested');
    const deactivateNested = containerEl.querySelector('#deactivate-nested');
    const nestedTrap = createFocusTrap(nestedTrapEl, {
      ...trapOptions,
      isolateSubtrees: true,
    });
    activateNested.addEventListener('click', nestedTrap.activate);
    deactivateNested.addEventListener('click', nestedTrap.deactivate);

    const inertSibling = containerEl.querySelector('#inert-sibling');
    const ordinarySibling = containerEl.querySelector('#ordinary-sibling');

    // Activate first trap.
    userEvent.click(activateFirst);
    await waitFor(() => expect(firstTrap.active).toBe(true));
    expect(firstTrap.paused).toBe(false);
    expect(inertSibling.inert).toBe(true);
    expect(ordinarySibling.inert).toBe(true);

    // Activate second trap.
    userEvent.click(activateSecond);
    await waitFor(() => expect(secondTrap.active).toBe(true));
    expect(secondTrap.paused).toBe(false);
    expect(firstTrap.paused).toBe(true);
    expect(inertSibling.inert).toBe(true);
    expect(ordinarySibling.inert).toBe(true);

    // Deactivate second trap.
    userEvent.click(deactivateSecond);
    await waitFor(() => expect(secondTrap.active).toBe(false));
    expect(firstTrap.paused).toBe(false);
    expect(inertSibling.inert).toBe(true);
    expect(ordinarySibling.inert).toBe(true);

    // Deactivate first trap.
    userEvent.click(deactivateFirst);
    await waitFor(() => expect(firstTrap.active).toBe(false));
    expect(inertSibling.inert).toBe(true);
    expect(ordinarySibling.inert).toBe(false);
  });

  it('inert application should be robust to manual stack manipulation', async () => {
    /** @type {import('../tools/testingUtility.js').RenderResults} */
    const { containerEl } = renderFixture('isolateSubtrees');

    const firstTrapEl = containerEl.querySelector('#first-trap');
    const firstTrap = createFocusTrap(firstTrapEl, {
      ...trapOptions,
      isolateSubtrees: true,
    });

    const secondTrapEl = containerEl.querySelector('#second-trap');
    const secondTrap = createFocusTrap(secondTrapEl, {
      ...trapOptions,
      isolateSubtrees: true,
    });

    const nestedTrapEl = containerEl.querySelector('#nested-trap');
    const nestedTrap = createFocusTrap(nestedTrapEl, {
      ...trapOptions,
      isolateSubtrees: true,
    });

    const inertSibling = containerEl.querySelector('#inert-sibling');
    const ordinarySibling = containerEl.querySelector('#ordinary-sibling');

    // Activate first trap.
    firstTrap.activate();
    await waitFor(() => expect(firstTrap.active).toBe(true));
    expect(firstTrap.paused).toBe(false);
    expect(inertSibling.inert).toBe(true);
    expect(ordinarySibling.inert).toBe(true);

    // Activate second trap.
    secondTrap.activate();
    await waitFor(() => expect(secondTrap.active).toBe(true));
    expect(secondTrap.paused).toBe(false);
    expect(firstTrap.paused).toBe(true);
    expect(inertSibling.inert).toBe(true);
    expect(ordinarySibling.inert).toBe(true);

    // Deactivate first trap.
    firstTrap.deactivate();
    await waitFor(() => expect(firstTrap.active).toBe(false));
    expect(secondTrap.active).toBe(true);
    expect(secondTrap.paused).toBe(false);
    expect(inertSibling.inert).toBe(true);
    expect(ordinarySibling.inert).toBe(true);

    // Activate nested trap.
    nestedTrap.activate();
    await waitFor(() => expect(nestedTrap.active).toBe(true));
    expect(nestedTrap.paused).toBe(false);
    expect(secondTrap.paused).toBe(true);
    expect(inertSibling.inert).toBe(true);
    expect(ordinarySibling.inert).toBe(true);

    // Deactivate second trap.
    secondTrap.deactivate();
    await waitFor(() => expect(secondTrap.active).toBe(false));
    expect(nestedTrap.active).toBe(true);
    expect(nestedTrap.paused).toBe(false);
    expect(inertSibling.inert).toBe(true);
    expect(ordinarySibling.inert).toBe(true);

    // Deactivate nested trap.
    nestedTrap.deactivate();
    await waitFor(() => expect(nestedTrap.active).toBe(false));
    expect(firstTrap.active).toBe(false);
    expect(secondTrap.active).toBe(false);
    expect(inertSibling.inert).toBe(true);
    expect(ordinarySibling.inert).toBe(false);
  });

  /**
   * ARIA-HIDDEN USAGE
   */

  it('should manage `aria-hidden` on activation and deactivation', async () => {
    /** @type {import('../tools/testingUtility.js').RenderResults} */
    const { containerEl } = renderFixture('isolateSubtrees');

    const firstTrapEl = containerEl.querySelector('#first-trap');
    const activateFirst = containerEl.querySelector('#activate-first');
    const deactivateFirst = containerEl.querySelector('#deactivate-first');
    const firstTrap = createFocusTrap(firstTrapEl, {
      ...trapOptions,
      isolateSubtrees: 'aria-hidden',
    });
    activateFirst.addEventListener('click', firstTrap.activate);
    deactivateFirst.addEventListener('click', firstTrap.deactivate);

    const secondTrapEl = containerEl.querySelector('#second-trap');
    const activateSecond = containerEl.querySelector('#activate-second');
    const deactivateSecond = containerEl.querySelector('#deactivate-second');
    const secondTrap = createFocusTrap(secondTrapEl, {
      ...trapOptions,
      isolateSubtrees: 'aria-hidden',
    });
    activateSecond.addEventListener('click', secondTrap.activate);
    deactivateSecond.addEventListener('click', secondTrap.deactivate);

    const nestedTrapEl = containerEl.querySelector('#nested-trap');
    const activateNested = containerEl.querySelector('#activate-nested');
    const deactivateNested = containerEl.querySelector('#deactivate-nested');
    const nestedTrap = createFocusTrap(nestedTrapEl, {
      ...trapOptions,
      isolateSubtrees: 'aria-hidden',
    });
    activateNested.addEventListener('click', nestedTrap.activate);
    deactivateNested.addEventListener('click', nestedTrap.deactivate);

    // Activate first trap.
    expect(secondTrapEl.ariaHidden).not.toBe('true');
    userEvent.click(activateFirst);
    await waitFor(() =>
      expect(secondTrapEl.ariaHidden).toBe('true')
    );
    expect(activateFirst.ariaHidden).toBe('true');
    expect(nestedTrapEl.ariaHidden).not.toBe('true');

    // Deactivate first trap.
    userEvent.click(deactivateFirst);
    await waitFor(() =>
      expect(secondTrapEl.ariaHidden).not.toBe('true')
    );
    expect(activateFirst.ariaHidden).not.toBe('true');
    expect(nestedTrapEl.ariaHidden).not.toBe('true');
  });

  it('should manage `aria-hidden` across multiple traps', async () => {
    /** @type {import('../tools/testingUtility.js').RenderResults} */
    const { containerEl } = renderFixture('isolateSubtrees');

    const firstTrapEl = containerEl.querySelector('#first-trap');
    const activateFirst = containerEl.querySelector('#activate-first');
    const deactivateFirst = containerEl.querySelector('#deactivate-first');
    const firstTrap = createFocusTrap(firstTrapEl, {
      ...trapOptions,
      isolateSubtrees: 'aria-hidden',
    });
    activateFirst.addEventListener('click', firstTrap.activate);
    deactivateFirst.addEventListener('click', firstTrap.deactivate);

    const secondTrapEl = containerEl.querySelector('#second-trap');
    const activateSecond = containerEl.querySelector('#activate-second');
    const deactivateSecond = containerEl.querySelector('#deactivate-second');
    const secondTrap = createFocusTrap(secondTrapEl, {
      ...trapOptions,
      isolateSubtrees: 'aria-hidden',
    });
    activateSecond.addEventListener('click', secondTrap.activate);
    deactivateSecond.addEventListener('click', secondTrap.deactivate);

    const nestedTrapEl = containerEl.querySelector('#nested-trap');
    const activateNested = containerEl.querySelector('#activate-nested');
    const deactivateNested = containerEl.querySelector('#deactivate-nested');
    const nestedTrap = createFocusTrap(nestedTrapEl, {
      ...trapOptions,
      isolateSubtrees: 'aria-hidden',
    });
    activateNested.addEventListener('click', nestedTrap.activate);
    deactivateNested.addEventListener('click', nestedTrap.deactivate);

    // Activate first trap.
    userEvent.click(activateFirst);
    await waitFor(() =>
      expect(secondTrapEl.ariaHidden).toBe('true')
    );
    expect(firstTrapEl.ariaHidden).not.toBe('true');
    expect(activateFirst.ariaHidden).toBe('true');
    expect(nestedTrapEl.ariaHidden).not.toBe('true');

    // Activate second trap.
    userEvent.click(activateSecond);
    await waitFor(() =>
      expect(secondTrapEl.ariaHidden).not.toBe('true')
    );
    expect(firstTrapEl.ariaHidden).toBe('true');
    expect(activateFirst.ariaHidden).toBe('true');

    // Deactivate second trap.
    userEvent.click(deactivateSecond);
    await waitFor(() =>
      expect(secondTrapEl.ariaHidden).toBe('true')
    );
    expect(firstTrapEl.ariaHidden).not.toBe('true');
    expect(activateFirst.ariaHidden).toBe('true');
    expect(nestedTrapEl.ariaHidden).not.toBe('true');

    // Activate nested trap.
    userEvent.click(activateNested);
    await waitFor(() =>
      expect(activateNested.ariaHidden).toBe('true')
    );

    // Deactivate nested trap.
    userEvent.click(deactivateNested);
    await waitFor(() =>
      expect(activateNested.ariaHidden).not.toBe(
        'true'
      )
    );

    // Deactivate first trap.
    userEvent.click(deactivateFirst);
    await waitFor(() =>
      expect(secondTrapEl.ariaHidden).not.toBe('true')
    );
    expect(activateFirst.ariaHidden).not.toBe('true');
    expect(nestedTrapEl.ariaHidden).not.toBe('true');
  });

  it('should track elements that were aria-hidden before activation', async () => {
    /** @type {import('../tools/testingUtility.js').RenderResults} */
    const { containerEl } = renderFixture('isolateSubtrees');

    const firstTrapEl = containerEl.querySelector('#first-trap');
    const activateFirst = containerEl.querySelector('#activate-first');
    const deactivateFirst = containerEl.querySelector('#deactivate-first');
    const firstTrap = createFocusTrap(firstTrapEl, {
      ...trapOptions,
      isolateSubtrees: 'aria-hidden',
    });
    activateFirst.addEventListener('click', firstTrap.activate);
    deactivateFirst.addEventListener('click', firstTrap.deactivate);

    const secondTrapEl = containerEl.querySelector('#second-trap');
    const activateSecond = containerEl.querySelector('#activate-second');
    const deactivateSecond = containerEl.querySelector('#deactivate-second');
    const secondTrap = createFocusTrap(secondTrapEl, {
      ...trapOptions,
      isolateSubtrees: 'aria-hidden',
    });
    activateSecond.addEventListener('click', secondTrap.activate);
    deactivateSecond.addEventListener('click', secondTrap.deactivate);

    const nestedTrapEl = containerEl.querySelector('#nested-trap');
    const activateNested = containerEl.querySelector('#activate-nested');
    const deactivateNested = containerEl.querySelector('#deactivate-nested');
    const nestedTrap = createFocusTrap(nestedTrapEl, {
      ...trapOptions,
      isolateSubtrees: 'aria-hidden',
    });
    activateNested.addEventListener('click', nestedTrap.activate);
    deactivateNested.addEventListener('click', nestedTrap.deactivate);

    const inertSibling = containerEl.querySelector('#inert-sibling');
    const ordinarySibling = containerEl.querySelector('#ordinary-sibling');

    // Activate first trap.
    userEvent.click(activateFirst);
    await waitFor(() => expect(firstTrap.active).toBe(true));
    expect(firstTrap.paused).toBe(false);
    expect(inertSibling.ariaHidden).toBe('true');
    expect(ordinarySibling.ariaHidden).toBe('true');

    // Activate second trap.
    userEvent.click(activateSecond);
    await waitFor(() => expect(secondTrap.active).toBe(true));
    expect(secondTrap.paused).toBe(false);
    expect(firstTrap.paused).toBe(true);
    expect(inertSibling.ariaHidden).toBe('true');
    expect(ordinarySibling.ariaHidden).toBe('true');

    // Deactivate second trap.
    userEvent.click(deactivateSecond);
    await waitFor(() => expect(secondTrap.active).toBe(false));
    expect(firstTrap.paused).toBe(false);
    expect(inertSibling.ariaHidden).toBe('true');
    expect(ordinarySibling.ariaHidden).toBe('true');

    // Deactivate first trap.
    userEvent.click(deactivateFirst);
    await waitFor(() => expect(firstTrap.active).toBe(false));
    expect(inertSibling.ariaHidden).toBe('true');
    expect(ordinarySibling.ariaHidden).not.toBe('true');
  });

  it('aria-hidden application should be robust to manual stack manipulation', async () => {
    /** @type {import('../tools/testingUtility.js').RenderResults} */
    const { containerEl } = renderFixture('isolateSubtrees');

    const firstTrapEl = containerEl.querySelector('#first-trap');
    const firstTrap = createFocusTrap(firstTrapEl, {
      ...trapOptions,
      isolateSubtrees: 'aria-hidden',
    });

    const secondTrapEl = containerEl.querySelector('#second-trap');
    const secondTrap = createFocusTrap(secondTrapEl, {
      ...trapOptions,
      isolateSubtrees: 'aria-hidden',
    });

    const nestedTrapEl = containerEl.querySelector('#nested-trap');
    const nestedTrap = createFocusTrap(nestedTrapEl, {
      ...trapOptions,
      isolateSubtrees: 'aria-hidden',
    });

    const inertSibling = containerEl.querySelector('#inert-sibling');
    const ordinarySibling = containerEl.querySelector('#ordinary-sibling');

    // Activate first trap.
    firstTrap.activate();
    await waitFor(() => expect(firstTrap.active).toBe(true));
    expect(firstTrap.paused).toBe(false);
    expect(inertSibling.ariaHidden).toBe('true');
    expect(ordinarySibling.ariaHidden).toBe('true');

    // Activate second trap.
    secondTrap.activate();
    await waitFor(() => expect(secondTrap.active).toBe(true));
    expect(secondTrap.paused).toBe(false);
    expect(firstTrap.paused).toBe(true);
    expect(inertSibling.ariaHidden).toBe('true');
    expect(ordinarySibling.ariaHidden).toBe('true');

    // Deactivate first trap.
    firstTrap.deactivate();
    await waitFor(() => expect(firstTrap.active).toBe(false));
    expect(secondTrap.active).toBe(true);
    expect(secondTrap.paused).toBe(false);
    expect(inertSibling.ariaHidden).toBe('true');
    expect(ordinarySibling.ariaHidden).toBe('true');

    // Activate nested trap.
    nestedTrap.activate();
    await waitFor(() => expect(nestedTrap.active).toBe(true));
    expect(nestedTrap.paused).toBe(false);
    expect(secondTrap.paused).toBe(true);
    expect(inertSibling.ariaHidden).toBe('true');
    expect(ordinarySibling.ariaHidden).toBe('true');

    // Deactivate second trap.
    secondTrap.deactivate();
    await waitFor(() => expect(secondTrap.active).toBe(false));
    expect(nestedTrap.active).toBe(true);
    expect(nestedTrap.paused).toBe(false);
    expect(inertSibling.ariaHidden).toBe('true');
    expect(ordinarySibling.ariaHidden).toBe('true');

    // Deactivate nested trap.
    nestedTrap.deactivate();
    await waitFor(() => expect(nestedTrap.active).toBe(false));
    expect(firstTrap.active).toBe(false);
    expect(secondTrap.active).toBe(false);
    expect(inertSibling.ariaHidden).toBe('true');
    expect(ordinarySibling.ariaHidden).not.toBe('true');
  });

  it('should deactivate trap when using aria-hidden in combination with clickOutsideDeactivates', async () => {
    /** @type {import('../tools/testingUtility.js').RenderResults} */
    const { containerEl } = renderFixture('isolateSubtrees');

    const firstTrapEl = containerEl.querySelector('#first-trap');
    const firstTrap = createFocusTrap(firstTrapEl, {
      ...trapOptions,
      isolateSubtrees: 'aria-hidden',
      clickOutsideDeactivates: true,
    });
    const activateFirst = containerEl.querySelector('#activate-first');
    activateFirst.addEventListener('click', firstTrap.activate);

    const ordinarySibling = containerEl.querySelector('#ordinary-sibling');

    userEvent.click(activateFirst);
    await waitFor(() => expect(firstTrap.active).toBe(true));
    expect(ordinarySibling.ariaHidden).toBe('true');

    userEvent.click(ordinarySibling);
    await waitFor(() => expect(firstTrap.active).toBe(false));
    expect(ordinarySibling.ariaHidden).not.toBe('true');
  });
});
