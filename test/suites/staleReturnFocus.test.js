import { waitFor } from '@testing-library/dom';
import { createFocusTrap } from '../../index';

const options = {
  tabbableOptions: { displayCheck: 'none' },
  delayInitialFocus: false,
  delayReturnFocus: false,
};

function mount(id, stack, extra = {}) {
  const trigger = document.createElement('button');
  trigger.textContent = `${id} trigger`;
  const container = document.createElement('div');
  const input = document.createElement('input');
  input.value = `${id} draft`;
  container.appendChild(input);
  document.body.append(trigger, container);
  return {
    trigger,
    container,
    input,
    trap: createFocusTrap(container, {
      ...options,
      trapStack: stack,
      ...extra,
    }),
  };
}

const traps = [];
afterEach(() => {
  traps.reverse().forEach((trap) => trap.deactivate({ returnFocus: false }));
  traps.length = 0;
  document.body.innerHTML = '';
});

it.each([false, true])(
  'does not select text after a newer activation (reopen: %s)',
  async (reopen) => {
    let finish;
    const onPostDeactivate = jest.fn();
    const stack = [];
    const first = mount('first', stack, {
      checkCanReturnFocus: () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
      onPostDeactivate,
    });
    const next = reopen ? first : mount('next', stack);
    traps.push(first.trap);
    if (!reopen) traps.push(next.trap);
    first.trigger.focus();
    first.trap.activate();
    first.trap.deactivate();
    next.trigger.focus();
    next.trap.activate();
    next.input.setSelectionRange(
      next.input.value.length,
      next.input.value.length
    );
    finish();
    await waitFor(() => expect(onPostDeactivate).toHaveBeenCalledTimes(1));
    expect(next.input).toHaveFocus();
    expect(next.input.selectionStart).toBe(next.input.value.length);
    expect(next.input.selectionEnd).toBe(next.input.value.length);
  }
);

it('keeps a configured nested return target when the parent resumes', async () => {
  let finish;
  const stack = [];
  const parent = mount('parent', stack);
  const returnTarget = document.createElement('button');
  parent.container.appendChild(returnTarget);
  const child = mount('child', stack, {
    setReturnFocus: returnTarget,
    checkCanReturnFocus: () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
  });
  traps.push(parent.trap, child.trap);
  parent.trigger.focus();
  parent.trap.activate();
  child.trap.activate();
  child.trap.deactivate();
  finish();
  await waitFor(() => expect(returnTarget).toHaveFocus());
});

it('does not replay a pending return after a newer trap opens and closes', async () => {
  let finish;
  const onPostDeactivate = jest.fn();
  const stack = [];
  const first = mount('first', stack, {
    checkCanReturnFocus: () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
    onPostDeactivate,
  });
  const next = mount('next', stack);
  traps.push(first.trap, next.trap);
  first.trigger.focus();
  first.trap.activate();
  first.trap.deactivate();
  next.trigger.focus();
  next.trap.activate();
  next.trap.deactivate();
  expect(next.trigger).toHaveFocus();
  finish();
  await waitFor(() => expect(onPostDeactivate).toHaveBeenCalledTimes(1));
  expect(next.trigger).toHaveFocus();
});

it('does not replay the default delayed return after a newer activation', async () => {
  const stack = [];
  const onPostDeactivate = jest.fn();
  const first = mount('first', stack, {
    delayReturnFocus: true,
    onPostDeactivate,
  });
  const next = mount('next', stack);
  traps.push(first.trap, next.trap);
  first.trigger.focus();
  first.trap.activate();
  first.trap.deactivate();
  next.trigger.focus();
  next.trap.activate();
  next.input.setSelectionRange(
    next.input.value.length,
    next.input.value.length
  );
  await waitFor(() => expect(onPostDeactivate).toHaveBeenCalledTimes(1));
  expect(next.input).toHaveFocus();
  expect(next.input.selectionStart).toBe(next.input.value.length);
});

