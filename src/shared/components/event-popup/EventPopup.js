import { events } from "../../../data/events.data.js";

const STORAGE_KEY = "event-popup-seen";

/**
 * Pick the event to promote: the soonest upcoming event relative to today,
 * falling back to the first event if none are in the future.
 */
function pickEvent() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = events
    .map((e) => ({ e, d: new Date(e.date) }))
    .filter((x) => !isNaN(x.d.getTime()) && x.d >= today)
    .sort((a, b) => a.d - b.d);

  return (upcoming[0] && upcoming[0].e) || events[0];
}

/**
 * Shows a one-per-session promotional pop-up for an upcoming event.
 * @param {{ delay?: number }} [options] delay in ms before the pop-up appears
 */
export function initEventPopup({ delay = 4200 } = {}) {
  let seen = false;
  try {
    seen = sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch (_) {}
  if (seen) return;

  const event = pickEvent();
  if (!event) return;

  setTimeout(() => showEventPopup(event), delay);
}

function markSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch (_) {}
}

function showEventPopup(event) {
  const detailsUrl = `../event-details/index.html?id=${event.id}`;

  const overlay = document.createElement("div");
  overlay.className = "event-popup-overlay";
  overlay.innerHTML = `
    <div class="event-popup" role="dialog" aria-modal="true" aria-label="${escapeAttr(event.title)}">
      <button class="event-popup__close" type="button" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <a class="event-popup__media" href="${detailsUrl}" aria-label="${escapeAttr(event.title)}">
        <img src="${event.image}" alt="${escapeAttr(event.title)}" />
      </a>

      <div class="event-popup__body">
        <span class="event-popup__eyebrow">Upcoming Event</span>
        ${event.category ? `<span class="event-popup__category">${escapeHtml(event.category)}</span>` : ""}
        <h2 class="event-popup__title">
          <a href="${detailsUrl}">${escapeHtml(event.title)}</a>
        </h2>

        <ul class="event-popup__meta">
          ${event.date ? metaRow(calendarIcon, event.date) : ""}
          ${event.time ? metaRow(clockIcon, event.time) : ""}
          ${event.location ? metaRow(pinIcon, event.location) : ""}
        </ul>

        ${event.description ? `<p class="event-popup__desc">${escapeHtml(event.description)}</p>` : ""}

        <div class="event-popup__actions">
          <a class="event-popup__cta" href="${detailsUrl}">
            <span>View Event</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <button class="event-popup__dismiss" type="button">Maybe later</button>
        </div>
      </div>
    </div>
  `;

  const close = () => {
    overlay.classList.remove("event-popup-overlay--visible");
    overlay.addEventListener(
      "transitionend",
      () => {
        overlay.remove();
        document.body.style.overflow = "";
      },
      { once: true },
    );
    document.removeEventListener("keydown", onEsc);
  };

  const onEsc = (e) => {
    if (e.key === "Escape") close();
  };

  overlay.querySelector(".event-popup__close").addEventListener("click", close);
  overlay.querySelector(".event-popup__dismiss").addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", onEsc);

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
  markSeen();
  requestAnimationFrame(() =>
    overlay.classList.add("event-popup-overlay--visible"),
  );
}

/* ── Helpers ─────────────────────────────────────────────────────── */
const calendarIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
const clockIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
const pinIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

function metaRow(icon, text) {
  return `<li class="event-popup__meta-item">${icon}<span>${escapeHtml(text)}</span></li>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(str) {
  return escapeHtml(str);
}
