/**
 * Get a URL query parameter value by name.
 * @param {string} name
 * @param {string} [url=window.location.href]
 * @returns {string|null}
 */
export function getParam(name, url = window.location.href) {
  return new URL(url).searchParams.get(name);
}

/**
 * Set one or more query parameters without a full page reload.
 * @param {Record<string, string>} params
 */
export function setParams(params) {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  window.history.replaceState({}, '', url.toString());
}

/**
 * Navigate to a new URL (SPA-style pushState).
 * @param {string} path
 * @param {Record<string, string>} [params={}]
 */
export function navigate(path, params = {}) {
  const url = new URL(path, window.location.origin);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  window.location.href = url.toString();
}
