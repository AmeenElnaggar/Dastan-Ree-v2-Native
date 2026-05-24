import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { amenities } from "../../data/amenities.data.js";

/** Field schema for the Unit Request form. */
const UNIT_REQUEST_FIELDS = [
  // Contact / seller
  { name: "seller_name", label: "Seller Name",   type: "text",  group: "contact", required: true,  placeholder: "Full name" },
  { name: "email",       label: "Email Address", type: "email", group: "contact",                  placeholder: "name@example.com" },
  { name: "phone",       label: "Phone Number",  type: "tel",   group: "contact", required: true,  placeholder: "+20 100 000 0000" },

  // Unit name (bilingual)
  { name: "name_en", label: "Unit Name (English)", type: "text", group: "details", required: true, placeholder: "Sky Villa 23" },
  { name: "name_ar", label: "Unit Name (Arabic)",  type: "text", group: "details",                 placeholder: "اسم الوحدة" },

  // Location (cascading)
  { name: "country_id",    label: "Country",      type: "select", group: "location", required: true, lookupType: "country" },
  { name: "region_id",     label: "Region",       type: "select", group: "location",                 lookupType: "region" },
  { name: "city_id",       label: "City",         type: "select", group: "location",                 lookupType: "city" },
  { name: "area_place_id", label: "Area / Place", type: "select", group: "location",                 lookupType: "areaplace" },
  { name: "address",       label: "Address",      type: "text",   group: "location",                 placeholder: "Street, district, building no.", width: "full" },

  // Pricing
  { name: "price",        label: "Price",        type: "number", group: "pricing", required: true, min: 0, step: 0.01, placeholder: "0.00" },
  { name: "down_payment", label: "Down Payment", type: "number", group: "pricing",                 min: 0, step: 0.01, placeholder: "0.00" },
  { name: "number_of_installments_years_from", label: "Installments From (years)", type: "number", group: "pricing", min: 0, placeholder: "0" },
  { name: "number_of_installments_years_to",   label: "Installments To (years)",   type: "number", group: "pricing", min: 0, placeholder: "10" },
  { name: "currencies",      label: "Currency",       type: "select", group: "pricing", lookupType: "currencies",    required: true },
  { name: "payment_methods", label: "Payment Method", type: "select", group: "pricing", lookupType: "paymentmethod" },

  // Specs
  { name: "area",      label: "Area",      type: "number", group: "specs", required: true, min: 0, step: 0.01, placeholder: "120" },
  { name: "area_unit", label: "Area Unit", type: "select", group: "specs", lookupType: "areaUnit", required: true },
  { name: "bedrooms",  label: "Bedrooms",  type: "number", group: "specs", min: 0, placeholder: "3" },
  { name: "bathrooms", label: "Bathrooms", type: "number", group: "specs", min: 0, placeholder: "2" },

  // Description
  { name: "description_en", label: "Description (English)", type: "textarea", group: "details", placeholder: "Tell us about the unit…" },
  { name: "description_ar", label: "Description (Arabic)",  type: "textarea", group: "details", placeholder: "وصف الوحدة…" },

  // Media
  { name: "featured_image", label: "Featured Image", type: "file", group: "media", accept: "image/*" },

  // Lookups (taxonomy)
  { name: "amenities",         label: "Amenities",          type: "multi-select", group: "lookups", lookupType: "amenities" },
  { name: "facilities",        label: "Facilities",         type: "multi-select", group: "lookups", lookupType: "facility" },
  { name: "views",             label: "Views",              type: "multi-select", group: "lookups", lookupType: "views" },
  { name: "services",          label: "Services",           type: "multi-select", group: "lookups", lookupType: "services" },
  { name: "finishing_types",   label: "Finishing Type",     type: "select", group: "lookups", lookupType: "finishingtype" },
  { name: "furnishing_status", label: "Furnishing Status",  type: "select", group: "lookups", lookupType: "furnishingstatus" },
  { name: "sale_types",        label: "Sale Type",          type: "select", group: "lookups", lookupType: "saletype" },
  { name: "offering_types",    label: "Offering Type",      type: "select", group: "lookups", lookupType: "offeringtype" },
  { name: "purposes",          label: "Purpose",            type: "select", group: "lookups", lookupType: "purposes" },
  { name: "purpose_types",     label: "Purpose Type",       type: "select", group: "lookups", lookupType: "purposetype" },
];

