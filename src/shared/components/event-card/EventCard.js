export function renderEventCard(event) {
  const { id, title, image, description, date, location, category } = event;
  const [monthFull, dayComma] = date.split(" ");
  const day = dayComma.replace(",", "");
  const month = monthFull.slice(0, 3).toUpperCase();
  const detailsUrl = `../../pages/event-details/index.html?id=${id}`;

  return `
    <article class="event-card">
      <a class="event-card__image-wrap" href="${detailsUrl}" aria-label="${title}">
        <img src="${image}" alt="${title}" class="event-card__img" loading="lazy" />
        <div class="event-card__date-badge">
          <span class="event-card__date-day">${day}</span>
          <span class="event-card__date-month">${month}</span>
        </div>
      </a>
      <div class="event-card__body">
        <span class="event-card__category">${category}</span>
        <h3 class="event-card__title">
          <a href="${detailsUrl}" class="event-card__title-link">${title}</a>
        </h3>
        <p class="event-card__excerpt">${description}</p>
        <div class="event-card__footer">
          <div class="event-card__location">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${location}</span>
          </div>
          <a href="${detailsUrl}" class="event-card__cta">
            <span>View Event</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </div>
    </article>
  `;
}
