import { amenities as amenitiesCatalog } from "../../data/amenities.data.js";
import { projects } from "../../data/projects.data.js";
import {
  AMENITY_ICONS,
  getAmenityIcon,
  getFacilityIcon,
  getPurposeIcon,
} from "../../shared/components/amenities/icons.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { openModal } from "../../shared/components/modal/Modal.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderProjectCard } from "../../shared/components/project-card/ProjectCard.js";
import { formatNumber } from "../../utils/format.js";
import { getParam } from "../../utils/router.js";

/* ──────────────────────────────────────────────────────────────────
   Schema notes — supports both new backend fields (snake_case + relations)
   and the existing mock-data shape. See project_fields.txt.
   ────────────────────────────────────────────────────────────────── */

const TYPE_LABEL = {
  apartment: "Apartment",
  villa: "Villa",
  townhouse: "Townhouse",
  penthouse: "Penthouse",
  commercial: "Commercial",
  office: "Office",
  retail: "Retail",
};

const SALE_TYPE_ICONS = {
  cash: "fa-money-bill-wave",
  installment: "fa-credit-card",
  installments: "fa-credit-card",
  mortgage: "fa-handshake",
  "rent-to-own": "fa-key",
};

const PAYMENT_METHOD_ICONS = {
  cash: "fa-money-bill-wave",
  bank: "fa-building-columns",
  cheque: "fa-money-check",
  card: "fa-credit-card",
  installments: "fa-calendar-days",
};

const VIEW_ICONS = {
  sea: "fa-water",
  city: "fa-city",
  garden: "fa-leaf",
  pool: "fa-water-ladder",
  golf: "fa-golf-ball-tee",
  canal: "fa-water",
  desert: "fa-sun",
  marina: "fa-anchor",
};

const capitalize = (s) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/[-_]/g, " ") : "—";

/* For values interpolated into an HTML attribute — a project title or an
   image URL carrying a quote would otherwise break out of the attribute. */
const escapeAttr = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const isAr = () =>
  (document.documentElement.lang || "").toLowerCase().startsWith("ar");

const pick = (obj, ...keys) => {
  for (const k of keys) {
    if (obj == null) continue;
    const v = obj[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
};

/* Localized text: prefer *_ar in RTL mode, *_en otherwise; fall back to plain. */
const txt = (obj, base) => {
  if (!obj) return undefined;
  const arKey = `${base}_ar`;
  const enKey = `${base}_en`;
  if (isAr() && obj[arKey]) return obj[arKey];
  if (obj[enKey]) return obj[enKey];
  if (obj[arKey]) return obj[arKey];
  return obj[base];
};

/* Lookup-list helper: M:N relations come back as an array of objects in the
   real schema; the existing mock data uses an array of strings. */
const labelsFrom = (rel, base = "name") => {
  if (!Array.isArray(rel)) return [];
  return rel
    .map((item) => {
      if (typeof item === "string") return item;
      return txt(item, base) || item.name || item.title || item.label || "";
    })
    .filter(Boolean);
};

/* Media accessors — Spatie collections may serialise as { url } objects or
   arrays of urls; mock data uses plain strings. Normalises to a URL string
   (single) or an array of strings (collection). */
const mediaUrl = (val) => {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (Array.isArray(val)) return val[0] ? mediaUrl(val[0]) : undefined;
  return val.url || val.original_url || val.src || undefined;
};
const mediaUrls = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val.map(mediaUrl).filter(Boolean);
  const single = mediaUrl(val);
  return single ? [single] : [];
};

/* Range formatter: "EGP X – Y" / "X – Y m²" with a "From" fallback. */
const formatRange = (from, to, { prefix = "", suffix = "", fromLabel = "From" } = {}) => {
  const hasFrom = from != null && from !== "";
  const hasTo = to != null && to !== "";
  const fmt = (n) =>
    typeof n === "number" ? formatNumber(n) : formatNumber(Number(n) || 0);
  if (hasFrom && hasTo) return `${prefix}${fmt(from)} – ${fmt(to)}${suffix}`;
  if (hasFrom) return `${fromLabel} ${prefix}${fmt(from)}${suffix}`;
  if (hasTo) return `${prefix}${fmt(to)}${suffix}`;
  return "—";
};

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root");
  renderFooter("#footer-root");

  const id = getParam("id") || projects[0]?.id;
  const project = projects.find((p) => String(p.id) === String(id)) || projects[0];

  if (!project) {
    document.body.innerHTML =
      '<p class="text-center py-20 text-gray-500">Project not found.</p>';
    return;
  }

  renderProject(project);
  initGallerySwipers(project);
  initSimilarSwiper(project);
  initStickyBar();
  bindActions(project);
});