const UNIT_REQUEST_GROUPS = {
  contact:  { title: "Your Details",      icon: "fa-user" },
  details:  { title: "Unit Details",      icon: "fa-circle-info" },
  location: { title: "Location",          icon: "fa-location-dot" },
  pricing:  { title: "Pricing & Payment", icon: "fa-money-bill-wave" },
  specs:    { title: "Specifications",    icon: "fa-ruler-combined" },
  lookups:  { title: "Features",          icon: "fa-list-check" },
  media:    { title: "Media",             icon: "fa-image" },
};

function createEmptyUnitRequest() {
  return {
    name_en: "",
    name_ar: "",
    seller_name: "",
    email: "",
    phone: "",
    country_id: 0,
    region_id: 0,
    city_id: 0,
    area_place_id: 0,
    address: "",
    price: 0,
    down_payment: 0,
    number_of_installments_years_from: 0,
    number_of_installments_years_to: 0,
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
    description_en: "",
    description_ar: "",
    views: [],
    facilities: [],
    area_unit: [],
    currencies: [],
    sale_types: [],
    amenities: [],
    services: [],
    payment_methods: [],
    finishing_types: [],
    purposes: [],
    purpose_types: [],
    offering_types: [],
    furnishing_status: [],
  };
}

const NARROW_TYPES = new Set(["text", "email", "tel", "number", "select", "multi-select"]);

/**
 * Hierarchical location data for the cascading country → region → city → area selects.
 * Replace with an API call later. The cascade keys are the `lookupType` values.
 */
const LOCATION_TREE = {
  country: [
    { id: 1, name: "Egypt" },
    { id: 2, name: "United Arab Emirates" },
    { id: 3, name: "Saudi Arabia" },
  ],
  region: {
    1: [
      { id: 11, name: "Greater Cairo" },
      { id: 12, name: "North Coast" },
      { id: 13, name: "Red Sea" },
    ],
    2: [
      { id: 21, name: "Dubai" },
      { id: 22, name: "Abu Dhabi" },
    ],
    3: [
      { id: 31, name: "Central" },
      { id: 32, name: "Western" },
    ],
  },
  city: {
    11: [
      { id: 111, name: "New Cairo" },
      { id: 112, name: "6th of October" },
      { id: 113, name: "Sheikh Zayed" },
      { id: 114, name: "Madinaty" },
      { id: 115, name: "New Capital" },
    ],
    12: [
      { id: 121, name: "Sahel" },
      { id: 122, name: "Ras El Hekma" },
    ],
    13: [
      { id: 131, name: "Hurghada" },
      { id: 132, name: "Ain Sokhna" },
    ],
    21: [
      { id: 211, name: "Palm Jumeirah" },
      { id: 212, name: "Downtown Dubai" },
      { id: 213, name: "Dubai Marina" },
    ],
    22: [
      { id: 221, name: "Yas Island" },
      { id: 222, name: "Saadiyat Island" },
    ],
    31: [{ id: 311, name: "Riyadh" }],
    32: [{ id: 321, name: "Jeddah" }],
  },
  areaplace: {
    111: [
      { id: 1111, name: "Fifth Settlement" },
      { id: 1112, name: "Rehab" },
      { id: 1113, name: "Mountain View" },
    ],
    112: [
      { id: 1121, name: "Beverly Hills" },
      { id: 1122, name: "Dreamland" },
    ],
    113: [{ id: 1131, name: "Allegria" }, { id: 1132, name: "Westown" }],
    114: [{ id: 1141, name: "Madinaty Phase 1" }, { id: 1142, name: "Madinaty Phase 2" }],
    115: [{ id: 1151, name: "R3" }, { id: 1152, name: "R7" }, { id: 1153, name: "R8" }],
    121: [{ id: 1211, name: "Marassi" }, { id: 1212, name: "Hacienda Bay" }],
    122: [{ id: 1221, name: "June" }],
    131: [{ id: 1311, name: "Sahl Hasheesh" }, { id: 1312, name: "El Gouna" }],
    132: [{ id: 1321, name: "Stella Di Mare" }],
    211: [{ id: 2111, name: "Atlantis" }, { id: 2112, name: "Shoreline" }],
    212: [{ id: 2121, name: "Burj Khalifa District" }],
    213: [{ id: 2131, name: "Marina Walk" }],
    221: [{ id: 2211, name: "Yas Acres" }],
    222: [{ id: 2221, name: "Saadiyat Beach" }],
    311: [{ id: 3111, name: "Olaya" }],
    321: [{ id: 3211, name: "Al Hamra" }],
  },
};

