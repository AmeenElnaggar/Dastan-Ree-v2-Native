import { amenities } from "../../data/amenities.data.js";
import { properties } from "../../data/properties.data.js";
import {
  AMENITY_ICONS,
  getFacilityIcon,
  getPurposeIcon,
} from "../../shared/components/amenities/icons.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { openModal } from "../../shared/components/modal/Modal.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderPropertyCard } from "../../shared/components/property-card/PropertyCard.js";
import { formatNumber } from "../../utils/format.js";
import { getParam } from "../../utils/router.js";

const TYPE_LABEL = {
  apartment: "Apartment",
  villa: "Villa",
  commercial: "Commercial",
};

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "—");

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root");
  renderFooter("#footer-root");

  const id = getParam("id") || properties[0]?.id;
  const property = properties.find((p) => p.id === id) || properties[0];

  if (!property) {
    document.body.innerHTML =
      '<p class="text-center py-20 text-gray-500">Property not found.</p>';
    return;
  }

  renderProperty(property);
  initGallerySwipers(property);
  initSimilarSwiper(property);
  initStickyBar();
  bindActions(property);
});

// ── Render ────────────────────────────────────────────────────────

function renderProperty(p) {
  document.title = `${p.name} — Dastan Real Estate`;

  renderIntro(p);
  renderQuickInfo(p);
  renderAbout(p);
  renderAmenities(p);
  renderVideo(p);
  renderTour360(p);
  renderFloorPlans(p.floorPlans || []);
  renderMasterplan(p);
  renderMap(p);
  renderNeighborhood(p);
  renderSidebar(p);

  // Sticky bar values
  document.querySelector("#sticky-name").textContent = p.name;

  const statusEl = document.querySelector("#sticky-status");
  if (p.status) {
    statusEl.textContent = p.status;
    statusEl.hidden = false;
  }

  const featuredEl = document.querySelector("#sticky-featured");
  if (p.featured) featuredEl.hidden = false;

  document.querySelector("#sticky-location").innerHTML = p.location
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="11" height="11"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>${p.location}</span>`
    : "";

  document.querySelector("#sticky-price").textContent =
    `EGP ${formatNumber(p.price)}`;

  const subEl = document.querySelector("#sticky-price-sub");
  if (p.area) {
    subEl.textContent = `EGP ${formatNumber(Math.round(p.price / p.area))} / m²`;
  }
}

function renderIntro(p) {
  document.querySelector("#intro-badge").textContent =
    TYPE_LABEL[p.type] || capitalize(p.type);

  const logo = document.querySelector("#intro-logo");
  if (p.developerLogo) {
    logo.src = p.developerLogo;
    logo.alt = p.developer || "Developer logo";
  } else {
    logo.style.display = "none";
  }

  document.querySelector("#intro-title").textContent = p.name;
  document.querySelector("#intro-desc").textContent = p.shortDescription || "";

  document.querySelector("#intro-location").innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    ${p.location || ""}`;
}

function renderQuickInfo(p) {
  const rows = [
    {
      label: "Payment Method",
      value: p.paymentMethod || "—",
      icon: "fa-credit-card",
    },
    {
      label: "Type",
      value: TYPE_LABEL[p.type] || capitalize(p.type),
      icon: "fa-building",
    },
    {
      label: "Bedrooms",
      value: p.bedrooms != null ? p.bedrooms : "—",
      icon: "fa-bed",
    },
    {
      label: "Bathrooms",
      value: p.bathrooms != null ? p.bathrooms : "—",
      icon: "fa-bath",
    },
    {
      label: "Area",
      value: p.area ? `${p.area} m²` : "—",
      icon: "fa-ruler-combined",
    },
    {
      label: "Delivery",
      value: p.deliveryDate || "—",
      icon: "fa-calendar-check",
    },
    {
      label: "Finishing",
      value: p.finishingType || "—",
      icon: "fa-paint-roller",
    },
    {
      label: "Offering Type",
      value: p.purpose ? `For ${capitalize(p.purpose)}` : "—",
      icon: "fa-handshake",
    },
  ];

  document.querySelector("#quick-info").innerHTML = `
    <div class="pd-quick-info__price">
      <div class="pd-quick-info__price-label">Unit Price</div>
      <div class="pd-quick-info__price-row">
        <span class="pd-quick-info__price-currency">EGP</span>
        <span class="pd-quick-info__price-amount">${formatNumber(p.price)}</span>
      </div>
    </div>
    <div class="pd-quick-info__divider" aria-hidden="true"></div>
    <ul class="pd-quick-info__list">
      ${rows
        .map(
          (r) =>
            `<li class="pd-quick-info__row">
               <span class="pd-quick-info__row-label"><i class="fa-solid ${r.icon}" aria-hidden="true"></i>${r.label}</span>
               <span class="pd-quick-info__row-value">${r.value}</span>
             </li>`,
        )
        .join("")}
    </ul>
    <button class="pd-quick-info__cta" id="quick-info-cta" type="button">
      <i class="fa-regular fa-calendar-check" aria-hidden="true"></i>
      <span>Schedule a Viewing</span>
    </button>`;
}