/* ── Top-level render ─────────────────────────────────────────────── */
function renderProject(p) {
  const name = txt(p, "title") || p.name;
  document.title = `${name} — Dastan Real Estate`;

  renderHeroOverlay(p);
  renderOverview(p);
  renderAbout(p);
  renderUnitTypes(p);
  renderFloorPlans(p.floorPlans || []);
  renderAmenities(p);
  renderSaleInfo(p);
  renderVideo(p);
  renderMasterplan(p);
  renderMap(p);
  renderNeighborhood(p);
  renderSidebar(p);

  // Sticky bar
  document.querySelector("#sticky-name").textContent = name;

  const status = pick(p, "status");
  const statusEl = document.querySelector("#sticky-status");
  if (status) {
    statusEl.textContent = status;
    statusEl.hidden = false;
  }

  const isFeatured = pick(p, "is_featured", "featured");
  if (isFeatured) document.querySelector("#sticky-featured").hidden = false;

  document.querySelector("#sticky-location").innerHTML = buildLocationLine(p);

  const priceFrom = pick(p, "price_from", "price");
  const priceTo = pick(p, "price_to");
  document.querySelector("#sticky-price").textContent =
    formatRange(priceFrom, priceTo, { prefix: "EGP ", fromLabel: "From EGP" });

  const areaFrom = pick(p, "area_from", "area");
  const areaTo = pick(p, "area_to");
  const subEl = document.querySelector("#sticky-price-sub");
  if (areaFrom || areaTo) {
    subEl.textContent = formatRange(areaFrom, areaTo, { suffix: " m²" });
  }
}

/* ── Hero Overlay (badge / title / price range / location) ───────── */
function renderHeroOverlay(p) {
  const overlay = document.querySelector("#hero-overlay");
  if (!overlay) return;

  const purposes = labelsFrom(p.purposes || p.purposeTypes);
  const badge =
    pick(p, "status") ||
    purposes[0] ||
    TYPE_LABEL[(p.type || "").toLowerCase()] ||
    capitalize(p.type);

  const name = txt(p, "title") || p.name;
  const delivery = formatDeliveryLine(p);
  const loc = locationLineForHero(p);

  const pin = `<i class="fa-solid fa-location-dot" aria-hidden="true"></i>`;
  const calendar = `<i class="fa-solid fa-calendar-check" aria-hidden="true"></i>`;

  overlay.innerHTML = `
    ${badge ? `<span class="pd-hero__badge">${badge}</span>` : ""}
    <h1 class="pd-hero__title">${name}</h1>
    <div class="pd-hero__meta">
      ${loc ? `<span class="pd-hero__meta-item">${pin}${loc}</span>` : ""}
      ${delivery ? `<span class="pd-hero__meta-item">${calendar}${delivery}</span>` : ""}
    </div>
  `;
}

function formatDeliveryLine(p) {
  const raw = pick(p, "delivery_date", "deliveryDate");
  if (!raw) return "";
  /* If the value is an ISO-ish date string, format it as "Mon YYYY";
     otherwise it's already a human-readable string from legacy data. */
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    const d = new Date(raw);
    if (!isNaN(d.getTime())) {
      return d.toLocaleString("en-US", { month: "long", year: "numeric" });
    }
  }
  return raw;
}

function locationLineForHero(p) {
  const city = txt(p?.city, "name");
  const region = txt(p?.region, "name");
  const country = txt(p?.country, "name");
  const parts = [city, region, country].filter(Boolean);
  return parts.length ? parts.join(", ") : p.location || "";
}