/** Maps each cascade child to its parent field name. */
const LOCATION_PARENT = {
  region_id: "country_id",
  city_id: "region_id",
  area_place_id: "city_id",
};

/** Maps each cascade parent to its child field name. */
const LOCATION_CHILD = {
  country_id: "region_id",
  region_id: "city_id",
  city_id: "area_place_id",
};

function locationOptionsFor(field) {
  if (field.lookupType === "country") return LOCATION_TREE.country;
  return []; // children populate when parent is picked
}

/**
 * Static lookup options keyed by the schema's `lookupType` value.
 * Each option is `{ id, name }`. Swap this out for an API call later.
 */
const LOOKUPS = {
  amenities: amenities.map((a, i) => ({ id: i + 1, name: a.name })),
  currencies: [
    { id: 1, name: "EGP" },
    { id: 2, name: "USD" },
    { id: 3, name: "EUR" },
    { id: 4, name: "SAR" },
    { id: 5, name: "AED" },
  ],
  areaUnit: [
    { id: 1, name: "m²" },
    { id: 2, name: "ft²" },
  ],
  saletype: [
    { id: 1, name: "Sale" },
    { id: 2, name: "Rent" },
    { id: 3, name: "Resale" },
  ],
  offeringtype: [
    { id: 1, name: "Primary" },
    { id: 2, name: "Resale" },
  ],
  finishingtype: [
    { id: 1, name: "Fully Finished" },
    { id: 2, name: "Semi-Finished" },
    { id: 3, name: "Core & Shell" },
    { id: 4, name: "Furnished" },
  ],
  furnishingstatus: [
    { id: 1, name: "Furnished" },
    { id: 2, name: "Semi-Furnished" },
    { id: 3, name: "Unfurnished" },
  ],
  purposetype: [
    { id: 1, name: "Residential" },
    { id: 2, name: "Commercial" },
    { id: 3, name: "Investment" },
  ],
  purposes: [
    { id: 1, name: "Living" },
    { id: 2, name: "Vacation Home" },
    { id: 3, name: "Investment" },
    { id: 4, name: "Business" },
  ],
  views: [
    { id: 1, name: "Sea View" },
    { id: 2, name: "Garden View" },
    { id: 3, name: "Pool View" },
    { id: 4, name: "City View" },
    { id: 5, name: "Lagoon View" },
    { id: 6, name: "Golf View" },
  ],
  facility: [
    { id: 1, name: "Swimming Pool" },
    { id: 2, name: "Gym" },
    { id: 3, name: "Parking" },
    { id: 4, name: "Security" },
    { id: 5, name: "Spa" },
    { id: 6, name: "Clubhouse" },
  ],
  services: [
    { id: 1, name: "Concierge" },
    { id: 2, name: "Maintenance" },
    { id: 3, name: "Cleaning" },
    { id: 4, name: "Valet Parking" },
  ],
  paymentmethod: [
    { id: 1, name: "Cash" },
    { id: 2, name: "Installments" },
    { id: 3, name: "Mortgage" },
    { id: 4, name: "Bank Transfer" },
  ],
};

const escape = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

const fieldId = (field) => `ur-${field.name}`;

function renderLabel(field) {
  return `
    <label for="${fieldId(field)}" class="form-label">
      ${escape(field.label)}${field.required ? ' <span class="required">*</span>' : ""}
    </label>`;
}

