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
import { renderFilterBanner } from "../../shared/components/filter-banner/FilterBanner.js";

document.addEventListener("DOMContentLoaded", () => {
  initSplash();
  renderNavbar("#navbar-root", { transparent: true });
  renderFooter("#footer-root");
  initHeroSlider("#hero-slider-root");
  renderFilterBanner("#filter-banner-root");
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

function initSplash() {
  const splash = document.getElementById("splash");
  if (!splash) return;

  const layer = document.getElementById("particles");
  const count = 40;
  const W = window.innerWidth;
  const H = window.innerHeight;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    const angle = Math.random() * Math.PI * 2;
    const radius = 200 + Math.random() * Math.min(W, H) * 0.4;
    p.style.left = "50%";
    p.style.top = "50%";
    p.style.setProperty("--sx", Math.cos(angle) * radius + "px");
    p.style.setProperty("--sy", Math.sin(angle) * radius + "px");
    p.style.animationDelay = Math.random() * 1.2 + "s";
    p.style.animationDuration = 2.4 + Math.random() * 1.6 + "s";
    layer.appendChild(p);
  }

  window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("stage").classList.add("is-settled");
    }, 2400);

    setTimeout(() => {
      splash.classList.add("is-leaving");
      splash.addEventListener("transitionend", () => splash.remove(), {
        once: true,
      });
    }, 3500);
  });
}

function initPropertiesSlider(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  const latest = properties.slice(0, 8);

  root.innerHTML = `
    <div class="swiper properties-section__swiper" id="propertiesSwiper">
      <div class="swiper-wrapper">
        ${latest.map((p) => `<div class="swiper-slide">${renderPropertyCard(p)}</div>`).join("")}
      </div>
    </div>
    <div class="properties-section__pagination"></div>
  `;

  new Swiper(root.querySelector(".properties-section__swiper"), {
    slidesPerView: 1.18,
    centeredSlides: true,
    spaceBetween: 18,
    grabCursor: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 0,
    slidesPerGroup: 1,
    watchOverflow: false,
    watchSlidesProgress: true,
    navigation: {
      prevEl: "#propertiesPrev",
      nextEl: "#propertiesNext",
    },
    autoplay: {
      delay: 4200,
      disableOnInteraction: true,
    },
    pagination: {
      el: ".properties-section__pagination",
      clickable: true,
    },
    breakpoints: {
      480: { slidesPerView: 1.35 },
      768: { slidesPerView: 1.95 },
      1024: { slidesPerView: 2.2 },
      1280: { slidesPerView: 3 },
    },
  });
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