function buildLocationLine(p) {
  const city = txt(p?.city, "name");
  const region = txt(p?.region, "name");
  const fallback = city && region ? `${city}, ${region}` : city || region || p.location || "";
  if (!fallback) return "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="11" height="11"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>${fallback}</span>`;
}

function developerName(p) {
  return txt(p?.developer, "name") || (typeof p?.developer === "string" ? p.developer : undefined);
}

/* ── Overview (short description + key stats) ────────────────────── */
function renderOverview(p) {
  const priceFrom = pick(p, "price_from", "price");
  const priceTo = pick(p, "price_to");
  const areaFrom = pick(p, "area_from", "area");
  const areaTo = pick(p, "area_to");
  const downPayment = pick(p, "down_payment");
  const yearsFrom = pick(p, "number_of_installments_years_from");
  const yearsTo = pick(p, "number_of_installments_years_to");
  const unitTypesCount = pick(p, "unit_types_count");
  const unitTypes = pick(p, "unitTypes", "unit_types", "floorPlans");
  const finishingLabels = labelsFrom(pick(p, "finishingTypes")) || [];
  const finishing = finishingLabels.join(", ") || pick(p, "finishingType");

  const installmentLabel =
    yearsFrom && yearsTo
      ? `${yearsFrom} – ${yearsTo} years`
      : yearsFrom
        ? `${yearsFrom}+ years`
        : yearsTo
          ? `Up to ${yearsTo} years`
          : null;

  /* Short description */
  const descEl = document.querySelector("#overview-desc");
  if (descEl) {
    descEl.textContent =
      txt(p, "short_description") || p.shortDescription || "";
  }

  /* Highlighted price range */
  const priceEl = document.querySelector("#overview-price");
  if (priceEl) {
    if (priceFrom != null || priceTo != null) {
      const amount = formatRange(priceFrom, priceTo, { fromLabel: "" }).trim();
      priceEl.innerHTML = `
        <span class="pd-overview__price-label">
          <i class="fa-solid fa-tag" aria-hidden="true"></i>
          ${priceTo ? "Price Range" : "Starting From"}
        </span>
        <span class="pd-overview__price-value">
          <span class="pd-overview__price-currency">EGP</span>
          ${amount}
        </span>`;
      priceEl.hidden = false;
    } else {
      priceEl.hidden = true;
    }
  }

  /* Stat rows: icon + label on the left, value on the right */
  const stats = [
    { label: "Area", value: formatRange(areaFrom, areaTo, { suffix: " m²" }), icon: "fa-ruler-combined" },
    { label: "Delivery", value: formatDeliveryLine(p) || "—", icon: "fa-calendar-check" },
    { label: "Down Payment", value: downPayment != null ? `${downPayment}%` : "—", icon: "fa-percent" },
    { label: "Installments", value: installmentLabel || "—", icon: "fa-calendar-days" },
    { label: "Status", value: pick(p, "status") || "—", icon: "fa-circle-check" },
    { label: "Developer", value: developerName(p) || "—", icon: "fa-building" },
    {
      label: "Unit Types",
      value:
        unitTypesCount != null
          ? unitTypesCount
          : Array.isArray(unitTypes)
            ? unitTypes.length
            : "—",
      icon: "fa-table-cells",
    },
    { label: "Finishing", value: finishing || "—", icon: "fa-paint-roller" },
  ];

  document.querySelector("#overview-stats").innerHTML = stats
    .map(
      (s) => `
        <div class="pd-overview__stat">
          <span class="pd-overview__stat-label">
            <i class="fa-solid ${s.icon}" aria-hidden="true"></i>
            ${s.label}
          </span>
          <span class="pd-overview__stat-value">${s.value}</span>
        </div>`,
    )
    .join("");
}