function renderInput(field) {
  const id = fieldId(field);
  const required = field.required ? "required" : "";
  const placeholder = field.placeholder ? `placeholder="${escape(field.placeholder)}"` : "";
  const min = field.min !== undefined ? `min="${field.min}"` : "";
  const step = field.step !== undefined ? `step="${field.step}"` : "";

  switch (field.type) {
    case "textarea":
      return `<textarea id="${id}" name="${field.name}" class="form-input form-textarea" ${placeholder} ${required} rows="4"></textarea>`;

    case "select": {
      const isLocationCascade = ["country", "region", "city", "areaplace"].includes(field.lookupType);
      const opts = isLocationCascade ? locationOptionsFor(field) : (LOOKUPS[field.lookupType] || []);
      const nativeOptions = opts
        .map((o) => `<option value="${o.id}">${escape(o.name)}</option>`)
        .join("");
      const customOptions = opts
        .map(
          (o) => `
            <button type="button" class="ms-option ms-option--single" role="option" aria-selected="false" data-value="${o.id}">
              <span class="ms-option__label">${escape(o.name)}</span>
              <i class="fa-solid fa-check ms-option__tick" aria-hidden="true"></i>
            </button>`
        )
        .join("");
      const isChildCascade = field.name in LOCATION_PARENT;
      return `
        <div class="select-field" data-name="${field.name}">
          <select id="${id}" name="${field.name}" class="select-field__hidden" ${required} ${isChildCascade ? "disabled" : ""} tabindex="-1" aria-hidden="true">
            <option value="">Select ${escape(field.label)}</option>
            ${nativeOptions}
          </select>
          <button type="button" class="ms-trigger" aria-haspopup="listbox" aria-expanded="false">
            <span class="ms-display">
              <span class="ms-placeholder">Select ${escape(field.label.toLowerCase())}…</span>
              <span class="ms-value"></span>
            </span>
            <svg class="ms-caret" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5.5 8L10 12.5L14.5 8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="ms-dropdown" role="listbox">
            <div class="ms-options">${customOptions}</div>
          </div>
        </div>`;
    }

    case "multi-select": {
      const opts = LOOKUPS[field.lookupType] || [];
      if (!opts.length) {
        return `<p class="multi-empty">No options available yet.</p>`;
      }
      const items = opts
        .map(
          (o) => `
            <label class="ms-option">
              <input type="checkbox" name="${field.name}" value="${o.id}" />
              <span class="ms-option__check"><i class="fa-solid fa-check"></i></span>
              <span class="ms-option__label">${escape(o.name)}</span>
            </label>`
        )
        .join("");
      return `
        <div class="multi-select" data-name="${field.name}">
          <button type="button" class="ms-trigger" aria-haspopup="listbox" aria-expanded="false">
            <span class="ms-display">
              <span class="ms-placeholder">Select ${escape(field.label.toLowerCase())}…</span>
              <span class="ms-tags"></span>
            </span>
            <svg class="ms-caret" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5.5 8L10 12.5L14.5 8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="ms-dropdown" role="listbox" aria-multiselectable="true">
            <div class="ms-options">${items}</div>
          </div>
        </div>`;
    }

    case "file":
      return `
        <label class="file-drop" for="${id}">
          <i class="fa-solid fa-cloud-arrow-up"></i>
          <span class="file-drop__primary">Click to upload</span>
          <span class="file-drop__hint">${field.accept ? escape(field.accept) : "Any file"}</span>
          <span class="file-drop__name" data-empty="No file selected">No file selected</span>
          <input id="${id}" name="${field.name}" type="file" class="file-drop__input" ${field.accept ? `accept="${escape(field.accept)}"` : ""} />
        </label>`;

    default:
      return `<input id="${id}" name="${field.name}" type="${field.type}" class="form-input" ${placeholder} ${min} ${step} ${required} />`;
  }
}

function isNarrow(field) {
  if (field.width === "full") return false;
  return NARROW_TYPES.has(field.type);
}

function renderField(field) {
  const widthClass = isNarrow(field) ? "form-group--narrow" : "form-group--full";
  return `
    <div class="form-group ${widthClass}" data-field="${field.name}">
      ${renderLabel(field)}
      ${renderInput(field)}
    </div>`;
}

function chunkFields(fields) {
  const rows = [];
  let buffer = [];
  for (const f of fields) {
    if (!isNarrow(f)) {
      if (buffer.length) {
        rows.push(buffer);
        buffer = [];
      }
      rows.push([f]);
    } else {
      buffer.push(f);
      if (buffer.length === 2) {
        rows.push(buffer);
        buffer = [];
      }
    }
  }
  if (buffer.length) rows.push(buffer);
  return rows;
}

function renderRow(fields) {
  if (fields.length === 1) return renderField(fields[0]);
  return `<div class="form-row">${fields.map(renderField).join("")}</div>`;
}

function renderSection(groupKey, fields) {
  const meta = UNIT_REQUEST_GROUPS[groupKey] || { title: groupKey, icon: "fa-list" };
  const rows = chunkFields(fields);
  return `
    <div class="form-section">
      <h3 class="form-section__title">
        <i class="fa-solid ${meta.icon}"></i> ${escape(meta.title)}
      </h3>
      ${rows.map(renderRow).join("")}
    </div>`;
}