it('returns focus normally after an asynchronous check rejects', async () => {
  let reject;
  const onPostDeactivate = jest.fn();
  const first = mount('first', [], {
    checkCanReturnFocus: () =>
      new Promise((resolve, rejectPromise) => {
        reject = rejectPromise;
      }),
    onPostDeactivate,
  });
  traps.push(first.trap);
  first.trigger.focus();
  first.trap.activate();
  first.trap.deactivate();
  reject();
  await waitFor(() => expect(onPostDeactivate).toHaveBeenCalledTimes(1));
  expect(first.trigger).toHaveFocus();
});

function deferred() {
  let resolve;
  const promise = new Promise((finish) => {
    resolve = finish;
  });
  return { promise, resolve };
}

it('skips return while a newer activation is still awaiting permission', async () => {
  const returning = deferred();
  const activating = deferred();
  const onPostDeactivate = jest.fn();
  const stack = [];
  const first = mount('first', stack, {
    checkCanReturnFocus: () => returning.promise,
    onPostDeactivate,
  });
  const next = mount('next', stack, {
    checkCanFocusTrap: () => activating.promise,
  });
  traps.push(first.trap, next.trap);
  first.trigger.focus();
  first.trap.activate();
  first.trap.deactivate();
  next.trigger.focus();
  const oldFocus = jest.fn();
  first.trigger.addEventListener('focus', oldFocus);
  next.trap.activate();
  returning.resolve();
  await waitFor(() => expect(onPostDeactivate).toHaveBeenCalledTimes(1));
  expect(oldFocus).not.toHaveBeenCalled();
  expect(next.trigger).toHaveFocus();
  activating.resolve();
  await waitFor(() => expect(next.input).toHaveFocus());
});

it('never focuses the old target when parent unpause opens a third trap', async () => {
  const returning = deferred();
  const stack = [];
  const third = mount('third', stack);
  const parent = mount('parent', stack, {
    onPostUnpause: () => {
      third.trap.activate();
      third.input.setSelectionRange(3, 3);
    },
  });
  const returnTarget = document.createElement('button');
  parent.container.appendChild(returnTarget);
  const onPostDeactivate = jest.fn();
  const child = mount('child', stack, {
    setReturnFocus: returnTarget,
    checkCanReturnFocus: () => returning.promise,
    onPostDeactivate,
  });
  traps.push(parent.trap, child.trap, third.trap);
  parent.trap.activate();
  child.trap.activate();
  const oldFocus = jest.fn();
  returnTarget.addEventListener('focus', oldFocus);
  child.trap.deactivate();
  expect(third.input).toHaveFocus();
  returning.resolve();
  await waitFor(() => expect(onPostDeactivate).toHaveBeenCalledTimes(1));
  expect(oldFocus).not.toHaveBeenCalled();
  expect(third.input).toHaveFocus();
  expect(third.input.selectionStart).toBe(3);
  expect(third.input.selectionEnd).toBe(3);
  // Do not reactivate third during cleanup when parent resumes again.
  parent.trap.deactivate({ returnFocus: false });
});

it('supersedes returns across separate stacks in the same document', async () => {
  const returning = deferred();
  const onPostDeactivate = jest.fn();
  const first = mount('first', [], {
    checkCanReturnFocus: () => returning.promise,
    onPostDeactivate,
  });
  const next = mount('next', []);
  traps.push(first.trap, next.trap);
  first.trigger.focus();
  first.trap.activate();
  first.trap.deactivate();
  const oldFocus = jest.fn();
  first.trigger.addEventListener('focus', oldFocus);
  next.trap.activate();
  next.input.setSelectionRange(3, 3);
  returning.resolve();
  await waitFor(() => expect(onPostDeactivate).toHaveBeenCalledTimes(1));
  expect(oldFocus).not.toHaveBeenCalled();
  expect(next.input).toHaveFocus();
  expect(next.input.selectionStart).toBe(3);
  expect(next.input.selectionEnd).toBe(3);
});