/* ── About ────────────────────────────────────────────────────────── */
function renderAbout(p) {
  const description =
    txt(p, "description") || p.description || p.shortDescription || "";
  const textEl = document.querySelector("#about-text");
  const btn = document.querySelector("#about-readmore");
  const labelEl = btn.querySelector(".pd-about__readmore-label");

  /* description_en/_ar may be HTML from a RichEditor — render as HTML if it
     looks like markup, otherwise as plain text. */
  if (/<[a-z][\s\S]*>/i.test(description)) textEl.innerHTML = description;
  else textEl.textContent = description;

  /* Developer card */
  const devName = developerName(p) || "—";
  const devLogo =
    mediaUrl(pick(p?.developer, "logo")) || pick(p, "developerLogo");
  const devLogoHtml = devLogo
    ? `<img src="${devLogo}" alt="${devName}" class="pd-developer-card__logo" loading="lazy" />`
    : `<div class="pd-developer-card__logo pd-developer-card__logo--placeholder"><i class="fa-solid fa-building"></i></div>`;
  document.querySelector("#developer-card").innerHTML = `
    ${devLogoHtml}
    <div class="pd-developer-card__label">Developer</div>
    <div class="pd-developer-card__name">${devName}</div>`;

  /* about_image media slot */
  const aboutImg = mediaUrl(pick(p, "about_image"));
  const aboutImgEl = document.querySelector("#about-image");
  if (aboutImg) {
    aboutImgEl.src = aboutImg;
    aboutImgEl.alt = `${txt(p, "title") || p.name} — overview`;
    aboutImgEl.hidden = false;
  }

  /* Read More toggle when clamped overflow detected */
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

/* ── Unit Types (HasMany) ─────────────────────────────────────────── */
function renderUnitTypes(p) {
  const list = pick(p, "unitTypes", "unit_types") || [];
  const section = document.querySelector("#unittypes-section");
  const grid = document.querySelector("#unittypes-grid");
  if (!Array.isArray(list) || list.length === 0) return;

  grid.innerHTML = list
    .map((u) => {
      const name = txt(u, "name") || u.title || "Unit type";
      const beds = pick(u, "bedrooms");
      const baths = pick(u, "bathrooms");
      const areaFrom = pick(u, "area_from", "area");
      const areaTo = pick(u, "area_to");
      const priceFrom = pick(u, "price_from", "price");
      const priceTo = pick(u, "price_to");
      const img = mediaUrl(pick(u, "featured_image", "image", "floor_plan"));

      const specs = [];
      if (beds != null)
        specs.push(
          `<span class="pd-unittype__spec"><i class="fa-solid fa-bed"></i>${beds === 0 ? "Studio" : `${beds} Beds`}</span>`,
        );
      if (baths != null)
        specs.push(
          `<span class="pd-unittype__spec"><i class="fa-solid fa-bath"></i>${baths} Baths</span>`,
        );
      if (areaFrom || areaTo)
        specs.push(
          `<span class="pd-unittype__spec"><i class="fa-solid fa-ruler-combined"></i>${formatRange(areaFrom, areaTo, { suffix: " m²", fromLabel: "" }).trim()}</span>`,
        );

      const mediaHtml = img
        ? `<div class="pd-unittype__media"><img src="${img}" alt="${name}" loading="lazy"/></div>`
        : `<div class="pd-unittype__media pd-unittype__media--empty"><i class="fa-solid fa-table-cells-large"></i></div>`;

      const priceHtml =
        priceFrom || priceTo
          ? `<div class="pd-unittype__price">
               <span class="pd-unittype__price-label">${priceTo ? "From" : "Starting from"}</span>
               EGP ${formatRange(priceFrom, priceTo, { fromLabel: "" }).trim()}
             </div>`
          : "";

      return `
        <article class="pd-unittype">
          ${mediaHtml}
          <div class="pd-unittype__body">
            <h3 class="pd-unittype__name">${name}</h3>
            ${specs.length ? `<div class="pd-unittype__specs">${specs.join("")}</div>` : ""}
            ${priceHtml}
          </div>
        </article>`;
    })
    .join("");

  section.hidden = false;
}

/* ── Floor Plans (fallback / tabbed) ──────────────────────────────── */
function renderFloorPlans(floorPlans) {
  const section = document.querySelector("#floorplans-section");
  if (!floorPlans.length) {
    section.style.display = "none";
    return;
  }
  /* If unit types are populated, prefer that section and hide floor plans
     to avoid duplication. */
  const unitTypesSection = document.querySelector("#unittypes-section");
  if (unitTypesSection && !unitTypesSection.hidden) {
    section.style.display = "none";
    return;
  }

  const tabsEl = document.querySelector("#floorplan-tabs");
  const imgEl = document.querySelector("#floorplan-active-img");

  const activate = (index) => {
    imgEl.src = floorPlans[index].image;
    imgEl.alt = floorPlans[index].name;
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

  imgEl.src = floorPlans[0].image;
  imgEl.alt = floorPlans[0].name;

  tabsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".pd-floorplan-tab");
    if (!btn) return;
    activate(Number(btn.dataset.index));
  });
}

