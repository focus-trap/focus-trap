import { userEvent } from '@testing-library/user-event';

import { createFocusTrap } from '../../index';

describe('multiple containers', () => {
  let trap;

  afterEach(() => {
    trap?.deactivate({ returnFocus: false });
    trap = undefined;
  });

  /**
   * Renders one focusable (`tabindex="-1"`) container per entry, each containing
   *  a button for every space-separated ID in the entry (none if the entry is empty),
   *  and activates a trap on all of them.
   * @param {string[]} layout
   * @returns {HTMLElement[]} The containers.
   */
  const renderTrap = (layout) => {
    const containers = layout.map((ids) => {
      const container = document.createElement('div');
      container.tabIndex = -1;
      ids
        .split(' ')
        .filter(Boolean)
        .forEach((id) => {
          const button = document.createElement('button');
          button.id = id;
          // NOTE: focusing a container itself (tabindex -1) makes the trap navigate to
          //  its groups' DOM-order first/last tabbable nodes, which are found without
          //  `tabbableOptions` (so with the default 'full' display check), and jsdom
          //  has no layout, so give the buttons a client rect to count as visible
          button.getClientRects = () => [{}];
          container.appendChild(button);
        });
      document.body.appendChild(container);
      return container;
    });

    trap = createFocusTrap(containers, {
      delayInitialFocus: false,
      tabbableOptions: { displayCheck: 'none' },
    });
    trap.activate();

    return containers;
  };

  // NOTE: `focusedIndex` is the container that has focus (i.e. the container itself, not
  //  one of its descendants); `''` is a container without any tabbable nodes
  it.each([
    [['a1 a2', ''], 1, 'a1', 'a2'],
    [['a1 a2', '', 'b1 b2'], 1, 'b1', 'a2'],
    [['', '', 'a1 a2'], 1, 'a1', 'a2'],
    [['a1 a2', '', ''], 2, 'a1', 'a2'],
    [['', 'a1 a2', 'b1 b2'], 0, 'a1', 'b2'],
    [['', 'a1 a2', 'b1 b2'], 1, 'b1', 'b2'],
  ])(
    'keeps focus in the trap when containers are %j and container %i has focus',
    async (layout, focusedIndex, nextId, previousId) => {
      const containers = renderTrap(layout);

      containers[focusedIndex].focus();
      await userEvent.tab();
      expect(document.getElementById(nextId)).toHaveFocus();

      containers[focusedIndex].focus();
      await userEvent.tab({ shift: true });
      expect(document.getElementById(previousId)).toHaveFocus();
    }
  );
});
