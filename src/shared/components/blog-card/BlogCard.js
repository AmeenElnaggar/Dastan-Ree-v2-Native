export function renderBlogCard(blog) {
  const { id, title, image, description, date, category } = blog;
  const readTimes = [5, 4, 6, 3, 5, 4];
  const readTime = readTimes[(id - 1) % readTimes.length];
  const [monthFull, dayComma] = date.split(" ");
  const day = dayComma.replace(",", "");
  const month = monthFull.slice(0, 3).toUpperCase();

  return `
    <div class="relative group">

      <!-- Decorative Frame -->
      <div class="absolute inset-0 border border-gray-300 translate-x-2 translate-y-2"></div>

      <!-- Card -->
      <a href="#" class="blog-card relative block transition-all duration-200 group-hover:translate-x-2 group-hover:translate-y-2" data-id="${id}">
        <div class="blog-card__image">
          <img src="${image}" alt="${title}" class="blog-card__img" loading="lazy" />
          <div class="blog-card__overlay"></div>
          <div class="blog-card__date-badge">
            <span class="blog-card__date-day">${day}</span>
            <span class="blog-card__date-month">${month}</span>
          </div>
        </div>
        <div class="blog-card__content">
          <span class="blog-card__category">${category}</span>
          <h3 class="blog-card__title">${title}</h3>
          <p class="blog-card__excerpt">${description}</p>
          <div class="blog-card__footer">
            <div class="blog-card__read-time">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${readTime} min read</span>
            </div>
            <div class="blog-card__cta">
              <span>Read More</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </div>
        </div>
      </a>

      <div class="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gray-400 transition-opacity duration-500 group-hover:opacity-0"></div>

    </div>
  `;
}