/* ── Amenities & Features ─────────────────────────────────────────── */
function renderAmenities(p) {
  /* Real schema: p.amenities is an array of objects with name + (optional)
     slug. Mock: p.amenityIds is array of ids referencing amenitiesCatalog. */
  let list = [];
  if (Array.isArray(p.amenities) && p.amenities.length) {
    list = p.amenities.map((a) => ({
      slug: a.slug || a.code,
      name: txt(a, "name") || a.name,
    }));
  } else if (Array.isArray(p.amenityIds)) {
    list = amenitiesCatalog
      .filter((a) => p.amenityIds.includes(a.id))
      .map(({ id, name }) => ({ slug: id, name }));
  }

  const iconFor = (a) =>
    (a.slug && AMENITY_ICONS[a.slug.toLowerCase()]) || getAmenityIcon(a.name);

  document.querySelector("#amenities-grid").innerHTML =
    list
      .map(
        (a) => `
        <div class="pd-amenity-item">
          <i class="fa-solid ${iconFor(a)}" aria-hidden="true"></i>
          <span>${a.name}</span>
        </div>`,
      )
      .join("") || '<p class="text-sm text-gray-400">No amenities listed.</p>';

  renderChipsBlock(
    "#facilities-block",
    "Facilities",
    labelsFrom(p.facilities),
    (f) => getFacilityIcon(f),
  );

  renderChipsBlock(
    "#purposes-block",
    "Purpose",
    labelsFrom(p.purposes || p.purposeTypes),
    (pt) => getPurposeIcon(pt),
  );

  renderChipsBlock(
    "#views-block",
    "Views",
    labelsFrom(p.views),
    (v) => VIEW_ICONS[(v || "").toLowerCase().split(" ")[0]] || "fa-eye",
  );
}

function renderChipsBlock(selector, label, items, iconFn) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (!items.length) {
    el.innerHTML = "";
    return;
  }
  el.innerHTML = `
    <div class="pd-chips-section">
      <div class="pd-chips-label">${label}</div>
      <div class="pd-chips">
        ${items
          .map(
            (it) =>
              `<span class="pd-chip"><i class="fa-solid ${iconFn(it)}" aria-hidden="true"></i>${it}</span>`,
          )
          .join("")}
      </div>
    </div>`;
}

