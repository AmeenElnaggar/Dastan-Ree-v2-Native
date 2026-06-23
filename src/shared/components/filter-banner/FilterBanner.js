export function renderFilterBanner(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  el.innerHTML = `
    <section class="filter-banner">
      <div class="filter-banner__watermark" aria-hidden="true">
        <img src="../../assets/images/logo-pattern.png" alt="" />
      </div>
      <div class="filter-banner__container">
        <div class="filter-banner__inner">
          <div class="filter-banner__tabs" role="tablist" aria-label="Property purpose">
            <button class="filter-banner__tab filter-banner__tab--active" role="tab" aria-selected="true" data-purpose="buy">Primary</button>
            <button class="filter-banner__tab" role="tab" aria-selected="false" data-purpose="rent">Resale</button>
            <button class="filter-banner__tab" role="tab" aria-selected="false" data-purpose="offplan">Rent</button>
          </div>
          <form class="filter-banner__form" aria-label="Property search filters">
            <div class="filter-banner__field">
              <label class="filter-banner__label" for="filterLocation">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Location
              </label>
              <div class="filter-banner__select-wrap">
                <select class="filter-banner__select" id="filterLocation" aria-label="Select location">
                  <option value="">All Locations</option>
                  <option value="new-cairo">New Cairo</option>
                  <option value="downtown">Downtown Cairo</option>
                  <option value="new-alamein">New Alamein Coast</option>
                  <option value="new-capital">New Administrative Capital</option>
                  <option value="zamalek">Zamalek</option>
                  <option value="mehwar">Mehwar Road District</option>
                  <option value="smart-village">Smart Village</option>
                </select>
                <svg class="filter-banner__chevron" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            <select id="filterPurpose" aria-label="Select purpose" style="display:none">
              <option value="buy">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="offplan">Off-Plan</option>
            </select>

            <div class="filter-banner__divider" aria-hidden="true"></div>

            <div class="filter-banner__field">
              <label class="filter-banner__label" for="filterType">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="18" rx="2"/>
                  <path d="M8 21V10h8v11"/>
                  <path d="M12 3v7"/>
                </svg>
                Property Type
              </label>
              <div class="filter-banner__select-wrap">
                <select class="filter-banner__select" id="filterType" aria-label="Select property type">
                  <option value="">Any Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="studio">Studio</option>
                  <option value="office">Office Space</option>
                  <option value="retail">Retail</option>
                </select>
                <svg class="filter-banner__chevron" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            <div class="filter-banner__divider" aria-hidden="true"></div>

            <div class="filter-banner__field filter-banner__field--price">
              <label class="filter-banner__label" for="bannerPriceMin">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                Price Range
              </label>
              <div class="filter-banner__price-wrap">
                <input type="number" class="filter-banner__price-input" id="bannerPriceMin" placeholder="Min" min="0" aria-label="Minimum price" />
                <span class="filter-banner__price-sep">–</span>
                <input type="number" class="filter-banner__price-input" id="bannerPriceMax" placeholder="Max" min="0" aria-label="Maximum price" />
              </div>
            </div>

            <div class="filter-banner__actions">
              <button type="button" class="filter-banner__reset-btn" aria-label="Reset filters">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="1 4 1 10 7 10"/>
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                </svg>
                <span>Reset</span>
              </button>
              <button type="submit" class="filter-banner__search-btn" aria-label="Search properties">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;

  const tabs = el.querySelectorAll(".filter-banner__tab");
  const purposeSelect = el.querySelector("#filterPurpose");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => {
        t.classList.remove("filter-banner__tab--active");
        t.setAttribute("aria-selected", "false");
      });
      this.classList.add("filter-banner__tab--active");
      this.setAttribute("aria-selected", "true");
      if (purposeSelect) purposeSelect.value = this.dataset.purpose;
    });
  });

  const form = el.querySelector(".filter-banner__form");
  if (form) form.addEventListener("submit", (e) => e.preventDefault());

  initFilterSelects(el);
  initFilterReset(form);
}

/**
 * Reveals the reset button (splitting the search button) whenever any filter
 * control in the form holds a value, with a smooth CSS transition. Clicking
 * reset clears every control and collapses the button again.
 *
 * Works on any markup using the `.filter-banner__form` / `.filter-banner__actions`
 * structure, so it is shared across all pages that render a filter banner.
 */
export function initFilterReset(form, { ignore = [], onReset } = {}) {
  if (!form) return;

  const controls = () =>
    Array.from(form.querySelectorAll("select, input")).filter((c) => {
      if (c.type === "submit" || c.type === "button" || c.type === "hidden") {
        return false;
      }
      if (c.id === "filterPurpose") return false;
      return !ignore.includes(c.id);
    });

  const hasValue = () =>
    controls().some((c) => !c.disabled && String(c.value ?? "").trim() !== "");

  const update = () => {
    form.classList.toggle("filter-banner__form--has-filters", hasValue());
  };

  controls().forEach((c) => {
    c.addEventListener("change", update);
    c.addEventListener("input", update);
  });

  const resetBtn = form.querySelector(".filter-banner__reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      controls().forEach((c) => {
        if (c.value === "") return;
        c.value = "";
        c.dispatchEvent(new Event("change", { bubbles: true }));
      });
      if (typeof onReset === "function") onReset();
      update();
    });
  }

  update();
}

/* ============================================================
   Custom select dropdown (style ref: contact-us select)
   Enhances every .filter-banner__select-wrap into a styled
   dropdown over the (now hidden) native <select>, plus a
   per-select clear button.
   ============================================================ */

const escHtml = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
const escAttr = escHtml;

const fbOpenSelects = new Set();
let fbSelectGlobalsBound = false;

function closeAllFbSelects() {
  fbOpenSelects.forEach((inst) => inst.close());
}

function bindFbSelectGlobals() {
  if (fbSelectGlobalsBound) return;
  fbSelectGlobalsBound = true;

  document.addEventListener("click", (e) => {
    if (e.target.closest(".fb-select") || e.target.closest(".fb-select__dropdown")) {
      return;
    }
    closeAllFbSelects();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllFbSelects();
  });
  window.addEventListener(
    "scroll",
    () => fbOpenSelects.forEach((inst) => inst.position()),
    true,
  );
  window.addEventListener("resize", closeAllFbSelects);
}

/**
 * Enhances all native selects inside a filter banner into custom dropdowns.
 * Safe to call once per rendered banner; already-enhanced wraps are skipped.
 * Rebuilds itself when option lists change (e.g. the locations cascade).
 */
export function initFilterSelects(root) {
  if (!root) return;
  root.querySelectorAll(".filter-banner__select-wrap").forEach(enhanceFilterSelect);
}

function enhanceFilterSelect(wrap) {
  if (wrap.dataset.fbEnhanced) return;
  const select = wrap.querySelector("select");
  if (!select) return;

  wrap.dataset.fbEnhanced = "true";
  wrap.classList.add("fb-select");
  select.classList.add("fb-select__native");
  select.setAttribute("tabindex", "-1");
  select.setAttribute("aria-hidden", "true");

  const chevron = wrap.querySelector(".filter-banner__chevron");

  const valueEl = document.createElement("span");
  valueEl.className = "fb-select__value";

  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "fb-select__clear";
  clearBtn.setAttribute("aria-label", "Clear selection");
  clearBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>`;

  const dropdown = document.createElement("div");
  dropdown.className = "fb-select__dropdown";
  const optionsEl = document.createElement("div");
  optionsEl.className = "fb-select__options";
  dropdown.appendChild(optionsEl);

  if (chevron) {
    wrap.insertBefore(valueEl, chevron);
    wrap.insertBefore(clearBtn, chevron);
  } else {
    wrap.appendChild(valueEl);
    wrap.appendChild(clearBtn);
  }
  document.body.appendChild(dropdown);

  const placeholder = () => select.options[0]?.text || "Select";

  const renderOptions = () => {
    const opts = Array.from(select.options).filter((o) => o.value !== "");
    optionsEl.innerHTML = opts
      .map((o) => {
        const sel = select.value !== "" && o.value === select.value;
        return `
          <button type="button" class="fb-select__option${sel ? " is-selected" : ""}" role="option" aria-selected="${sel}" data-value="${escAttr(o.value)}">
            <span>${escHtml(o.text)}</span>
            <svg class="fb-select__tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </button>`;
      })
      .join("");
  };

  const updateDisplay = () => {
    const opt = select.options[select.selectedIndex];
    const hasValue = select.value !== "" && opt && opt.value !== "";
    valueEl.textContent = hasValue ? opt.text : placeholder();
    wrap.classList.toggle("has-selection", hasValue);
    wrap.classList.toggle("is-empty", !hasValue);
    wrap.classList.toggle("is-disabled", select.disabled);
  };

  const position = () => {
    const r = wrap.getBoundingClientRect();
    dropdown.style.top = `${r.bottom + 6}px`;
    dropdown.style.left = `${r.left}px`;
    dropdown.style.minWidth = `${r.width}px`;
  };

  const close = () => {
    dropdown.classList.remove("is-open");
    wrap.classList.remove("is-open");
    fbOpenSelects.delete(inst);
  };

  const open = () => {
    if (select.disabled) return;
    closeAllFbSelects();
    renderOptions();
    position();
    dropdown.classList.add("is-open");
    wrap.classList.add("is-open");
    fbOpenSelects.add(inst);
  };

  const inst = { close, position };

  wrap.addEventListener("click", (e) => {
    if (e.target.closest(".fb-select__clear")) return;
    if (wrap.classList.contains("is-open")) close();
    else open();
  });

  clearBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (select.value === "") return;
    select.value = "";
    select.dispatchEvent(new Event("change", { bubbles: true }));
    close();
  });

  optionsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".fb-select__option");
    if (!btn) return;
    select.value = btn.dataset.value;
    select.dispatchEvent(new Event("change", { bubbles: true }));
    close();
  });

  select.addEventListener("change", () => {
    renderOptions();
    updateDisplay();
  });

  // Rebuild when the option list or disabled state changes (cascade selects).
  const mo = new MutationObserver(() => {
    renderOptions();
    updateDisplay();
  });
  mo.observe(select, {
    childList: true,
    attributes: true,
    attributeFilter: ["disabled"],
  });

  renderOptions();
  updateDisplay();
  bindFbSelectGlobals();
}
