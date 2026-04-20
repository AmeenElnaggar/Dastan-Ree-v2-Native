import { projects } from "../../data/projects.data.js";
import { renderProjectCard } from "../components/project-card/ProjectCard.js";

export function initFeaturedSlider(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const total = featured.length;

  root.innerHTML = `
    <div class="featured-slider-container">
      <div class="swiper featured-swiper">
        <div class="swiper-wrapper">
          ${featured.map((p) => `<div class="swiper-slide">${renderProjectCard(p)}</div>`).join("")}
        </div>
      </div>
      <div class="featured-slider-controls">
        <button class="featured-arrow featured-arrow--prev" aria-label="Previous slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="featured-pagination">
          <span class="featured-pagination__current">01</span>
          <span class="featured-pagination__sep">/</span>
          <span class="featured-pagination__total">${String(total).padStart(2, "0")}</span>
        </div>
        <button class="featured-arrow featured-arrow--next" aria-label="Next slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  `;

  const prevBtn = root.querySelector(".featured-arrow--prev");
  const nextBtn = root.querySelector(".featured-arrow--next");
  const currentEl = root.querySelector(".featured-pagination__current");

  function updateControls(sw) {
    currentEl.textContent = String(sw.realIndex + 1).padStart(2, "0");
    prevBtn.disabled = sw.isBeginning;
    nextBtn.disabled = sw.isEnd;
  }

  const swiper = new Swiper(root.querySelector(".featured-swiper"), {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: false,
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 24 },
      1024: { slidesPerView: 3, spaceBetween: 32 },
    },
    on: {
      init(sw) {
        updateControls(sw);
      },
      slideChange(sw) {
        updateControls(sw);
      },
    },
  });

  prevBtn.addEventListener("click", () => swiper.slidePrev());
  nextBtn.addEventListener("click", () => swiper.slideNext());
}