function renderForm() {
  const root = document.getElementById("ur-form-sections");
  if (!root) return;

  const groupKeys = Object.keys(UNIT_REQUEST_GROUPS);
  const byGroup = new Map(groupKeys.map((g) => [g, []]));
  for (const f of UNIT_REQUEST_FIELDS) {
    if (!byGroup.has(f.group)) byGroup.set(f.group, []);
    byGroup.get(f.group).push(f);
  }

  root.innerHTML = Array.from(byGroup.entries())
    .filter(([, fields]) => fields.length > 0)
    .map(([key, fields]) => renderSection(key, fields))
    .join("");

  // Add a consent section at the end of the form.
  root.insertAdjacentHTML(
    "beforeend",
    `
      <div class="form-section">
        <h3 class="form-section__title">
          <i class="fa-solid fa-shield-halved"></i> Agreement
        </h3>
        <div class="form-group">
          <label class="checkbox-inline">
            <input type="checkbox" id="consent" name="consent" required />
            <span>I confirm the information above is accurate and authorize Dastan Real Estate to list and market this property. <span class="required">*</span></span>
          </label>
        </div>
      </div>`
  );
}

function setSelectOptions(select, options, placeholderLabel) {
  if (!select) return;
  const opts = options || [];
  const placeholder = `<option value="">Select ${escape(placeholderLabel)}</option>`;
  const list = opts.map((o) => `<option value="${o.id}">${escape(o.name)}</option>`).join("");
  select.innerHTML = placeholder + list;
  select.disabled = opts.length === 0;
  select.value = "";
}

function bindLocationCascade(form) {
  const cascadeData = {
    country_id: { childKey: "region", child: "region_id", label: "Region" },
    region_id:  { childKey: "city", child: "city_id", label: "City" },
    city_id:    { childKey: "areaplace", child: "area_place_id", label: "Area / Place" },
  };

  Object.entries(cascadeData).forEach(([parentName, cfg]) => {
    const parent = form.elements.namedItem(parentName);
    if (!parent) return;
    parent.addEventListener("change", () => {
      const parentValue = parent.value;
      const childSelect = form.elements.namedItem(cfg.child);
      const options = parentValue ? LOCATION_TREE[cfg.childKey][parentValue] || [] : [];
      setSelectOptions(childSelect, options, cfg.label);
      childSelect.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
}

function closeAllDropdowns(except) {
  document.querySelectorAll(".multi-select.is-open, .select-field.is-open").forEach((el) => {
    if (el === except) return;
    el.classList.remove("is-open");
    el.querySelector(".ms-trigger")?.setAttribute("aria-expanded", "false");
  });
}

let dropdownGlobalListenersBound = false;
function bindDropdownGlobalListeners() {
  if (dropdownGlobalListenersBound) return;
  dropdownGlobalListenersBound = true;
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".multi-select") && !e.target.closest(".select-field")) {
      closeAllDropdowns(null);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns(null);
  });
}

function bindSelectFields(form) {
  const fields = form.querySelectorAll(".select-field");
  if (!fields.length) return;

  fields.forEach((wrapper) => {
    const hidden = wrapper.querySelector(".select-field__hidden");
    const trigger = wrapper.querySelector(".ms-trigger");
    const dropdown = wrapper.querySelector(".ms-dropdown");
    const placeholder = wrapper.querySelector(".ms-placeholder");
    const valueEl = wrapper.querySelector(".ms-value");
    const optionsContainer = wrapper.querySelector(".ms-options");

    const renderOptions = () => {
      const opts = Array.from(hidden.options).filter((o) => o.value !== "");
      optionsContainer.innerHTML = opts
        .map((o) => {
          const selected = o.value === hidden.value;
          return `
            <button type="button" class="ms-option ms-option--single ${selected ? "is-selected" : ""}" role="option" aria-selected="${selected}" data-value="${o.value}">
              <span class="ms-option__label">${escape(o.text)}</span>
              <i class="fa-solid fa-check ms-option__tick" aria-hidden="true"></i>
            </button>`;
        })
        .join("");
    };

    const updateDisplay = () => {
      const opt = hidden.options[hidden.selectedIndex];
      const hasValue = hidden.value !== "" && opt && opt.value !== "";
      placeholder.style.display = hasValue ? "none" : "";
      valueEl.textContent = hasValue ? opt.text : "";
      wrapper.classList.toggle("has-selection", hasValue);
    };

    const syncDisabled = () => {
      const disabled = hidden.disabled;
      wrapper.classList.toggle("is-disabled", disabled);
      trigger.disabled = disabled;
    };

    trigger.addEventListener("click", () => {
      if (hidden.disabled) return;
      const willOpen = !wrapper.classList.contains("is-open");
      closeAllDropdowns(willOpen ? wrapper : null);
      wrapper.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });

    optionsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".ms-option");
      if (!btn) return;
      e.stopPropagation();
      hidden.value = btn.dataset.value;
      hidden.dispatchEvent(new Event("change", { bubbles: true }));
      wrapper.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    });

    dropdown.addEventListener("click", (e) => e.stopPropagation());

    hidden.addEventListener("change", () => {
      renderOptions();
      updateDisplay();
      syncDisabled();
      wrapper.classList.remove("is-invalid");
    });

    // Catch cascade-driven options replacement (innerHTML / disabled changes)
    const observer = new MutationObserver(() => {
      renderOptions();
      updateDisplay();
      syncDisabled();
    });
    observer.observe(hidden, {
      attributes: true,
      attributeFilter: ["disabled"],
      childList: true,
    });

    // Initial sync
    renderOptions();
    updateDisplay();
    syncDisabled();
  });

  bindDropdownGlobalListeners();
}

