export function renderActionLink(text, href) {
  return `
    <a href="${href}" class="action-link">
      <span class="action-link__text">${text}</span>
      <span class="action-link__line"></span>
    </a>
  `;
}
