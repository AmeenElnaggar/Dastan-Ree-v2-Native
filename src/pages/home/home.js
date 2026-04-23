import { blogs } from "../../data/blogs.data.js";
import { partners } from "../../data/partners.data.js";
import { properties } from "../../data/properties.data.js";
import { renderBlogCard } from "../../shared/components/blog-card/BlogCard.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderPropertyCard } from "../../shared/components/property-card/PropertyCard.js";
import { initFeaturedSlider } from "../../shared/sliders/FeaturedSlider.js";
import { initHeroSlider } from "../../shared/sliders/HeroSlider.js";
import { renderLocations } from "../../shared/components/locations/Locations.js";
import { initSplash } from "../splash-screen/splash-screen.js";

document.addEventListener("DOMContentLoaded", () => {
  initSplash();
  renderNavbar("#navbar-root", { transparent: true });
  renderFooter("#footer-root");
  initHeroSlider("#hero-slider-root");
  initFeaturedSlider("#featured-slider-root");
  initPartnersSlider("#partners-slider-root");
  initPropertiesSlider("#properties-slider-root");
  renderLocations("#locations-root");
  initBlogsSlider("#blogs-slider-root");

  const fadeObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          fadeObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".fade-up, .why-choose-us__feature").forEach((el) => fadeObs.observe(el));
});

function initPropertiesSlider(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  const latest = properties.slice(0, 8);

  root.innerHTML = `
    <div class="featured-slider-container">
      <div class="swiper properties-swiper">
        <div class="swiper-wrapper">
          ${latest.map((p) => `<div class="swiper-slide">${renderPropertyCard(p)}</div>`).join("")}
        </div>
      </div>
      <div class="featured-slider-controls">
        <button class="featured-arrow featured-arrow--prev" aria-label="Previous slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="featured-pagination">
          <span class="featured-pagination__current">01</span>
          <span class="featured-pagination__sep">/</span>
          <span class="featured-pagination__total">01</span>
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
  const totalEl = root.querySelector(".featured-pagination__total");

  function updateControls(sw) {
    currentEl.textContent = String(sw.snapIndex + 1).padStart(2, "0");
    totalEl.textContent = String(sw.snapGrid.length).padStart(2, "0");
    prevBtn.disabled = sw.isBeginning;
    nextBtn.disabled = sw.isEnd;
  }

  const swiper = new Swiper(root.querySelector(".properties-swiper"), {
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
      breakpoint(sw) {
        updateControls(sw);
      },
    },
  });

  prevBtn.addEventListener("click", () => swiper.slidePrev());
  nextBtn.addEventListener("click", () => swiper.slideNext());
}

function initPartnersSlider(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  root.innerHTML = `
    <div class="partners-slider-container">
      <div class="swiper partners-swiper">
        <div class="swiper-wrapper">
          ${partners
            .map(
              (p) => `
            <div class="swiper-slide">
              <div class="partner-card">
                <div class="partner-card__logo-wrap ">
                  <img
                    src="${p.logo}"
                    alt="${p.alt}"
                    loading="lazy"
                    class="partner-card__logo"
                  />
                </div>
                <p class="partner-card__name">${p.name}</p>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
      <div class="featured-slider-controls">
        <button class="featured-arrow featured-arrow--prev" aria-label="Previous slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="featured-pagination">
          <span class="featured-pagination__current">01</span>
          <span class="featured-pagination__sep">/</span>
          <span class="featured-pagination__total">01</span>
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
  const totalEl = root.querySelector(".featured-pagination__total");

  function updateControls(sw) {
    const totalPages = sw.snapGrid.length;
    currentEl.textContent = String(sw.snapIndex + 1).padStart(2, "0");
    totalEl.textContent = String(totalPages).padStart(2, "0");
    prevBtn.disabled = sw.isBeginning;
    nextBtn.disabled = sw.isEnd;
  }

  const swiper = new Swiper(root.querySelector(".partners-swiper"), {
    slidesPerView: 2,
    spaceBetween: 16,
    loop: false,
    speed: 900,
    autoplay: {
      delay: 2800,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      480: { slidesPerView: 3, spaceBetween: 24 },
      768: { slidesPerView: 4, spaceBetween: 32 },
      1024: { slidesPerView: 5, spaceBetween: 40 },
      1280: { slidesPerView: 7, spaceBetween: 48 },
    },
    on: {
      init(sw) {
        updateControls(sw);
      },
      slideChange(sw) {
        updateControls(sw);
      },
      breakpoint(sw) {
        updateControls(sw);
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
    <div class="featured-slider-container">
      <div class="swiper blogs-swiper">
        <div class="swiper-wrapper">
          ${blogs.map((b) => `<div class="swiper-slide">${renderBlogCard(b)}</div>`).join("")}
        </div>
      </div>
      <div class="featured-slider-controls">
        <button class="featured-arrow featured-arrow--prev" aria-label="Previous slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="featured-pagination">
          <span class="featured-pagination__current">01</span>
          <span class="featured-pagination__sep">/</span>
          <span class="featured-pagination__total">01</span>
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
  const totalEl = root.querySelector(".featured-pagination__total");

  function updateControls(sw) {
    currentEl.textContent = String(sw.snapIndex + 1).padStart(2, "0");
    totalEl.textContent = String(sw.snapGrid.length).padStart(2, "0");
    prevBtn.disabled = sw.isBeginning;
    nextBtn.disabled = sw.isEnd;
  }

  const swiper = new Swiper(root.querySelector(".blogs-swiper"), {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: false,
    watchSlidesProgress: true,
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
      breakpoint(sw) {
        updateControls(sw);
      },
    },
  });

  prevBtn.addEventListener("click", () => swiper.slidePrev());
  nextBtn.addEventListener("click", () => swiper.slideNext());
}
