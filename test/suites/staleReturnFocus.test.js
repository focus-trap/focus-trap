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