function renderAbout(p) {
  const description = p.description || p.shortDescription || "";
  const textEl = document.querySelector("#about-text");
  const btn = document.querySelector("#about-readmore");
  const labelEl = btn.querySelector(".pd-about__readmore-label");

  textEl.textContent = description;

  // Developer card
  const devLogoHtml = p.developerLogo
    ? `<img src="${p.developerLogo}" alt="${p.developer || ""}" class="pd-developer-card__logo" loading="lazy" />`
    : `<div class="pd-developer-card__logo pd-developer-card__logo--placeholder"><i class="fa-solid fa-building"></i></div>`;
  document.querySelector("#developer-card").innerHTML = `
    ${devLogoHtml}
    <div class="pd-developer-card__label">Developer</div>
    <div class="pd-developer-card__name">${p.developer || "—"}</div>`;

  // Show Read More button only when text overflows the clamp
  requestAnimationFrame(() => {
    const overflows = textEl.scrollHeight - textEl.clientHeight > 1;
    if (overflows) btn.hidden = false;
  });

  btn.addEventListener("click", () => {
    const expanded = btn.classList.toggle("is-expanded");
    btn.setAttribute("aria-expanded", String(expanded));
    textEl.classList.toggle("is-clamped", !expanded);
    labelEl.textContent = expanded ? "Read Less" : "Read More";
  });
}

function renderAmenities(p) {
  const propAmenities = amenities.filter((a) =>
    (p.amenityIds || []).includes(a.id),
  );

  document.querySelector("#amenities-grid").innerHTML =
    propAmenities
      .map(
        (a) => `
      <div class="pd-amenity-item">
        <i class="fa-solid ${AMENITY_ICONS[a.id] || "fa-star"}" aria-hidden="true"></i>
        <span>${a.name}</span>
      </div>`,
      )
      .join("") || '<p class="text-sm text-gray-400">No amenities listed.</p>';

  const facilBlock = document.querySelector("#facilities-block");
  if (p.facilities && p.facilities.length > 0) {
    facilBlock.innerHTML = `
      <div class="pd-chips-section">
        <div class="pd-chips-label">Facilities</div>
        <div class="pd-chips">
          ${p.facilities
            .map(
              (f) =>
                `<span class="pd-chip"><i class="fa-solid ${getFacilityIcon(f)}" aria-hidden="true"></i>${f}</span>`,
            )
            .join("")}
        </div>
      </div>`;
  }

  const purposeBlock = document.querySelector("#purposes-block");
  if (p.purposeTypes && p.purposeTypes.length > 0) {
    purposeBlock.innerHTML = `
      <div class="pd-chips-section">
        <div class="pd-chips-label">Purpose</div>
        <div class="pd-chips">
          ${p.purposeTypes
            .map(
              (pt) =>
                `<span class="pd-chip"><i class="fa-solid ${getPurposeIcon(pt)}" aria-hidden="true"></i>${pt}</span>`,
            )
            .join("")}
        </div>
      </div>`;
  }
}

function renderFloorPlans(floorPlans) {
  const section = document.querySelector("#floorplans-section");
  if (!floorPlans.length) {
    section.style.display = "none";
    return;
  }

  const tabsEl = document.querySelector("#floorplan-tabs");
  const imgEl = document.querySelector("#floorplan-active-img");
  const pdfEl = document.querySelector("#floorplan-pdf-link");

  const activate = (index) => {
    const fp = floorPlans[index];
    imgEl.src = fp.image;
    imgEl.alt = fp.name;
    if (fp.pdf) {
      pdfEl.href = fp.pdf;
      pdfEl.hidden = false;
    } else {
      pdfEl.removeAttribute("href");
      pdfEl.hidden = true;
    }
    tabsEl
      .querySelectorAll(".pd-floorplan-tab")
      .forEach((t, i) => t.classList.toggle("active", i === index));
  };

  tabsEl.innerHTML = floorPlans
    .map(
      (fp, i) =>
        `<button class="pd-floorplan-tab${i === 0 ? " active" : ""}" data-index="${i}" type="button">${fp.name}</button>`,
    )
    .join("");

  activate(0);

  tabsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".pd-floorplan-tab");
    if (!btn) return;
    activate(Number(btn.dataset.index));
  });
}

