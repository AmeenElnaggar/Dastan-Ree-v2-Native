import { events } from "../../data/events.data.js";
import { projects } from "../../data/projects.data.js";
import { renderEventCard } from "../../shared/components/event-card/EventCard.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { getParam } from "../../utils/router.js";
import { formatPrice } from "../../utils/format.js";

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root", { transparent: true });
  renderFooter("#footer-root");

  const id = getParam("id");
  const event = events.find((e) => String(e.id) === String(id)) || events[0];

  if (!event) {
    document.querySelector(".bd-body").innerHTML =
      '<p class="bd-empty">Event not found.</p>';
    return;
  }

  renderHero(event);
  renderExcerpt(event);
  const headings = renderArticle(event);
  renderVideo(event);
  renderProject(event);
  renderTOC(headings);
  renderDetails(event);
  renderShareButtons(event);
  renderHost(event);
  renderRelated(event);

  initReadingProgress();
  initTOCActiveTracking(headings);
});

/* ── Hero ────────────────────────────────────────────────────────── */
function renderHero(event) {
  document.title = `${event.title} — Dastan Real Estate`;

  const bg = document.querySelector("#bd-hero-bg");
  if (bg && event.image) bg.style.backgroundImage = `url('${event.image}')`;

  document.querySelector("#bd-breadcrumb-current").textContent = event.title;
  document.querySelector("#bd-title").textContent = event.title;
  document.querySelector("#bd-date").textContent = event.date;

  toggleMeta("#bd-time-item", "#bd-time-div", "#bd-time", event.time);
  toggleMeta("#bd-location-item", "#bd-location-div", "#bd-location", event.location);

  const host = event.host || {};
  const avatarEl = document.querySelector("#bd-host-avatar");
  if (host.avatar) {
    avatarEl.src = host.avatar;
    avatarEl.alt = host.name || "Host";
  } else {
    avatarEl.style.display = "none";
  }
  document.querySelector("#bd-host-name").textContent = host.name || "Dastan Events Team";
}

function toggleMeta(itemSel, divSel, valueSel, value) {
  const item = document.querySelector(itemSel);
  const div = document.querySelector(divSel);
  if (value) {
    document.querySelector(valueSel).textContent = value;
  } else {
    if (item) item.hidden = true;
    if (div) div.hidden = true;
  }
}

/* ── Excerpt ─────────────────────────────────────────────────────── */
function renderExcerpt(event) {
  const el = document.querySelector("#bd-excerpt");
  const text = event.excerpt || event.description || "";
  if (!text) {
    el.hidden = true;
    return;
  }
  el.textContent = text;
}

/* ── Article body (returns the heading list for the TOC) ─────────── */
function renderArticle(event) {
  const root = document.querySelector("#bd-article");
  const content = Array.isArray(event.content) ? event.content : [];

  if (!content.length) {
    root.innerHTML = `<p class="bd-article__paragraph">${event.description || ""}</p>`;
    return [];
  }

  const headings = [];
  const parts = content.map((block, i) => {
    if (block.type === "heading") {
      const slug = slugify(block.text) + "-" + i;
      headings.push({ id: slug, text: block.text });
      return `<h2 class="bd-article__heading" id="${slug}">${escapeHtml(block.text)}</h2>`;
    }
    if (block.type === "quote") {
      return `<blockquote class="bd-article__quote">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7.17 7.5C5.42 8.21 4 10.13 4 12.5V18h6v-7H6.5c0-1.66 1.34-3 3-3l-.33-.5h-2zm10 0c-1.75.71-3.17 2.63-3.17 5V18h6v-7h-3.5c0-1.66 1.34-3 3-3l-.33-.5h-2z"/>
        </svg>
        <p>${escapeHtml(block.text)}</p>
      </blockquote>`;
    }
    if (block.type === "image") {
      return `<figure class="bd-article__figure">
        <img src="${block.src}" alt="${escapeHtml(block.caption || "")}" loading="lazy"/>
        ${block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : ""}
      </figure>`;
    }
    return `<p class="bd-article__paragraph">${escapeHtml(block.text || "")}</p>`;
  });

  root.innerHTML = parts.join("");
  return headings;
}

/* ── Video ───────────────────────────────────────────────────────── */
function renderVideo(event) {
  const section = document.querySelector("#ed-video");
  const iframe = document.querySelector("#ed-video-iframe");
  if (!section || !iframe) return;
  if (!event.video) {
    section.hidden = true;
    return;
  }
  iframe.src = event.video;
  section.hidden = false;
}

