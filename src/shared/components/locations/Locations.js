import { locations } from "../../../data/locations.data.js";
import { projects } from "../../../data/projects.data.js";
import { properties } from "../../../data/properties.data.js";

const allListings = [...projects, ...properties];

function getCount(searchKey) {
  return allListings.filter((item) =>
    item.location.toLowerCase().includes(searchKey),
  ).length;
}

function locationCard(loc, idx) {
  const count = getCount(loc.searchKey);
  const label = count === 1 ? "Listing" : "Listings";
  return `
    <a href="#" class="location-card${loc.featured ? " location-card--featured" : ""}" data-idx="${idx}">
      <div class="location-card__image-wrap">
        <img src="${loc.image}" alt="${loc.name}" class="location-card__img" loading="lazy" />
        <div class="location-card__overlay"></div>
      </div>
      <div class="location-card__body">
        <span class="location-card__region">${loc.region}</span>
        <h3 class="location-card__name">${loc.name}</h3>
        <div class="location-card__footer">
          <span class="location-card__count">${count} ${label}</span>
          <span class="location-card__explore">
            Explore
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </div>
      </div>
    </a>
  `;
}

export function renderLocations(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  el.innerHTML = `
    <section class="explore-locations py-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="explore-locations__header">
          <div class="explore-locations__heading">
            <span class="explore-locations__eyebrow">Explore by Location</span>
            <h2 class="explore-locations__title">Find Your Perfect Address</h2>
            <p class="explore-locations__subtitle">Browse premium properties across Egypt's most coveted destinations</p>
          </div>
          <a href="#filter-banner-root" class="action-link explore-locations__see-more" data-see-more-locations>
            <span class="action-link__text uppercase">see more</span>
            <span class="action-link__line"></span>
          </a>
        </div>
        <div class="explore-locations__grid">
          ${locations.map(locationCard).join("")}
        </div>
      </div>
    </section>
  `;

  const header = el.querySelector(".explore-locations__header");
  const cards = el.querySelectorAll(".location-card");
  const seeMoreLink = el.querySelector("[data-see-more-locations]");

  if (seeMoreLink) {
    seeMoreLink.addEventListener("click", (e) => {
      e.preventDefault();
      const banner =
        document.querySelector(".filter-banner") ||
        document.getElementById("filter-banner-root");
      const select = document.getElementById("filterLocation");
      if (!banner) return;

      const navbarHeight =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--navbar-height",
          ),
          10,
        ) || 72;
      const gap = 16;
      const top =
        banner.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight -
        gap;

      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });

      if (!select) return;
      const openPicker = () => {
        select.focus({ preventScroll: true });
        if (typeof select.showPicker === "function") {
          try {
            select.showPicker();
          } catch (_) {
            /* unsupported — focus is enough */
          }
        }
      };
      setTimeout(openPicker, 650);
    });
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  obs.observe(header);
  cards.forEach((card) => obs.observe(card));
}
