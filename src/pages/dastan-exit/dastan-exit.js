import { exitListings, exitMath } from "../../data/exit-listings.data.js";
import { renderCta } from "../../shared/components/cta/Cta.js";
import {
  renderExitCard,
  initExitCardDialogs,
} from "../../shared/components/exit-card/ExitCard.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root");
  renderFooter("#footer-root");
  renderCta("#cta-root");
  renderHeader("#page-header-root");

  initFadeUp();
  initStatCounters();
  initSteps();
  initExplainerTabs();
  initListings();
  initExitCardDialogs();
});

/* ==========================================
   PAGE HEADER
   ========================================== */

/** Where an owner starts a file — the same page the navbar links to. */
const UNIT_REQUEST_HREF = "../unit-request/index.html?type=exit";

function renderHeader(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  const unitsListed = 5242;
  const contractsValue = 75;

  root.innerHTML = `
    <header class="page-header">
      <div class="page-header__pattern"></div>
      <div class="page-header__inner">
        <div class="page-header__content">
          <nav class="page-header__breadcrumb" aria-label="Breadcrumb">
            <a href="../home/index.html" class="page-header__crumb">Home</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span class="page-header__crumb page-header__crumb--active">Dastan Exit</span>
          </nav>
          <h1 class="page-header__title">Dastan Exit</h1>
          <p class="page-header__subtitle">Assign an installment contract with no overprice &mdash; the seller recovers every pound they paid, the buyer steps into the original contract price</p>
        </div>
        <div class="page-header__aside">
          <a href="${UNIT_REQUEST_HREF}" class="page-header__cta">
            <span class="page-header__cta-copy">
              <span class="page-header__cta-note">A first review costs nothing</span>
              <span class="page-header__cta-action">I want to exit my unit</span>
            </span>
            <span class="page-header__cta-chip" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>
          <div class="page-header__stats">
            <div class="page-header__stat">
              <span class="page-header__stat-value" data-count-to="${unitsListed}">0</span>
              <span class="page-header__stat-label">Units</span>
            </div>
            <div class="page-header__stat-div"></div>
            <div class="page-header__stat">
              <span class="page-header__stat-value"><span data-count-to="${contractsValue}">0</span>B</span>
              <span class="page-header__stat-label">EGP Value</span>
            </div>
            <div class="page-header__stat-div"></div>
            <div class="page-header__stat">
              <span class="page-header__stat-value">0%</span>
              <span class="page-header__stat-label">Seller Fee</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}

/* ==========================================
   REVEAL + COUNTERS
   ========================================== */

function initFadeUp() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
}

function initStatCounters() {
  const targets = document.querySelectorAll("[data-count-to]");
  if (!targets.length) return;

  const run = (el) => {
    const to = Number(el.dataset.countTo);
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out so the number settles rather than stopping dead.
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(to * eased).toLocaleString("en-US");
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );
  targets.forEach((el) => obs.observe(el));
}

/* ==========================================
   HOW IT WORKS — seller / buyer tracks
   ========================================== */

const STEPS = {
  seller: [
    {
      title: "We read your contract",
      text: "Send us the contract and we check whether it can be assigned, on what terms, and what the developer needs in order to approve it. Free, and in writing.",
    },
    {
      title: "You upload the documents",
      text: "The contract and every payment receipt, so the cash you recover is documented rather than claimed.",
    },
    {
      title: "We prepare the file",
      text: "Each figure is reconciled against the paperwork and laid out as one clear offer: cash to you, balance to the developer, price today.",
    },
    {
      title: "We match a buyer",
      text: "Only buyers who can pay your cash and carry the remaining instalments see the file. It is never published publicly.",
    },
    {
      title: "The contract is transferred",
      text: "We walk both sides through the developer's assignment procedure until the money reaches you.",
    },
  ],
  buyer: [
    {
      title: "Tell us your budget",
      text: "The cash you have available now, and the instalment you are comfortable carrying.",
    },
    {
      title: "See what matches",
      text: "Opportunities with the full figures in the open — cash now, balance to the developer, instalment, handover, price today.",
    },
    {
      title: "Submit your offer",
      text: "A formal offer with explicit terms. Nothing informal, nothing implied.",
    },
    {
      title: "Confirm the reservation",
      text: "Payment moves through the developer's official assignment procedure, documented at every step.",
    },
    {
      title: "You receive the contract",
      text: "An assignment approved by the developer, in your name, at the original contract price.",
    },
  ],
};

function initSteps() {
  const root = document.getElementById("exit-steps");
  const tabs = document.querySelectorAll("[data-track]");
  if (!root || !tabs.length) return;

  const paint = (track) => {
    root.innerHTML = STEPS[track]
      .map(
        (step, i) => `
        <article class="dx-step">
          <span class="dx-step__num">${String(i + 1).padStart(2, "0")}</span>
          <h4 class="dx-step__title">${step.title}</h4>
          <p class="dx-step__text">${step.text}</p>
        </article>`,
      )
      .join("");
    root.setAttribute("aria-labelledby", `tab-${track}`);

    // Restart the entry animation so the new track fades in rather than
    // replacing the old one mid-frame.
    root.classList.remove("dx-steps--in");
    void root.offsetWidth;
    root.classList.add("dx-steps--in");
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        const isActive = t === tab;
        t.classList.toggle("dx-tab--active", isActive);
        t.setAttribute("aria-selected", String(isActive));
      });
      paint(tab.dataset.track);
    });
  });

  paint("seller");
}

/* ==========================================
   EXPLAINER TABS — one deal, three panels
   ========================================== */

/**
 * The three panels are stacked on top of each other and the wrapper carries
 * their height, so a swap animates the height instead of snapping the page to
 * a new one. Heights are measured rather than guessed: the steps grid
 * re-renders and the comparison table reflows, so a ResizeObserver keeps the
 * wrapper honest.
 */
function initExplainerTabs() {
  const section = document.getElementById("exit-explainer");
  const list = section?.querySelector(".dx-tablist");
  const wrap = document.getElementById("exit-panels");
  if (!section || !list || !wrap) return;

  const tabs = Array.from(list.querySelectorAll("[data-exit-panel]"));
  const indicator = list.querySelector(".dx-tablist__indicator");
  const panels = new Map(
    Array.from(wrap.querySelectorAll("[data-exit-panel-body]")).map((el) => [
      el.id,
      el,
    ]),
  );
  if (!tabs.length || !panels.size) return;

  let activeId = tabs[0].dataset.exitPanel;

  const sizeToActive = () => {
    const panel = panels.get(activeId);
    if (panel) wrap.style.height = `${panel.offsetHeight}px`;
  };

  const moveIndicator = () => {
    const tab = tabs.find((t) => t.dataset.exitPanel === activeId);
    if (!tab || !indicator) return;
    // offsetLeft is measured from the left edge under both directions, so the
    // indicator is placed physically and slides correctly in Arabic too.
    indicator.style.width = `${tab.offsetWidth}px`;
    indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
  };

  const activate = (id, { focusTab = false } = {}) => {
    const tab = tabs.find((t) => t.dataset.exitPanel === id);
    if (!panels.has(id) || !tab) return;

    if (id !== activeId) {
      activeId = id;

      tabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle("dx-tabbtn--active", on);
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });

      panels.forEach((panel, panelId) => {
        const on = panelId === id;
        panel.classList.toggle("dx-panel--active", on);
        if (on) panel.removeAttribute("aria-hidden");
        else panel.setAttribute("aria-hidden", "true");
      });

      moveIndicator();
      sizeToActive();
    }

    // On narrow screens the row scrolls; keep the chosen tab in view.
    if (list.scrollWidth > list.clientWidth) {
      tab.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }

    if (focusTab) tab.focus();
  };

  tabs.forEach((tab) =>
    tab.addEventListener("click", () => activate(tab.dataset.exitPanel)),
  );

  // Roving focus, so the tablist behaves like one control for the keyboard.
  list.addEventListener("keydown", (e) => {
    // Arrow keys follow the reading direction, which flips in Arabic.
    const forward = document.documentElement.dir === "rtl" ? -1 : 1;
    const steps = {
      ArrowRight: forward,
      ArrowLeft: -forward,
      ArrowDown: 1,
      ArrowUp: -1,
    };
    const current = tabs.findIndex((t) => t.dataset.exitPanel === activeId);
    let next = null;

    if (e.key in steps)
      next = (current + steps[e.key] + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;

    e.preventDefault();
    activate(tabs[next].dataset.exitPanel, { focusTab: true });
  });

  // The panel ids are the old section ids, so existing deep links still land
  // on the right content — they just open a tab now instead of scrolling.
  const openFromHash = () => activate(location.hash.slice(1));
  window.addEventListener("hashchange", openFromHash);
  openFromHash();

  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(() => {
      sizeToActive();
      moveIndicator();
    });
    panels.forEach((panel) => ro.observe(panel));
    ro.observe(list);
  } else {
    window.addEventListener("resize", () => {
      sizeToActive();
      moveIndicator();
    });
  }

  moveIndicator();
  sizeToActive();
  // Animate only from here on, so the first paint does not slide in from zero.
  requestAnimationFrame(() => section.classList.add("is-ready"));
}

/* ==========================================
   OPPORTUNITIES — filter + sort
   ========================================== */

const SORTERS = {
  gain: (a, b) => exitMath(b).gain - exitMath(a).gain,
  cash: (a, b) => a.paidToDate - b.paidToDate,
  installment: (a, b) => a.installment.amount - b.installment.amount,
  delivery: (a, b) => Number(a.deliveryDate) - Number(b.deliveryDate),
};

const FILTERS = {
  all: () => true,
  ready: (l) => l.transferStatus === "Ready for transfer",
  negotiable: (l) => l.negotiable,
  featured: (l) => l.featured,
};

function initListings() {
  const root = document.getElementById("exit-listings-root");
  const empty = document.getElementById("exit-listings-empty");
  const chips = document.querySelectorAll("[data-exit-filter]");
  const sortEl = document.getElementById("exit-sort");
  if (!root) return;

  const state = { filter: "all", sort: "gain" };

  const paint = () => {
    const visible = exitListings
      .filter(FILTERS[state.filter])
      .sort(SORTERS[state.sort]);

    root.innerHTML = visible.map(renderExitCard).join("");
    if (empty) empty.hidden = visible.length > 0;
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.toggle("dx-chip--active", c === chip));
      state.filter = chip.dataset.exitFilter;
      paint();
    });
  });

  sortEl?.addEventListener("change", () => {
    state.sort = sortEl.value;
    paint();
  });

  paint();
}
