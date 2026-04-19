import { HERO_SLIDER_CONFIG } from './swiper.config.js';
import { HERO_SLIDES } from '../../data/hero-slides.data.js';

/**
 * Initialises the full-screen background image hero slider.
 * @param {string} selector — CSS selector of the container div
 */
export function initHeroSlider(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  root.innerHTML = `
    <div class="swiper hero-swiper">
      <div class="swiper-wrapper">
        ${HERO_SLIDES.map(slide => `
          <div class="swiper-slide hero-slide"
               style="background-image: url('${slide.image}')"
               role="img"
               aria-label="${slide.alt}"></div>
        `).join('')}
      </div>
    </div>
  `;

  new Swiper('.hero-swiper', HERO_SLIDER_CONFIG);
}
