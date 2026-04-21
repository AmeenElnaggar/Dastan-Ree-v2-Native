export function renderProjectCard(project) {
  const {
    id,
    name,
    location,
    developer,
    developerLogo,
    units,
    type,
    image,
    description,
    shortDescription,
  } = project;
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
    <a href="#"  data-id="${id}">
      <div class="relative w-96 h-[28rem] group cursor-pointer">

  <!-- Main D-shaped card -->
  <div
    class="absolute inset-0 bg-white translate-x-2 -translate-y-2 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
    style="clip-path: polygon(0 0, 70% 0, 100% 12%, 100% 88%, 70% 100%, 0 100%);"
  >

    <!-- Image section -->
    <div class="relative h-3/5 overflow-hidden">

      <img
        src="${image}"
        alt="Luxury Project"
        class="w-full h-full object-cover scale-105 brightness-110 transition-all duration-700 group-hover:scale-100 group-hover:brightness-100"
      />

      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30"></div>

      <!-- Category badge -->
      <div class="absolute top-6 left-6">
        <div
          class="bg-black text-white px-4 py-2 text-sm"
          style="clip-path: polygon(0 0, 90% 0, 100% 30%, 100% 100%, 0 100%);"
        >
          ${typeLabel}
        </div>
      </div>

    </div>

    <!-- Content section -->
    <div class="h-2/5 bg-white p-6 flex flex-col justify-between">

      <div>
        <h3 class="text-black text-2xl mb-3 font-semibold">
          ${name}
        </h3>

        <p class="text-gray-600 text-sm leading-relaxed">
          ${shortDescription}
        </p>
      </div>

      <!-- Arrow indicator -->
      <div class="flex items-center gap-4 text-black transition-all duration-300 group-hover:gap-2">

        <span class="text-sm tracking-wider">
          VIEW PROJECT
        </span>

        <div
          class="w-12 h-[2px] bg-black transition-all duration-300 group-hover:w-8"
          style="clip-path: polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%);"
        ></div>

      </div>

    </div>

  </div>

  <!-- Shadow layer -->
  <div
    class="absolute inset-0 bg-black/10 -z-10"
    style="clip-path: polygon(0 0, 70% 0, 100% 12%, 100% 88%, 70% 100%, 0 100%);"
  ></div>

  <!-- Accent border -->
  <div
    class="absolute inset-0 border-4 border-black/40 pointer-events-none transition-all duration-300 group-hover:border-black/20"
    style="clip-path: polygon(0 0, 70% 0, 100% 12%, 100% 88%, 70% 100%, 0 100%);"
  ></div>

</div>
    </a>
  `;
}