/* ── Sale & Payment ──────────────────────────────────────────────── */
function renderSaleInfo(p) {
  const downPayment = pick(p, "down_payment");
  const yearsFrom = pick(p, "number_of_installments_years_from");
  const yearsTo = pick(p, "number_of_installments_years_to");
  const finishing = labelsFrom(pick(p, "finishingTypes"));
  if (!finishing.length && pick(p, "finishingType")) finishing.push(p.finishingType);
  const saleTypes = labelsFrom(pick(p, "saleTypes"));
  const paymentMethods = labelsFrom(pick(p, "paymentMethods"));

  const hasAny =
    downPayment != null ||
    yearsFrom != null ||
    yearsTo != null ||
    finishing.length ||
    saleTypes.length ||
    paymentMethods.length;
  const section = document.querySelector("#saleinfo-section");
  if (!hasAny) return;

  const stats = [];
  if (downPayment != null)
    stats.push({ label: "Down Payment", value: `${downPayment}%` });
  if (yearsFrom || yearsTo)
    stats.push({
      label: "Installment Plan",
      value:
        yearsFrom && yearsTo
          ? `${yearsFrom} – ${yearsTo} years`
          : `${yearsFrom || yearsTo}+ years`,
    });

  document.querySelector("#payment-summary").innerHTML = stats
    .map(
      (s) => `
      <div class="pd-payment-stat">
        <span class="pd-payment-stat__label">${s.label}</span>
        <span class="pd-payment-stat__value">${s.value}</span>
      </div>`,
    )
    .join("");

  renderChipsBlock(
    "#finishing-block",
    "Finishing",
    finishing,
    () => "fa-paint-roller",
  );
  renderChipsBlock(
    "#saletypes-block",
    "Sale Types",
    saleTypes,
    (s) => SALE_TYPE_ICONS[(s || "").toLowerCase().replace(/\s+/g, "-")] || "fa-tag",
  );
  renderChipsBlock(
    "#paymentmethods-block",
    "Payment Methods",
    paymentMethods,
    (m) =>
      PAYMENT_METHOD_ICONS[(m || "").toLowerCase().split(" ")[0]] || "fa-credit-card",
  );

  section.hidden = false;
}