/* ── Related Project ─────────────────────────────────────────────── */
function renderProject(event) {
  const section = document.querySelector("#ed-project");
  const card = document.querySelector("#ed-project-card");
  if (!section || !card) return;

  const project = projects.find((p) => p.id === event.projectId);
  if (!project) {
    section.hidden = true;
    return;
  }

  const detailsUrl = `../project-details/index.html?id=${project.id}`;
  const pin = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
  const arrow = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

  const bedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`;
  const bathIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="7" y1="19" x2="7" y2="21"/><line x1="17" y1="19" x2="17" y2="21"/></svg>`;
  const areaIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3z"/><path d="M3 9h6V3"/><path d="M21 15h-6v6"/></svg>`;
  const calIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;

  const specs = [
    project.bedrooms ? { icon: bedIcon, text: `${project.bedrooms} Beds` } : null,
    project.bathrooms ? { icon: bathIcon, text: `${project.bathrooms} Baths` } : null,
    project.area ? { icon: areaIcon, text: `${project.area} m²` } : null,
    project.deliveryDate ? { icon: calIcon, text: project.deliveryDate } : null,
  ].filter(Boolean);

  const specsHtml = specs.length
    ? `<ul class="ed-project-mini__specs">
        ${specs
          .map(
            (s) =>
              `<li class="ed-project-mini__spec">${s.icon}<span>${escapeHtml(s.text)}</span></li>`,
          )
          .join("")}
      </ul>`
    : "";

  const desc = project.shortDescription || project.description || "";

  card.innerHTML = `
    <div class="ed-project-mini">
      <a class="ed-project-mini__media" href="${detailsUrl}" aria-label="${escapeHtml(project.name)}">
        <img src="../${project.image}" alt="${escapeHtml(project.name)}" loading="lazy" />
        ${project.status ? `<span class="ed-project-mini__status">${escapeHtml(project.status)}</span>` : ""}
      </a>
      <div class="ed-project-mini__body">
        ${project.developer ? `<span class="ed-project-mini__developer">${escapeHtml(project.developer)}</span>` : ""}
        <h3 class="ed-project-mini__name">
          <a href="${detailsUrl}">${escapeHtml(project.name)}</a>
        </h3>
        ${project.location ? `<div class="ed-project-mini__location">${pin}<span>${escapeHtml(project.location)}</span></div>` : ""}
        ${desc ? `<p class="ed-project-mini__desc">${escapeHtml(desc)}</p>` : ""}
        ${specsHtml}
        <div class="ed-project-mini__footer">
          ${project.price ? `<div class="ed-project-mini__price"><span>Starting from</span><strong>${formatPrice(project.price)}</strong></div>` : "<div></div>"}
          <a class="ed-project-mini__cta" href="${detailsUrl}">
            <span>See full details</span>${arrow}
          </a>
        </div>
      </div>
    </div>
  `;
  section.hidden = false;
}

/* ── Table of Contents ───────────────────────────────────────────── */
function renderTOC(headings) {
  const block = document.querySelector("#bd-toc-block");
  const list = document.querySelector("#bd-toc-list");
  if (!headings.length) return;

  list.innerHTML = headings
    .map(
      (h) =>
        `<li class="bd-toc__item">
          <a href="#${h.id}" class="bd-toc__link" data-target="${h.id}">${escapeHtml(h.text)}</a>
        </li>`,
    )
    .join("");

  block.hidden = false;

  list.addEventListener("click", (e) => {
    const link = e.target.closest(".bd-toc__link");
    if (!link) return;
    e.preventDefault();
    const target = document.getElementById(link.dataset.target);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  });
}

/* ── Event Details sidebar block ─────────────────────────────────── */
function renderDetails(event) {
  const list = document.querySelector("#ed-details-list");
  if (!list) return;

  const rows = [
    { icon: "fa-regular fa-calendar", label: "Date", value: event.date },
    { icon: "fa-regular fa-clock", label: "Time", value: event.time },
    { icon: "fa-solid fa-location-dot", label: "Location", value: event.location },
  ].filter((r) => r.value);

  list.innerHTML = rows
    .map(
      (r) => `
      <li class="ed-details__row">
        <i class="${r.icon}" aria-hidden="true"></i>
        <div class="ed-details__text">
          <span class="ed-details__label">${r.label}</span>
          <span class="ed-details__value">${escapeHtml(r.value)}</span>
        </div>
      </li>`,
    )
    .join("");
}

