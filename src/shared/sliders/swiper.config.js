/** @type {import('swiper').SwiperOptions} */
export const HERO_SLIDER_CONFIG = {
  loop: true,
  autoplay: { delay: 5000, disableOnInteraction: false },
  effect: 'fade',
  fadeEffect: { crossFade: true },
  allowTouchMove: false,
  speed: 1200,
};

/** @type {import('swiper').SwiperOptions} */
export const FEATURED_SLIDER_CONFIG = {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  autoplay: { delay: 4000, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  breakpoints: {
    640:  { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
};

/** @type {import('swiper').SwiperOptions} */
export const RELATED_SLIDER_CONFIG = {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: false,
  navigation: { nextEl: '.related-swiper-next', prevEl: '.related-swiper-prev' },
  breakpoints: {
    640:  { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
};
