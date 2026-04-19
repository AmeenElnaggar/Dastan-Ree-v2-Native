import { projects } from "../../data/projects.data.js";
import { renderProjectCard } from "../components/project-card/ProjectCard.js";

export function initFeaturedSlider(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  const featured = projects.filter((p) => p.featured).slice(0, 6);

  root.innerHTML = `
    <div class="properties-slider-container">
      <div class="swiper featured-swiper">
        <div class="swiper-wrapper">
          ${featured.map((p) => `<div class="swiper-slide">${renderProjectCard(p)}</div>`).join("")}
        </div>
      </div>
      <button class="properties-arrow properties-arrow--prev" aria-label="Previous">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="properties-arrow properties-arrow--next" aria-label="Next">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  `;

  const prevBtn = root.querySelector(".properties-arrow--prev");
  const nextBtn = root.querySelector(".properties-arrow--next");

  function updateArrows(sw) {
    prevBtn.classList.toggle("properties-arrow--hidden", sw.isBeginning);
    nextBtn.classList.toggle("properties-arrow--hidden", sw.isEnd);
  }

  const swiper = new Swiper(root.querySelector(".featured-swiper"), {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: false,
    on: {
      init(sw) {
        updateArrows(sw);
      },
      slideChange(sw) {
        updateArrows(sw);
      },
    },
  });

  prevBtn.addEventListener("click", () => swiper.slidePrev());
  nextBtn.addEventListener("click", () => swiper.slideNext());
}