function bindMultiSelects(form) {
  const all = form.querySelectorAll(".multi-select");
  if (!all.length) return;

  all.forEach((ms) => {
    const trigger = ms.querySelector(".ms-trigger");
    const dropdown = ms.querySelector(".ms-dropdown");
    const placeholder = ms.querySelector(".ms-placeholder");
    const tagsWrap = ms.querySelector(".ms-tags");
    const checkboxes = ms.querySelectorAll('input[type="checkbox"]');

    const labelFor = (cb) =>
      cb.parentElement.querySelector(".ms-option__label").textContent;

    const renderTags = () => {
      const checked = Array.from(checkboxes).filter((c) => c.checked);
      tagsWrap.innerHTML = checked
        .map(
          (cb) => `
            <span class="ms-tag" data-value="${cb.value}">
              ${escape(labelFor(cb))}
              <button type="button" class="ms-tag__remove" aria-label="Remove ${escape(labelFor(cb))}">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </span>`
        )
        .join("");
      placeholder.style.display = checked.length ? "none" : "";
      ms.classList.toggle("has-selection", checked.length > 0);
    };

    trigger.addEventListener("click", (e) => {
      // Ignore clicks on tag remove buttons inside the trigger.
      if (e.target.closest(".ms-tag__remove")) return;

      const willOpen = !ms.classList.contains("is-open");
      closeAllDropdowns(willOpen ? ms : null);
      ms.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });

    checkboxes.forEach((cb) => {
      cb.addEventListener("change", () => ms.classList.remove("is-invalid"));
    });

    checkboxes.forEach((cb) => {
      cb.addEventListener("change", renderTags);
    });

    tagsWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".ms-tag__remove");
      if (!btn) return;
      e.stopPropagation();
      const value = btn.closest(".ms-tag").dataset.value;
      const cb = ms.querySelector(`input[type="checkbox"][value="${value}"]`);
      if (cb) {
        cb.checked = false;
        renderTags();
      }
    });

    dropdown.addEventListener("click", (e) => e.stopPropagation());
  });

  bindDropdownGlobalListeners();
}

function bindFileInputs(form) {
  form.querySelectorAll(".file-drop").forEach((wrap) => {
    const input = wrap.querySelector(".file-drop__input");
    const nameEl = wrap.querySelector(".file-drop__name");
    input.addEventListener("change", () => {
      const file = input.files && input.files[0];
      nameEl.textContent = file ? file.name : nameEl.dataset.empty;
      wrap.classList.toggle("file-drop--has-file", Boolean(file));
    });
  });
}

