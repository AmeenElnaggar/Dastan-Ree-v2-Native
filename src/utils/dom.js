/**
 * Shorthand for document.querySelector — throws if element not found.
 * @param {string} selector
 * @param {Document|Element} [context=document]
 * @returns {Element}
 */
export function qs(selector, context = document) {
  const el = context.querySelector(selector);
  if (!el) throw new Error(`Element not found: "${selector}"`);
  return el;
}

/**
 * Shorthand for document.querySelectorAll.
 * @param {string} selector
 * @param {Document|Element} [context=document]
 * @returns {NodeList}
 */
export function qsa(selector, context = document) {
  return context.querySelectorAll(selector);
}

/**
 * Add one or more event listeners at once.
 * @param {Element|string} target  - Element or CSS selector
 * @param {string} events          - Space-separated event names
 * @param {Function} handler
 */
export function on(target, events, handler) {
  const el = typeof target === 'string' ? qs(target) : target;
  events.split(' ').forEach(evt => el.addEventListener(evt, handler));
}

/**
 * Show a DOM element by removing a hidden class / setting display.
 * @param {Element} el
 */
export function show(el) {
  el.classList.remove('hidden');
}

/**
 * Hide a DOM element.
 * @param {Element} el
 */
export function hide(el) {
  el.classList.add('hidden');
}