/* ── Share Buttons ───────────────────────────────────────────────── */
function renderShareButtons(event) {
  const url = window.location.href;
  const title = event.title;

  const targets = [
    {
      name: "Facebook",
      icon: "fa-brands fa-facebook-f",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "Twitter",
      icon: "fa-brands fa-x-twitter",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "LinkedIn",
      icon: "fa-brands fa-linkedin-in",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: "WhatsApp",
      icon: "fa-brands fa-whatsapp",
      href: `https://wa.me/?text=${encodeURIComponent(title + " — " + url)}`,
    },
  ];

  const buttonsHtml = targets
    .map(
      (t) =>
        `<a href="${t.href}" class="bd-share-btn" target="_blank" rel="noopener" aria-label="Share on ${t.name}">
          <i class="${t.icon}" aria-hidden="true"></i>
        </a>`,
    )
    .join("");

  const copyBtn = `<button class="bd-share-btn bd-share-btn--copy" id="bd-copy-link" type="button" aria-label="Copy link">
    <i class="fa-solid fa-link" aria-hidden="true"></i>
  </button>`;

  const inlineShare = document.querySelector("#bd-share-inline");
  if (inlineShare) inlineShare.innerHTML = buttonsHtml + copyBtn;
  const sidebarShare = document.querySelector("#bd-share-sidebar");
  if (sidebarShare) sidebarShare.innerHTML = buttonsHtml + copyBtn;

  document.querySelectorAll("#bd-copy-link").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(url);
        btn.classList.add("is-copied");
        const original = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check" aria-hidden="true"></i>`;
        setTimeout(() => {
          btn.classList.remove("is-copied");
          btn.innerHTML = original;
        }, 1600);
      } catch (_) {}
    });
  });
}

/* ── Host Card ───────────────────────────────────────────────────── */
function renderHost(event) {
  const host = event.host;
  if (!host || !host.name) return;
  const card = document.querySelector("#bd-host-card");
  const avatar = host.avatar
    ? `<img src="${host.avatar}" alt="${escapeHtml(host.name)}" class="bd-author-card__avatar" loading="lazy"/>`
    : `<div class="bd-author-card__avatar bd-author-card__avatar--placeholder">
        <i class="fa-solid fa-user" aria-hidden="true"></i>
      </div>`;

  card.innerHTML = `
    ${avatar}
    <div class="bd-author-card__body">
      <span class="bd-author-card__label">Your host</span>
      <h3 class="bd-author-card__name">${escapeHtml(host.name)}</h3>
      ${host.role ? `<p class="bd-author-card__role">${escapeHtml(host.role)}</p>` : ""}
      ${host.bio ? `<p class="bd-author-card__bio">${escapeHtml(host.bio)}</p>` : ""}
    </div>
  `;
}

/* ── Related Events ──────────────────────────────────────────────── */
function renderRelated(current) {
  const others = events.filter((e) => e.id !== current.id);
  const sameCategory = others.filter((e) => e.category === current.category);
  const otherCategory = others.filter((e) => e.category !== current.category);
  const related = [...sameCategory, ...otherCategory].slice(0, 3);

  if (!related.length) return;
  const section = document.querySelector("#bd-related-section");
  const grid = document.querySelector("#bd-related-grid");
  grid.innerHTML = related.map((e) => renderEventCard(e)).join("");
  section.hidden = false;
}

/* ── Reading progress bar ────────────────────────────────────────── */
function initReadingProgress() {
  const bar = document.querySelector("#bd-progress");
  const article = document.querySelector(".bd-main");
  if (!bar || !article) return;

  const update = () => {
    const rect = article.getBoundingClientRect();
    const start = window.scrollY + rect.top;
    const end = start + article.offsetHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const pct =
      end > start
        ? Math.max(0, Math.min(1, (scrolled - start) / (end - start)))
        : 0;
    bar.style.width = `${pct * 100}%`;
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ── TOC active section tracking ─────────────────────────────────── */
function initTOCActiveTracking(headings) {
  if (!headings.length) return;
  const links = Array.from(document.querySelectorAll(".bd-toc__link"));
  const targets = headings
    .map((h) => document.getElementById(h.id))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((l) =>
      l.classList.toggle("is-active", l.dataset.target === id),
    );
  };

  const onScroll = () => {
    let activeId = targets[0]?.id;
    const offset = 140;
    for (const t of targets) {
      if (t.getBoundingClientRect().top <= offset) activeId = t.id;
      else break;
    }
    if (activeId) setActive(activeId);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ── Helpers ─────────────────────────────────────────────────────── */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}