function renderVideo(p) {
  const iframe = p.video_iframe || p.videoIframe || p.video;
  if (!iframe) return;
  const section = document.querySelector("#video-section");
  const wrap = document.querySelector("#video-wrap");
  if (/<iframe|<video/i.test(iframe)) wrap.innerHTML = iframe;
  else
    wrap.innerHTML = `<iframe src="${iframe}" title="Property video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  section.hidden = false;
}

function renderTour360(p) {
  const iframe = p.tour360_iframe || p.tour360Iframe || p.tour360;
  if (!iframe) return;
  const section = document.querySelector("#tour360-section");
  const wrap = document.querySelector("#tour360-wrap");
  if (/<iframe/i.test(iframe)) wrap.innerHTML = iframe;
  else
    wrap.innerHTML = `<iframe src="${iframe}" title="360° image tour" loading="lazy" allow="xr-spatial-tracking; gyroscope; accelerometer" allowfullscreen scrolling="no"></iframe>`;
  section.hidden = false;
}

function renderMasterplan(p) {
  const section = document.querySelector("#masterplan-section");
  if (!p.masterplanImage) {
    section.style.display = "none";
    return;
  }
  document.querySelector("#masterplan-img").src = p.masterplanImage;
}

function renderMap(p) {
  const section = document.querySelector("#map-section");
  if (!p.latitude || !p.longitude) {
    section.style.display = "none";
    return;
  }

  const map = L.map("property-map").setView([p.latitude, p.longitude], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const icon = L.divIcon({
    className: "",
    html: `<div class="pd-map-pin"><i class="fa-solid fa-location-dot"></i></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });

  L.marker([p.latitude, p.longitude], { icon })
    .addTo(map)
    .bindPopup(`<strong>${p.name}</strong><br>${p.location}`)
    .openPopup();
}

function renderNeighborhood(p) {
  const items = (p.facilities || []).slice(0, 6).map(
    (f) => `<div class="pd-neighborhood__item">
      <i class="fa-solid ${getFacilityIcon(f)}" aria-hidden="true"></i>
      <span>${f}</span>
    </div>`,
  );

  document.querySelector("#neighborhood-list").innerHTML = `
    <div class="pd-neighborhood__title">Neighborhood Highlights</div>
    ${items.join("") || '<p class="text-sm text-gray-400">No highlights available.</p>'}`;
}

function renderSidebar(p) {
  document.querySelector("#contact-form-card").innerHTML = `
    <div class="pd-cform__title">Get in Touch</div>
    <form class="pd-cform__form" id="sidebar-contact-form" novalidate>
      <div class="pd-cform__field">
        <label class="pd-cform__label" for="cf-name">Full Name</label>
        <input class="pd-cform__input" id="cf-name" type="text" placeholder="Your name" required />
      </div>
      <div class="pd-cform__field">
        <label class="pd-cform__label" for="cf-phone">Phone</label>
        <input class="pd-cform__input" id="cf-phone" type="tel" placeholder="+20 xxx xxx xxxx" />
      </div>
      <div class="pd-cform__field">
        <label class="pd-cform__label" for="cf-message">Message</label>
        <textarea class="pd-cform__input pd-cform__textarea" id="cf-message" rows="4" placeholder="I'm interested in ${p.name}…"></textarea>
      </div>
      <button class="pd-cform__submit" type="submit">Send Enquiry</button>
      <a class="pd-cform__whatsapp" href="https://wa.me/9712019220" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp Us
      </a>
    </form>`;

  document
    .querySelector("#sidebar-contact-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      form.innerHTML =
        '<p class="pd-cform__success">Thank you! We\'ll be in touch shortly.</p>';
    });
}

// ── Sliders ───────────────────────────────────────────────────────

