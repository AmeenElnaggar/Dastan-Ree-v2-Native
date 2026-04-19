/**
 * Format a number as a currency string (AED by default).
 * @param {number} value
 * @param {string} [currency='AED']
 * @param {string} [locale='en-AE']
 * @returns {string}
 */
export function formatPrice(value, currency = 'AED', locale = 'en-AE') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a number with thousands separators.
 * @param {number} value
 * @returns {string}
 */
export function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Truncate a string to a max length with an ellipsis.
 * @param {string} text
 * @param {number} max
 * @returns {string}
 */
export function truncate(text, max = 100) {
  return text.length > max ? text.slice(0, max).trimEnd() + '…' : text;
}
