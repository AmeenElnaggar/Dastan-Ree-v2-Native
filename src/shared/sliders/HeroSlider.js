import { projects } from "../../data/projects.data.js";

const AUTOPLAY_DELAY = 6000;

export function initHeroSlider(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  const featured = projects.filter((p) => p.featured);
  if (!featured.length) return;

  const totalLabel = String(featured.length).padStart(2, "0");

  root.innerHTML = buildHTML(featured, totalLabel);

  const swiperEl = root.querySelector(".hero-slider__main-swiper");
  const prevBtn = root.querySelector(".hero-slider__nav-btn--prev");
  const nextBtn = root.querySelector(".hero-slider__nav-btn--next");
  const thumbBtns = root.querySelectorAll(".hero-thumb");
  const pageCurrent = root.querySelector(".hero-slider__page-current");

  const swiper = new Swiper(swiperEl, {
    loop: true,
    speed: 1100,
    autoplay: {
      delay: AUTOPLAY_DELAY,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    on: {
      slideChange(sw) {
        const idx = sw.realIndex;
        updateThumbs(idx);
        pageCurrent.textContent = String(idx + 1).padStart(2, "0");
        restartBottom(featured[idx]);
      },
    },
  });

  prevBtn.addEventListener("click", () => swiper.slidePrev());
  nextBtn.addEventListener("click", () => swiper.slideNext());
  thumbBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => swiper.slideToLoop(i, 800));
  });

  function updateThumbs(idx) {
    thumbBtns.forEach((btn, i) => {
      btn.classList.toggle("hero-thumb--active", i === idx);
      btn.setAttribute("aria-selected", String(i === idx));
    });
  }

  function restartBottom(project) {
    const infoLeft = root.querySelector(".hero-slider__info-left");
    if (!infoLeft) return;

    const parent = infoLeft.parentNode;
    const nextSibling = infoLeft.nextSibling;
    parent.removeChild(infoLeft);

    setTimeout(() => {
      infoLeft.querySelector(".hero-slider__info-meta").innerHTML =
        `<i class="fas fa-calendar-alt" aria-hidden="true"></i> Completion ${project.year}`;
      infoLeft.querySelector(".hero-slider__info-desc").textContent =
        project.description;
      infoLeft.querySelector(".hero-slider__cta-link").href = `#`;

      if (nextSibling) {
        parent.insertBefore(infoLeft, nextSibling);
      } else {
        parent.appendChild(infoLeft);
      }
    }, 20);
  }
}

function buildHTML(featured, totalLabel) {
  const first = featured[0];
  return `
    <section class="hero-slider" aria-label="Featured projects slider">

      <div class="hero-slider__stage">
        <div class="swiper hero-slider__main-swiper">
          <div class="swiper-wrapper">
            ${featured
              .map(
                (p) => `
              <div class="swiper-slide">
                <div class="hero-slide" aria-label="${p.name}">
                  <div class="hero-slide__bg" style="background-image:url('${p.images[0]}')"></div>
                  <div class="hero-slide__gradient" aria-hidden="true"></div>
                  <div class="hero-slide__content">
                    <div class="container">
                      <div class="hero-slide__inner">
                        <p class="hero-slide__eyebrow">
                          <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                          ${p.location}
                        </p>
                        <h2 class="hero-slide__title">${p.name}</h2>
                        <p class="hero-slide__developer">
                          <i class="fas fa-building" aria-hidden="true"></i>
                          ${p.developer ?? ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>

      <button class="hero-slider__nav-btn hero-slider__nav-btn--prev" aria-label="Previous slide" type="button">
        <i class="fas fa-arrow-left" aria-hidden="true"></i>
      </button>
      <button class="hero-slider__nav-btn hero-slider__nav-btn--next" aria-label="Next slide" type="button">
        <i class="fas fa-arrow-right" aria-hidden="true"></i>
      </button>

      <div class="hero-slider__bottom" aria-label="Slider controls">

        <div class="hero-slider__thumbs-wrap">
          <div class="container">
            <div class="hero-slider__thumbs-row" role="tablist" aria-label="Project thumbnails">
              ${featured
                .map(
                  (p, i) => `
                <button
                  class="hero-thumb${i === 0 ? " hero-thumb--active" : ""}"
                  style="background-image:url('${p.images[0]}')"
                  role="tab"
                  aria-selected="${i === 0}"
                  aria-label="${p.name}"
                  type="button"
                >
                  <div class="hero-thumb__overlay" aria-hidden="true"></div>
                </button>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>

        <div class="hero-slider__info-row">
          <div class="hero-slider__info-left">
            <span class="hero-slider__info-meta">
              <i class="fas fa-calendar-alt" aria-hidden="true"></i>
              Completion ${first.year}
            </span>
            <div class="hero-slider__desc-row">
              <p class="hero-slider__info-desc">${first.description}</p>
              <a href="#" class="hero-slider__cta-link">
                <span class="hero-slider__cta-text">VIEW DETAILS</span>
                <span class="hero-slider__cta-line" aria-hidden="true"></span>
              </a>
            </div>
          </div>
          <div class="hero-slider__pagination" aria-label="Slide pagination">
            <span class="hero-slider__page-current">01</span>
            <span class="hero-slider__page-sep" aria-hidden="true">/</span>
            <span class="hero-slider__page-total">${totalLabel}</span>
          </div>
        </div>

      </div>

    </section>
  `;
}