it('skips an old return after the same trap reopens and closes again', async () => {
  const returning = deferred();
  const onPostDeactivate = jest.fn();
  const first = mount('first', [], {
    checkCanReturnFocus: () => returning.promise,
    onPostDeactivate,
  });
  traps.push(first.trap);
  first.trigger.focus();
  first.trap.activate();
  first.trap.deactivate();
  first.trap.activate();
  first.trap.deactivate({ returnFocus: false });
  const oldFocus = jest.fn();
  first.trigger.addEventListener('focus', oldFocus);
  returning.resolve();
  await waitFor(() => expect(onPostDeactivate).toHaveBeenCalledTimes(2));
  expect(oldFocus).not.toHaveBeenCalled();
  expect(first.input).toHaveFocus();
});

it('supersedes a pending return when another trap is publicly unpaused', async () => {
  const returning = deferred();
  const onPostDeactivate = jest.fn();
  const next = mount('next', []);
  const first = mount('first', [], {
    checkCanReturnFocus: () => returning.promise,
    onPostDeactivate,
  });
  traps.push(first.trap, next.trap);
  next.trap.activate();
  next.trap.pause();
  first.trigger.focus();
  first.trap.activate();
  first.trap.deactivate();
  next.trap.unpause();
  next.input.setSelectionRange(3, 3);
  const oldFocus = jest.fn();
  first.trigger.addEventListener('focus', oldFocus);
  returning.resolve();
  await waitFor(() => expect(onPostDeactivate).toHaveBeenCalledTimes(1));
  expect(oldFocus).not.toHaveBeenCalled();
  expect(next.input.selectionStart).toBe(3);
  expect(next.input.selectionEnd).toBe(3);
});

it('does not invalidate a return because a trap activates in another document', async () => {
  const returning = deferred();
  const onPostDeactivate = jest.fn();
  const first = mount('first', [], {
    checkCanReturnFocus: () => returning.promise,
    onPostDeactivate,
  });
  const iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument;
  const container = doc.createElement('div');
  container.appendChild(doc.createElement('input'));
  doc.body.appendChild(container);
  const next = createFocusTrap(container, {
    ...options,
    document: doc,
    trapStack: [],
  });
  traps.push(first.trap, next);
  first.trigger.focus();
  first.trap.activate();
  first.trap.deactivate();
  next.activate();
  returning.resolve();
  await waitFor(() => expect(onPostDeactivate).toHaveBeenCalledTimes(1));
  expect(first.trigger).toHaveFocus();
});

it.each([false, true])(
  'preserves a newer trap opened by setReturnFocus (delayed: %s)',
  async (delayReturnFocus) => {
    const stack = [];
    const next = mount('resolver-next', stack);
    const onPostDeactivate = jest.fn();
    const first = mount('resolver-first', stack, {
      delayReturnFocus,
      onPostDeactivate,
      setReturnFocus: (trigger) => {
        next.trap.activate();
        next.input.setSelectionRange(4, 4);
        return trigger;
      },
    });
    traps.push(first.trap, next.trap);
    first.trigger.focus();
    first.trap.activate();
    const oldFocus = jest.spyOn(first.trigger, 'focus');
    first.trap.deactivate();
    await waitFor(() => expect(onPostDeactivate).toHaveBeenCalledTimes(1));
    expect(oldFocus).not.toHaveBeenCalled();
    expect(next.input).toHaveFocus();
    expect(next.input.selectionStart).toBe(4);
    expect(next.input.selectionEnd).toBe(4);
  }
);

it('does not invoke a return resolver after its delayed return was superseded', async () => {
  const stack = [];
  const resolver = jest.fn((trigger) => trigger);
  const onPostDeactivate = jest.fn();
  const first = mount('stale-resolver', stack, {
    delayReturnFocus: true,
    setReturnFocus: resolver,
    onPostDeactivate,
  });
  const next = mount('new-owner', stack);
  traps.push(first.trap, next.trap);
  first.trigger.focus();
  first.trap.activate();
  first.trap.deactivate();
  next.trap.activate();
  await waitFor(() => expect(onPostDeactivate).toHaveBeenCalledTimes(1));
  expect(resolver).not.toHaveBeenCalled();
  expect(next.input).toHaveFocus();
});
