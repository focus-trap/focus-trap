// Vendored from cypress-plugin-tab@1.0.5 (last published release), with the
// ally.js dependency replaced by a small self-contained tab-sequence finder.
//
// Why this is vendored instead of depending on the npm package:
// - cypress-plugin-tab@1.0.5 depends on the unmaintained ally.js, which was
//   blocking eslint/babel upgrades here.
// - cypress-plugin-tab@2.0.0 drops ally.js, but its rewrite of index.js
//   changes .tab()'s chain-following behavior (it now follows real DOM focus
//   through more of the command chain), which silently breaks tests here
//   that rely on 1.0.5's documented quirk: sequence position is computed
//   from the literal chained subject while the key event fires on whatever
//   is really focused. It also shipped an unrelated regression
//   (https://github.com/kuceb/cypress-plugin-tab/issues/67, fix proposed in
//   PR #73, unmerged since 2026-08) - moot here since 1.0.5 never had that
//   bug: it already resolves a cancelled keydown to `doc.activeElement`.
// - So rather than adopt the 2.0.0 rewrite (or wait indefinitely on PR #73,
//   which fixes a bug this file doesn't have), this keeps 1.0.5's exact,
//   already-proven command behavior and only swaps out the one thing that
//   was actually the problem: the ally.js dependency. `getTabSequence` /
//   `isFocusable` in ./utils are a dependency-free replacement, ported from
//   cypress-plugin-tab@2.0.0's own (MIT-licensed) utils.js.
//
// Original work Copyright (c) 2019 Ben Kucera, MIT License.
// https://github.com/kuceb/cypress-plugin-tab/blob/main/LICENSE

const { getTabSequence, isFocusable } = require('./utils');

const { _, Promise } = Cypress;

Cypress.Commands.add(
  'tab',
  { prevSubject: ['optional', 'element'] },
  (subject, opts = {}) => {
    const options = _.defaults({}, opts, {
      shift: false,
    });

    if (subject) {
      return performTab(subject[0], options);
    }

    const win = cy.state('window');
    const activeElement = win.document.activeElement;

    return performTab(activeElement, options);
  }
);

const performTab = (el, options) => {
  const doc = el.ownerDocument;
  const activeElement = doc.activeElement;

  const seq = getTabSequence(doc);
  const index = seq.indexOf(el);

  if (index === -1 && el && !(el === doc.body) && !isFocusable(el)) {
    pluginError(`
      Subject is not a tabbable element
      - Use cy.get(\'body\').tab() if you wish to tab into the first element on the page
      - Use cy.focused().tab() if you wish to tab into the currently active element
    `);
  }

  const newElm = nextItemFromIndex(index, seq, options.shift);

  const simulatedDefault = () => {
    if (newElm && newElm.select) {
      newElm.select();
    }

    return cy.now('focus', cy.$$(newElm));
  };

  return new Promise((resolve) => {
    doc.defaultView.requestAnimationFrame(resolve);
  })
    .then(() => {
      return keydown(
        activeElement,
        options,
        simulatedDefault,
        () => doc.activeElement
      );
    })
    .finally(() => {
      keyup(activeElement, options);
    });
};

const nextItemFromIndex = (i, seq, reverse) => {
  if (reverse) {
    const nextIndex = i <= 0 ? seq.length - 1 : i - 1;

    return seq[nextIndex];
  }

  const nextIndex = i === seq.length - 1 ? 0 : i + 1;

  return seq[nextIndex];
};

const tabKeyEventPartial = {
  key: 'Tab',
  code: 'Tab',
  keyCode: 9,
  which: 9,
  charCode: 0,
};

const fireKeyEvent = (
  type,
  el,
  eventOptionsExtend,
  bubbles = false,
  cancelable = false
) => {
  const win = el.ownerDocument.defaultView;

  const eventInit = _.extend(
    {
      bubbles,
      cancelable,
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
    },
    eventOptionsExtend
  );

  const keyboardEvent = new win.KeyboardEvent(type, eventInit);

  const cancelled = !el.dispatchEvent(keyboardEvent);

  return cancelled;
};

const keydown = (el, options, onSucceed, onCancel) => {
  const eventOptions = _.extend({}, tabKeyEventPartial, {
    shiftKey: options.shift,
  });

  const cancelled = fireKeyEvent('keydown', el, eventOptions, true, true);

  if (cancelled) {
    return onCancel();
  }

  return onSucceed();
};

const keyup = (el, options) => {
  const eventOptions = _.extend({}, tabKeyEventPartial, {
    shiftKey: options.shift,
  });

  return fireKeyEvent('keyup', el, eventOptions, true, false);
};

const pluginError = (mes) => {
  throw new Error(`[cypress-plugin-tab]: ${mes}`);
};
