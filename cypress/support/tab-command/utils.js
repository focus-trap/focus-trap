// Ported from cypress-plugin-tab@2.0.0's utils.js (trimmed to what index.js
// here actually uses - see index.js for why). Original work Copyright (c)
// 2019 Ben Kucera, MIT License.
// https://github.com/kuceb/cypress-plugin-tab/blob/main/LICENSE

const TABBABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button',
  'input',
  'select',
  'textarea',
  'iframe',
  '[tabindex]',
  '[contenteditable]',
  'audio[controls]',
  'video[controls]',
  'summary',
].join(', ');

const getTabSequence = (doc) => {
  const candidates = Array.from(doc.querySelectorAll(TABBABLE_SELECTOR)).filter(
    isTabbable
  );
  const positiveTabIndex = candidates
    .filter((el) => getTabIndex(el) > 0)
    .sort(compareByTabOrder);
  const naturalTabOrder = candidates.filter((el) => getTabIndex(el) === 0);

  return positiveTabIndex.concat(naturalTabOrder);
};

const compareByTabOrder = (left, right) => {
  const tabIndexDiff = getTabIndex(left) - getTabIndex(right);

  if (tabIndexDiff !== 0) {
    return tabIndexDiff;
  }

  const { Node } = left.ownerDocument.defaultView;
  const position = left.compareDocumentPosition(right);

  if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
    return -1;
  }

  if (position & Node.DOCUMENT_POSITION_PRECEDING) {
    return 1;
  }

  return 0;
};

const isFocusable = (el) => {
  if (!el || el.nodeType !== 1) {
    return false;
  }

  if (isDisabled(el) || isHidden(el) || isInert(el)) {
    return false;
  }

  if (getTabIndex(el) >= 0) {
    return true;
  }

  if (typeof el.focus !== 'function') {
    return false;
  }

  const nodeName = el.nodeName.toLowerCase();

  if (nodeName === 'a' || nodeName === 'area') {
    return el.hasAttribute('href');
  }

  if (nodeName === 'input') {
    return el.type !== 'hidden';
  }

  if (nodeName === 'iframe') {
    return true;
  }

  if (nodeName === 'audio' || nodeName === 'video') {
    return el.hasAttribute('controls');
  }

  if (nodeName === 'summary') {
    return true;
  }

  if (
    nodeName === 'button' ||
    nodeName === 'select' ||
    nodeName === 'textarea'
  ) {
    return true;
  }

  return el.hasAttribute('contenteditable');
};

const isTabbable = (el) => {
  if (!isFocusable(el)) {
    return false;
  }

  if (isDisabled(el) || isHidden(el) || isInert(el)) {
    return false;
  }

  return getTabIndex(el) >= 0;
};

const isDisabled = (el) => {
  return 'disabled' in el && Boolean(el.disabled);
};

const isHidden = (el) => {
  if (el.hidden) {
    return true;
  }

  const win = el.ownerDocument.defaultView;
  const style = win.getComputedStyle(el);

  if (style.visibility === 'hidden' || style.display === 'none') {
    return true;
  }

  return el.getClientRects().length === 0;
};

const isInert = (el) => {
  return Boolean(el.closest('[inert]'));
};

const getTabIndex = (el) => {
  return typeof el.tabIndex === 'number' ? el.tabIndex : -1;
};

module.exports = {
  getTabSequence,
  isFocusable,
};
