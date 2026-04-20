export function renderBlogCard(blog) {
  const { id, title, image, description, date, category } = blog;

  return `
    <a href="#" class="blog-card" data-id="${id}">
      <div class="blog-card__image">
        <img src="${image}" alt="${title}" class="blog-card__img" loading="lazy" />
        <div class="blog-card__overlay"></div>
        <span class="blog-card__category">${category}</span>
      </div>
      <div class="blog-card__content">
        <div class="blog-card__date">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          ${date}
        </div>
        <h3 class="blog-card__title">${title}</h3>
        <p class="blog-card__excerpt">${description}</p>
        <div class="blog-card__cta">
          <span>Read More</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </div>
      </div>
    </a>
  `;
}