/* ── Video Tour ──────────────────────────────────────────────────── */
function renderVideo(p) {
  const iframe = pick(p, "video_iframe", "videoIframe", "video");
  if (!iframe) return;
  const section = document.querySelector("#video-section");
  const wrap = document.querySelector("#video-wrap");
  /* If the field stores raw embed HTML, inject it; otherwise treat as a URL. */
  if (/<iframe|<video/i.test(iframe)) wrap.innerHTML = iframe;
  else
    wrap.innerHTML = `<iframe src="${iframe}" title="Project video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  section.hidden = false;
}

/* ── Masterplan ──────────────────────────────────────────────────── */
function renderMasterplan(p) {
  const url = mediaUrl(pick(p, "master_plan")) || pick(p, "masterplanImage");
  const section = document.querySelector("#masterplan-section");
  if (!url) {
    section.style.display = "none";
    return;
  }
  document.querySelector("#masterplan-img").src = url;
}

/* ── Location Map ────────────────────────────────────────────────── */
function renderMap(p) {
  const section = document.querySelector("#map-section");
  const lat = pick(p, "latitude");
  const lng = pick(p, "longitude");
  const mapImg = mediaUrl(pick(p, "map_image"));
  const container = document.querySelector("#project-map");

  if (!lat || !lng) {
    if (mapImg) {
      /* Static map_image fallback when coordinates aren't set. */
      container.innerHTML = `<img src="${mapImg}" alt="Project location" style="width:100%;height:100%;object-fit:cover;display:block;"/>`;
      return;
    }
    section.style.display = "none";
    return;
  }

  const map = L.map("project-map").setView([lat, lng], 15);
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

  const name = txt(p, "title") || p.name;
  const locLine =
    [txt(p?.city, "name"), txt(p?.region, "name")].filter(Boolean).join(", ") ||
    p.location ||
    "";

  L.marker([lat, lng], { icon })
    .addTo(map)
    .bindPopup(`<strong>${name}</strong><br>${locLine}`)
    .openPopup();
}

function renderNeighborhood(p) {
  const facilities = labelsFrom(p.facilities).slice(0, 6);
  const items = facilities.map(
    (f) => `<div class="pd-neighborhood__item">
      <i class="fa-solid ${getFacilityIcon(f)}" aria-hidden="true"></i>
      <span>${f}</span>
    </div>`,
  );

  document.querySelector("#neighborhood-list").innerHTML = `
    <div class="pd-neighborhood__title">Neighborhood Highlights</div>
    ${items.join("") || '<p class="text-sm text-gray-400">No highlights available.</p>'}`;
}

/* ── Sidebar Contact Form ────────────────────────────────────────── */
function renderSidebar(p) {
  const name = txt(p, "title") || p.name;
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
        <textarea class="pd-cform__input pd-cform__textarea" id="cf-message" rows="4" placeholder="I'm interested in ${name}…"></textarea>
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

/* ── Gallery ─────────────────────────────────────────────────────── */
function initGallerySwipers(p) {
  const featured =
    mediaUrl(pick(p, "featured_image")) || pick(p, "image");
  const galleryImages = mediaUrls(pick(p, "gallery")) || [];
  const fallbackImages = Array.isArray(p.images) ? p.images : [];

  const images = [
    ...(featured ? [featured] : []),
    ...galleryImages,
    ...fallbackImages,
  ]
    .map((s) => (typeof s === "string" ? s : mediaUrl(s)))
    .filter(Boolean);
  const unique = [...new Set(images)];

  if (!unique.length) {
    document.querySelector("#pd-hero").style.display = "none";
    return;
  }

  const mainSlides = document.querySelector("#gallery-main-slides");
  const name = txt(p, "title") || p.name;

  /* A real <img> rather than a background image, so the slide is croppable by
     the slider's `aspect-ratio` and the first frame can be prioritised as the
     page's largest paint. */
  mainSlides.innerHTML = unique
    .map(
      (src, i) =>
        `<div class="swiper-slide">
           <div class="pd-hero-slide">
             <img
               class="pd-hero-slide__bg"
               src="${escapeAttr(src)}"
               alt="${escapeAttr(name)} — image ${i + 1}"
               loading="${i === 0 ? "eager" : "lazy"}"
               fetchpriority="${i === 0 ? "high" : "auto"}"
               decoding="async" />
             <div class="pd-hero-slide__gradient" aria-hidden="true"></div>
           </div>
         </div>`,
    )
    .join("");

  const pageTotalEl = document.querySelector("#hero-page-total");
  const pageCurrentEl = document.querySelector("#hero-page-current");
  if (pageTotalEl) pageTotalEl.textContent = String(unique.length).padStart(2, "0");
  if (pageCurrentEl) pageCurrentEl.textContent = "01";

  if (typeof window.Swiper === "undefined") return;

  const isRTL = document.documentElement.dir === "rtl";

  const mainSwiper = new window.Swiper("#gallery-main", {
    spaceBetween: 0,
    slidesPerView: 1,
    speed: 700,
    rtl: isRTL,
    keyboard: { enabled: true },
    loop: unique.length > 1,
    autoplay:
      unique.length > 1
        ? { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }
        : false,
    navigation: {
      nextEl: "#gallery-main-next",
      prevEl: "#gallery-main-prev",
    },
    on: {
      slideChange(sw) {
        if (pageCurrentEl) {
          pageCurrentEl.textContent = String(sw.realIndex + 1).padStart(2, "0");
        }
      },
      click: (swiper, event) => {
        /* Ignore clicks on overlay text, nav arrows, pagination chip,
           and the preview button (which has its own handler below). */
        if (
          event.target.closest(".pd-hero__nav") ||
          event.target.closest(".pd-hero__pagination") ||
          event.target.closest(".pd-hero__overlay") ||
          event.target.closest(".pd-hero__preview")
        )
          return;
        openLightbox(unique, swiper.realIndex, name);
      },
    },
  });

  const previewBtn = document.querySelector("#gallery-main-preview");
  if (previewBtn) {
    previewBtn.addEventListener("click", () => {
      openLightbox(unique, mainSwiper.realIndex, name);
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

/* ── Similar Projects ────────────────────────────────────────────── */
function initSimilarSwiper(current) {
  const others = projects.filter((p) => p.id !== current.id);
  const sameType = others.filter((p) => p.type === current.type);
  const otherType = others.filter((p) => p.type !== current.type);
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
    slide.innerHTML = renderProjectCard(p);
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

/* ── Sticky Bar ──────────────────────────────────────────────────── */
function initStickyBar() {
  const bar = document.querySelector("#propStickyBar");
  const trigger = document.querySelector("#overview-section");
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
      const shareData = { title: document.title, url: window.location.href };
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

/* ── Actions ─────────────────────────────────────────────────────── */
function bindActions(project) {
  document.addEventListener("click", (e) => {
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
