import { projects } from "../../data/projects.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderProjectCard } from "../../shared/components/project-card/ProjectCard.js";
import { initFeaturedSlider } from "../../shared/sliders/FeaturedSlider.js";
import { initHeroSlider } from "../../shared/sliders/HeroSlider.js";

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root", { transparent: true });
  renderFooter("#footer-root");
  initHeroSlider("#hero-slider-root");
  initFeaturedSlider("#featured-slider-root");
  initPropertiesSlider("#properties-slider-root");
});

function initPropertiesSlider(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  const latest = projects.slice(0, 8);

  root.innerHTML = `
    <div class="properties-slider-container">
      <div class="swiper properties-swiper">
        <div class="swiper-wrapper">
          ${latest.map((p) => `<div class="swiper-slide">${renderProjectCard(p)}</div>`).join("")}
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

  const swiper = new Swiper(root.querySelector(".properties-swiper"), {
    slidesPerView: 3.5,
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
