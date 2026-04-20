export function renderProjectCard(project) {
  const { id, name, location, developer, developerLogo, units, type, image } =
    project;
  const detailsUrl = `../../pages/project-details/index.html?id=${id}`;
  const typeLabel = type || "Residential";

  const badgeHtml = developerLogo
    ? `<div class="project-card__badge">
        <img src="${developerLogo}" alt="${developer}" class="project-card__badge-logo" />
       </div>`
    : developer
      ? `<div class="project-card__badge project-card__badge--text">${developer}</div>`
      : "";

  return `
    <a href="${detailsUrl}" class="project-card" data-id="${id}">
      <div class="project-card__media">
        <img src="${image}" alt="${name}" class="project-card__img" loading="lazy" />
        <div class="project-card__overlay"></div>
        ${badgeHtml}
        <div class="project-card__status">${typeLabel}</div>
        <div class="project-card__body">
          <div class="project-card__reveal">
            ${
              location
                ? `<div class="project-card__location">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span class="project-card__location-text">${location}</span>
            </div>`
                : ""
            }
            ${units ? `<div class="project-card__units">${units} Units</div>` : ""}
          </div>
          <div class="project-card__footer">
            <div class="project-card__title">${name}</div>
            <div class="project-card__cta" aria-label="Explore ${name}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  `;
}