function buildPayload(form) {
  const payload = createEmptyUnitRequest();

  for (const field of UNIT_REQUEST_FIELDS) {
    if (field.type === "file") {
      const el = form.elements.namedItem(field.name);
      if (el && el.files && el.files[0]) payload[field.name] = el.files[0];
      continue;
    }

    if (field.type === "multi-select") {
      const checked = form.querySelectorAll(
        `input[type="checkbox"][name="${field.name}"]:checked`
      );
      payload[field.name] = Array.from(checked).map((c) => Number(c.value));
      continue;
    }

    const el = form.elements.namedItem(field.name);
    if (!el) continue;
    const raw = el.value;

    if (field.type === "number" || field.name === "location_id") {
      payload[field.name] = raw === "" ? 0 : Number(raw);
    } else if (field.type === "select") {
      // Schema treats currencies / area_unit / single-pick lookups as numeric IDs.
      payload[field.name] = raw === "" ? null : Number(raw);
    } else {
      payload[field.name] = raw;
    }
  }

  return payload;
}

function validate(form) {
  let firstInvalid = null;

  for (const field of UNIT_REQUEST_FIELDS) {
    if (!field.required) continue;

    if (field.type === "multi-select") continue; // none currently required

    const el = form.elements.namedItem(field.name);
    if (!el) continue;

    const isEmpty =
      el.type === "file"
        ? !(el.files && el.files.length)
        : !String(el.value || "").trim();

    if (isEmpty || (el.checkValidity && !el.checkValidity())) {
      if (el.classList && el.classList.contains("form-input")) {
        el.classList.add("is-invalid");
      }
      const wrapper = el.closest && el.closest(".select-field");
      if (wrapper) wrapper.classList.add("is-invalid");
      if (!firstInvalid) {
        firstInvalid = wrapper ? wrapper.querySelector(".ms-trigger") : el;
      }
    }
  }

  const consent = form.elements.namedItem("consent");
  if (consent && !consent.checked && !firstInvalid) firstInvalid = consent;

  // Cross-field sanity: installments range
  const yFrom = parseFloat(form.elements.number_of_installments_years_from?.value) || 0;
  const yTo = parseFloat(form.elements.number_of_installments_years_to?.value) || 0;
  if (yFrom && yTo && yTo < yFrom) {
    form.elements.number_of_installments_years_to.classList.add("is-invalid");
    if (!firstInvalid) firstInvalid = form.elements.number_of_installments_years_to;
  }

  return firstInvalid;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root", { transparent: true });
  renderFooter("#footer-root");
  renderForm();

  // Grid columns fade in on page load (chained after the hero) — not scroll-gated.
  const immediateFadeSelectors = [".ur-aside.fade-up", ".ur-form-wrapper.fade-up"];
  const immediateFadeEls = document.querySelectorAll(immediateFadeSelectors.join(", "));
  requestAnimationFrame(() => {
    immediateFadeEls.forEach((el) => el.classList.add("visible"));
  });

  // Everything else stays scroll-triggered.
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.1 }
  );
  document.querySelectorAll(".fade-up").forEach((el) => {
    if (!el.classList.contains("visible") && !immediateFadeEls.length) return observer.observe(el);
    if (![...immediateFadeEls].includes(el)) observer.observe(el);
  });

  const form = document.getElementById("unitRequestForm");
  const formStatus = document.getElementById("formStatus");
  if (!form) return;

  bindFileInputs(form);
  bindSelectFields(form);
  bindLocationCascade(form);
  bindMultiSelects(form);

  form.querySelectorAll(".form-input").forEach((input) => {
    input.addEventListener("input", () => input.classList.remove("is-invalid"));
    input.addEventListener("change", () => input.classList.remove("is-invalid"));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstInvalid = validate(form);
    if (firstInvalid) {
      formStatus.textContent = "Please fix the highlighted fields and try again.";
      formStatus.className = "form-status error";
      firstInvalid.focus({ preventScroll: false });
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const payload = buildPayload(form);

    const submitBtn = form.querySelector(".submit-btn");
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    formStatus.className = "form-status";
    formStatus.textContent = "";

    setTimeout(() => {
      console.log("[Submit Property] payload:", payload);

      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;

      formStatus.innerHTML =
        '<strong>Thank you!</strong> Your property has been submitted for review. A Dastan consultant will reach out within one business day.';
      formStatus.className = "form-status success";

      form.reset();
      form
        .querySelectorAll(".file-drop")
        .forEach((w) => {
          w.classList.remove("file-drop--has-file");
          const n = w.querySelector(".file-drop__name");
          if (n) n.textContent = n.dataset.empty;
        });
      form.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => {
        formStatus.style.display = "none";
        formStatus.className = "form-status";
      }, 8000);
    }, 1400);
  });
});