function initGallerySwipers(p) {
  const images =
    p.images && p.images.length ? p.images : p.image ? [p.image] : [];
  if (!images.length) {
    document.querySelector("#pd-gallery-info").style.display = "none";
    return;
  }

  const mainSlides = document.querySelector("#gallery-main-slides");
  const thumbSlides = document.querySelector("#gallery-thumb-slides");

  mainSlides.innerHTML = images
    .map(
      (src, i) =>
        `<div class="swiper-slide">
           <img src="${src}" alt="${p.name} — image ${i + 1}" loading="${i === 0 ? "eager" : "lazy"}" />
         </div>`,
    )
    .join("");

  thumbSlides.innerHTML = images
    .map(
      (src, i) =>
        `<div class="swiper-slide">
           <img src="${src}" alt="${p.name} — thumbnail ${i + 1}" loading="lazy" />
         </div>`,
    )
    .join("");

  if (typeof window.Swiper === "undefined") return;

  const isRTL = document.documentElement.dir === "rtl";

  const thumbsSwiper = new window.Swiper("#gallery-thumbs", {
    spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      0: { slidesPerView: 4, spaceBetween: 8 },
      640: { slidesPerView: 5, spaceBetween: 10 },
    },
  });

  const mainSwiper = new window.Swiper("#gallery-main", {
    spaceBetween: 12,
    slidesPerView: 1,
    speed: 500,
    rtl: isRTL,
    keyboard: { enabled: true },
    loop: images.length > 1,
    navigation: {
      nextEl: "#gallery-main-next",
      prevEl: "#gallery-main-prev",
    },
    thumbs: { swiper: thumbsSwiper },
  });

  const previewBtn = document.querySelector("#gallery-main-preview");
  if (previewBtn) {
    previewBtn.addEventListener("click", () => {
      openLightbox(images, mainSwiper.realIndex, p.name);
    });
  }
}

