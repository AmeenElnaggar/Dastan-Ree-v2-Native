import { properties } from "../../data/properties.data.js";
import { blogs } from "../../data/blogs.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderPropertyCard } from "../../shared/components/property-card/PropertyCard.js";
import { renderBlogCard } from "../../shared/components/blog-card/BlogCard.js";
import { initFeaturedSlider } from "../../shared/sliders/FeaturedSlider.js";
import { initHeroSlider } from "../../shared/sliders/HeroSlider.js";

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root", { transparent: true });
  renderFooter("#footer-root");
  initHeroSlider("#hero-slider-root");
  initFeaturedSlider("#featured-slider-root");
  initPropertiesSlider("#properties-slider-root");
  initBlogsSlider("#blogs-slider-root");
});

function initPropertiesSlider(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  const latest = properties.slice(0, 8);

  root.innerHTML = `
    <div class="properties-slider-container">
      <div class="swiper properties-swiper">
        <div class="swiper-wrapper">
          ${latest.map((p) => `<div class="swiper-slide">${renderPropertyCard(p)}</div>`).join("")}
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

function initBlogsSlider(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  root.innerHTML = `
    <div class="blogs-slider-container">
      <div class="swiper blogs-swiper">
        <div class="swiper-wrapper">
          ${blogs.map((b) => `<div class="swiper-slide">${renderBlogCard(b)}</div>`).join("")}
        </div>
      </div>
      <button class="blogs-arrow blogs-arrow--prev" aria-label="Previous">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="blogs-arrow blogs-arrow--next" aria-label="Next">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  `;

  const prevBtn = root.querySelector(".blogs-arrow--prev");
  const nextBtn = root.querySelector(".blogs-arrow--next");

  function updateArrows(sw) {
    prevBtn.classList.toggle("blogs-arrow--hidden", sw.isBeginning);
    nextBtn.classList.toggle("blogs-arrow--hidden", sw.isEnd);
  }

  const swiper = new Swiper(root.querySelector(".blogs-swiper"), {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    on: {
      init(sw) { updateArrows(sw); },
      slideChange(sw) { updateArrows(sw); },
    },
  });

  prevBtn.addEventListener("click", () => swiper.slidePrev());
  nextBtn.addEventListener("click", () => swiper.slideNext());
}
