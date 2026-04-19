export function renderProjectCard(project) {
  const { id, name, location, units, image } = project;
  const detailsUrl = `../../pages/project-details/index.html?id=${id}`;

  return `
    <a href="${detailsUrl}" class="project-card rounded-lg" data-id="${id}">
      <div class="project-card__image-wrap">
        <div class="project-card__image" style="background-image: url('${image}')"></div>
        ${units ? `<div class="project-card__counter"><span>${units} Properties</span></div>` : ""}
      </div>
      <div class="project-card__details">
        <div class="project-card__title">${name}</div>
        <div class="project-card__footer">
          ${location ? `<div class="project-card__location">${location}</div>` : "<div></div>"}
          <div class="project-card__cta">Explore</div>
        </div>
      </div>
    </a>
  `;
}