function openLightbox(images, startIndex, alt = "") {
  let index = Math.max(0, Math.min(startIndex, images.length - 1));

  const overlay = document.createElement("div");
  overlay.className = "pd-lightbox";
  overlay.innerHTML = `
    <button class="pd-lightbox__close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
    <button class="pd-lightbox__nav pd-lightbox__nav--prev" aria-label="Previous image"><i class="fa-solid fa-chevron-left"></i></button>
    <img class="pd-lightbox__img" src="${images[index]}" alt="${alt}" />
    <button class="pd-lightbox__nav pd-lightbox__nav--next" aria-label="Next image"><i class="fa-solid fa-chevron-right"></i></button>
    <span class="pd-lightbox__counter"></span>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";

  const imgEl = overlay.querySelector(".pd-lightbox__img");
  const counter = overlay.querySelector(".pd-lightbox__counter");
  const prevBtn = overlay.querySelector(".pd-lightbox__nav--prev");
  const nextBtn = overlay.querySelector(".pd-lightbox__nav--next");

  if (images.length <= 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    counter.style.display = "none";
  }

  const update = () => {
    imgEl.src = images[index];
    counter.textContent = `${index + 1} / ${images.length}`;
  };
  const go = (delta) => {
    index = (index + delta + images.length) % images.length;
    update();
  };
  const close = () => {
    overlay.classList.remove("pd-lightbox--visible");
    document.removeEventListener("keydown", onKey);
    overlay.addEventListener(
      "transitionend",
      () => {
        overlay.remove();
        document.body.style.overflow = "";
      },
      { once: true },
    );
  };
  const onKey = (e) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  };

  overlay.querySelector(".pd-lightbox__close").addEventListener("click", close);
  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", onKey);

  update();
  requestAnimationFrame(() => overlay.classList.add("pd-lightbox--visible"));
}

function initSimilarSwiper(currentProperty) {
  const others = properties.filter((p) => p.id !== currentProperty.id);
  const sameType = others.filter((p) => p.type === currentProperty.type);
  const otherType = others.filter((p) => p.type !== currentProperty.type);
  const similar = [...sameType, ...otherType].slice(0, 6);

  const section = document.querySelector("#similar-section");
  if (!similar.length) {
    section.style.display = "none";
    return;
  }

  const slidesEl = document.querySelector("#similar-slides");
  similar.forEach((p) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = renderPropertyCard(p);
    slidesEl.appendChild(slide);
  });

  new Swiper("#similar-swiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: similar.length > 3,
    navigation: {
      nextEl: "#similar-next",
      prevEl: "#similar-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
}

// ── Sticky Bar ────────────────────────────────────────────────────

function initStickyBar() {
  const bar = document.querySelector("#propStickyBar");
  const trigger =
    document.querySelector("#pd-gallery-info") ||
    document.querySelector("#pd-intro");
  const progress = document.querySelector("#stickyProgress");
  if (!bar || !trigger) return;

  const NAV_OFFSET = 72;

  const onScroll = () => {
    const rect = trigger.getBoundingClientRect();
    const visible = rect.bottom < NAV_OFFSET;
    bar.classList.toggle("is-visible", visible);
    if (visible) bar.removeAttribute("aria-hidden");
    else bar.setAttribute("aria-hidden", "true");

    if (progress) {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min((scrolled / total) * 100, 100) : 0;
      progress.style.width = `${pct}%`;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const shareBtn = document.querySelector("#stickyShareBtn");
  const saveBtn = document.querySelector("#stickySaveBtn");

  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const shareData = {
        title: document.title,
        url: window.location.href,
      };
      try {
        if (navigator.share) await navigator.share(shareData);
        else {
          await navigator.clipboard.writeText(shareData.url);
          shareBtn.title = "Link copied!";
          setTimeout(() => (shareBtn.title = "Share"), 1500);
        }
      } catch (_) {
        /* user cancelled */
      }
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      saveBtn.classList.toggle("saved");
    });
  }
}

// ── Actions ───────────────────────────────────────────────────────

function openViewingModal(propertyName) {
  openModal({
    title: "Schedule a Viewing",
    content: `
      <form id="viewing-form" class="flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex flex-col flex-1 min-w-0">
            <input id="vf-name" type="text" placeholder="Full Name *" aria-label="Full Name" required class="input" />
          </div>
          <div class="flex flex-col flex-1 min-w-0">
            <input id="vf-email" type="email" placeholder="Email Address *" aria-label="Email Address" required class="input" />
          </div>
        </div>
        <div class="flex flex-col">
          <input id="vf-phone" type="tel" placeholder="Phone Number" aria-label="Phone Number" class="input" />
        </div>
        <div class="pd-meet-types">
          <span class="pd-meet-types__label">Meeting Type</span>
          <div class="pd-meet-tabs" role="tablist">
            <button type="button" class="pd-meet-tab is-active" data-meet="site-visit" aria-pressed="true">
              <i class="fa-solid fa-location-dot" aria-hidden="true"></i><span>Site Visit</span>
            </button>
            <button type="button" class="pd-meet-tab" data-meet="meeting" aria-pressed="false">
              <i class="fa-solid fa-handshake" aria-hidden="true"></i><span>Meeting</span>
            </button>
            <button type="button" class="pd-meet-tab" data-meet="video-call" aria-pressed="false">
              <i class="fa-solid fa-video" aria-hidden="true"></i><span>Video Call</span>
            </button>
          </div>
          <input type="hidden" name="meetType" id="viewing-meet-type" value="site-visit" />
        </div>
        <div class="flex flex-col">
          <input id="vf-date" type="date" aria-label="Preferred Date" class="input" data-placeholder="Preferred Date" />
        </div>
        <div class="flex flex-col">
          <textarea id="vf-notes" placeholder="Additional Notes — any specific requests for ${propertyName}..." aria-label="Additional Notes" rows="3" class="input resize-none"></textarea>
        </div>
        <button type="submit" class="btn-primary">Confirm Viewing Request</button>
      </form>`,
    onOpen: (modal) => {
      const meetTabs = modal.querySelectorAll(".pd-meet-tab");
      const meetInput = modal.querySelector("#viewing-meet-type");
      meetTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          meetTabs.forEach((t) => {
            t.classList.remove("is-active");
            t.setAttribute("aria-pressed", "false");
          });
          tab.classList.add("is-active");
          tab.setAttribute("aria-pressed", "true");
          meetInput.value = tab.dataset.meet;
        });
      });

      // Date inputs ignore `placeholder`, so toggle a class that drives a
      // CSS overlay showing `data-placeholder` while the field is empty.
      const dateInput = modal.querySelector("#vf-date");
      const syncDatePlaceholder = () =>
        dateInput.classList.toggle("has-value", !!dateInput.value);
      dateInput.addEventListener("change", syncDatePlaceholder);
      dateInput.addEventListener("input", syncDatePlaceholder);

      modal.querySelector("#viewing-form").addEventListener("submit", (ev) => {
        ev.preventDefault();
        modal.querySelector("#viewing-form").innerHTML =
          '<p class="text-center text-green-600 font-medium py-6">Your viewing request has been received!<br>Our agent will contact you shortly.</p>';
      });
    },
  });
}

function bindActions(property) {
  document.addEventListener("click", (e) => {
    if (e.target.closest("#quick-info-cta")) {
      openViewingModal(property.name);
    }

    if (e.target.closest("#masterplan-expand-btn")) {
      const src = document.querySelector("#masterplan-img")?.src;
      if (src) {
        openModal({
          title: "Masterplan",
          content: `<img src="${src}" alt="Masterplan" style="width:100%;border-radius:8px;" />`,
        });
      }
    }
  });
}
