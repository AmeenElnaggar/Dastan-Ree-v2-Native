import { amenities } from "../../data/amenities.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { getParam } from "../../utils/router.js";

/** Field schema for the normal Property Submission form. */
const NORMAL_FIELDS = [
  // Contact / seller
  {
    name: "seller_name",
    label: "Name",
    type: "text",
    group: "contact",
    required: true,
    placeholder: "Full name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    group: "contact",
    placeholder: "name@example.com",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    group: "contact",
    required: true,
    placeholder: "+20 100 000 0000",
    width: "full",
  },

  // Unit name (bilingual)
  {
    name: "name_en",
    label: "Unit Name",
    type: "text",
    group: "details",
    required: true,
    placeholder: "Sky Villa 23",
    lang: "en",
    width: "full",
  },
  {
    name: "name_ar",
    label: "Unit Name",
    type: "text",
    group: "details",
    placeholder: "اسم الوحدة",
    lang: "ar",
    width: "full",
  },

  // Location (cascading)
  {
    name: "country_id",
    label: "Country",
    type: "select",
    group: "location",
    required: true,
    lookupType: "country",
  },
  {
    name: "region_id",
    label: "Region",
    type: "select",
    group: "location",
    lookupType: "region",
  },
  {
    name: "city_id",
    label: "City",
    type: "select",
    group: "location",
    lookupType: "city",
  },
  {
    name: "area_place_id",
    label: "Area / Place",
    type: "select",
    group: "location",
    lookupType: "areaplace",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    group: "location",
    placeholder: "Street, district, building no.",
    width: "full",
  },

  // Pricing
  {
    name: "price",
    label: "Price",
    type: "number",
    group: "pricing",
    required: true,
    min: 0,
    step: 0.01,
    placeholder: "0.00",
  },
  {
    name: "down_payment",
    label: "Down Payment",
    type: "number",
    group: "pricing",
    min: 0,
    step: 0.01,
    placeholder: "0.00",
  },
  {
    name: "number_of_installments_years_from",
    label: "Installments From (years)",
    type: "number",
    group: "pricing",
    min: 0,
    placeholder: "0",
  },
  {
    name: "number_of_installments_years_to",
    label: "Installments To (years)",
    type: "number",
    group: "pricing",
    min: 0,
    placeholder: "10",
  },
  {
    name: "currencies",
    label: "Currency",
    type: "select",
    group: "pricing",
    lookupType: "currencies",
    required: true,
  },
  {
    name: "payment_methods",
    label: "Payment Method",
    type: "select",
    group: "pricing",
    lookupType: "paymentmethod",
  },

  // Specs
  {
    name: "area",
    label: "Area",
    type: "number",
    group: "specs",
    required: true,
    min: 0,
    step: 0.01,
    placeholder: "120",
  },
  {
    name: "area_unit",
    label: "Area Unit",
    type: "select",
    group: "specs",
    lookupType: "areaUnit",
    required: true,
  },
  {
    name: "bedrooms",
    label: "Bedrooms",
    type: "number",
    group: "specs",
    min: 0,
    placeholder: "3",
  },
  {
    name: "bathrooms",
    label: "Bathrooms",
    type: "number",
    group: "specs",
    min: 0,
    placeholder: "2",
  },

  // Description
  {
    name: "description_en",
    label: "Description",
    type: "textarea",
    group: "details",
    placeholder: "Tell us about the unit…",
    lang: "en",
  },
  {
    name: "description_ar",
    label: "Description",
    type: "textarea",
    group: "details",
    placeholder: "وصف الوحدة…",
    lang: "ar",
  },

  // Media
  {
    name: "featured_image",
    label: "Featured Image",
    type: "file",
    group: "media",
    accept: "image/*",
  },
  {
    name: "images",
    label: "Gallery Images",
    type: "file",
    group: "media",
    accept: "image/*",
    multiple: true,
  },

  // Lookups (taxonomy)
  {
    name: "amenities",
    label: "Amenities",
    type: "multi-select",
    group: "lookups",
    lookupType: "amenities",
  },
  {
    name: "facilities",
    label: "Facilities",
    type: "multi-select",
    group: "lookups",
    lookupType: "facility",
  },
  {
    name: "views",
    label: "Views",
    type: "multi-select",
    group: "lookups",
    lookupType: "views",
  },
  {
    name: "services",
    label: "Services",
    type: "multi-select",
    group: "lookups",
    lookupType: "services",
  },
  {
    name: "finishing_types",
    label: "Finishing Type",
    type: "select",
    group: "lookups",
    lookupType: "finishingtype",
  },
  {
    name: "furnishing_status",
    label: "Furnishing Status",
    type: "select",
    group: "lookups",
    lookupType: "furnishingstatus",
  },
  {
    name: "offering_types",
    label: "Offering Type",
    type: "select",
    group: "lookups",
    lookupType: "offeringtype",
  },
  {
    name: "purposes",
    label: "Unit Type",
    type: "select",
    group: "lookups",
    lookupType: "purposes",
  },
  {
    name: "purpose_types",
    label: "Purpose Type",
    type: "select",
    group: "lookups",
    lookupType: "purposetype",
  },
];

const NORMAL_GROUPS = {
  contact: { title: "Personal Details", icon: "fa-user" },
  details: { title: "Unit Details", icon: "fa-circle-info" },
  location: { title: "Location", icon: "fa-location-dot" },
  pricing: { title: "Pricing & Payment", icon: "fa-money-bill-wave" },
  specs: { title: "Specifications", icon: "fa-ruler-combined" },
  lookups: { title: "Features", icon: "fa-list-check" },
  media: { title: "Media", icon: "fa-image" },
};

/**
 * Wizard steps for the normal submission. Each step renders one or more
 * schema groups, in order. The last step has no groups — it renders the
 * review summary + agreement.
 */
const NORMAL_STEPS = [
  {
    key: "contact",
    title: "Your Details",
    short: "Contact",
    icon: "fa-user",
    hint: "Tell us who our consultant should reach out to.",
    groups: ["contact"],
  },
  {
    key: "unit",
    title: "Unit Details",
    short: "Unit",
    icon: "fa-circle-info",
    hint: "Name and describe the unit — Arabic is optional.",
    groups: ["details"],
  },
  {
    key: "location",
    title: "Location",
    short: "Location",
    icon: "fa-location-dot",
    hint: "Pick the country first, then narrow down to the exact place.",
    groups: ["location"],
  },
  {
    key: "pricing",
    title: "Pricing & Specs",
    short: "Pricing",
    icon: "fa-money-bill-wave",
    hint: "Asking price, payment terms and the unit's measurements.",
    groups: ["pricing", "specs"],
  },
  {
    key: "features",
    title: "Features & Media",
    short: "Features",
    icon: "fa-list-check",
    hint: "Highlight what makes the unit stand out, then add photos.",
    groups: ["lookups", "media"],
  },
  {
    key: "review",
    title: "Review & Submit",
    short: "Review",
    icon: "fa-clipboard-check",
    hint: "Check everything over before sending it to our team.",
    groups: [],
  },
];

/**
 * Field schema for the Dastan Exit submission — an owner assigning an
 * installment contract. Mirrors the shape a real exit listing needs (see
 * src/data/exit-listings.data.js): identity, unit specs, contract financials,
 * and the documents that let Dastan verify the figures before publishing.
 */
const EXIT_FIELDS = [
  // Contact / seller
  {
    name: "seller_name",
    label: "Name",
    type: "text",
    group: "contact",
    required: true,
    placeholder: "Full name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    group: "contact",
    placeholder: "name@example.com",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    group: "contact",
    required: true,
    placeholder: "+20 100 000 0000",
    width: "full",
  },

  // Unit & contract identity
  {
    name: "unit_code",
    label: "Unit Code",
    type: "text",
    group: "unit",
    placeholder: "U-15653",
  },
  {
    name: "project",
    label: "Project Name",
    type: "text",
    group: "unit",
    required: true,
    placeholder: "Kingsway",
  },
  {
    name: "developer",
    label: "Developer",
    type: "text",
    group: "unit",
    required: true,
    placeholder: "Mountain View",
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    group: "unit",
    required: true,
    placeholder: "6th of October, Giza",
    width: "full",
  },
  {
    name: "unit_type",
    label: "Unit Type",
    type: "select",
    group: "unit",
    required: true,
    lookupType: "exitunittype",
  },
  {
    name: "contract_year",
    label: "Contract Year",
    type: "number",
    group: "unit",
    min: 0,
    placeholder: "2024",
  },
  {
    name: "bedrooms",
    label: "Bedrooms",
    type: "number",
    group: "unit",
    min: 0,
    placeholder: "3",
  },
  {
    name: "bathrooms",
    label: "Bathrooms",
    type: "number",
    group: "unit",
    min: 0,
    placeholder: "2",
  },
  {
    name: "area",
    label: "Area (m²)",
    type: "number",
    group: "unit",
    required: true,
    min: 0,
    step: 0.01,
    placeholder: "140",
  },
  {
    name: "finishing_types",
    label: "Finishing",
    type: "select",
    group: "unit",
    lookupType: "finishingtype",
  },
  {
    name: "construction_status",
    label: "Construction Status",
    type: "select",
    group: "unit",
    lookupType: "constructionstatus",
  },
  {
    name: "delivery_date",
    label: "Expected Delivery",
    type: "text",
    group: "unit",
    placeholder: "2028",
  },
  {
    name: "seller_notes",
    label: "Anything else our consultant should know?",
    type: "textarea",
    group: "unit",
    placeholder:
      "e.g. Developer already approved the assignment, contract signed before the last price revision…",
    width: "full",
  },

  // Contract financials
  {
    name: "contract_price",
    label: "Total Contract Price",
    type: "number",
    group: "contract",
    required: true,
    min: 0,
    step: 0.01,
    placeholder: "0.00",
  },
  {
    name: "paid_to_date",
    label: "Paid To Date (Cash You Recover)",
    type: "number",
    group: "contract",
    required: true,
    min: 0,
    step: 0.01,
    placeholder: "0.00",
  },
  {
    name: "remaining_to_developer",
    label: "Remaining To Developer",
    type: "number",
    group: "contract",
    required: true,
    min: 0,
    step: 0.01,
    placeholder: "0.00",
  },
  {
    name: "market_price_today",
    label: "Market Price Today",
    type: "number",
    group: "contract",
    required: true,
    min: 0,
    step: 0.01,
    placeholder: "0.00",
  },
  {
    name: "installment_amount",
    label: "Installment Amount",
    type: "number",
    group: "contract",
    min: 0,
    step: 0.01,
    placeholder: "0.00",
  },
  {
    name: "installment_frequency",
    label: "Installment Frequency",
    type: "select",
    group: "contract",
    lookupType: "installmentfrequency",
  },
  {
    name: "installments_remaining",
    label: "Installments Remaining",
    type: "number",
    group: "contract",
    min: 0,
    placeholder: "29",
  },
  {
    name: "transfer_status",
    label: "Transfer Status",
    type: "select",
    group: "contract",
    lookupType: "transferstatus",
  },
  {
    name: "negotiable",
    label: "Is the Price Negotiable?",
    type: "select",
    group: "contract",
    lookupType: "yesno",
  },

  // Documents & photos
  {
    name: "contract_file",
    label: "Signed Contract",
    type: "file",
    group: "media",
    required: true,
    accept: "application/pdf,image/*",
  },
  {
    name: "receipt_files",
    label: "Payment Receipts",
    type: "file",
    group: "media",
    accept: "application/pdf,image/*",
    multiple: true,
  },
  {
    name: "unit_images",
    label: "Unit Photos",
    type: "file",
    group: "media",
    accept: "image/*",
    multiple: true,
  },
];

const EXIT_GROUPS = {
  contact: { title: "Your Details", icon: "fa-user" },
  unit: { title: "Unit & Contract Details", icon: "fa-building" },
  contract: { title: "Contract Financials", icon: "fa-file-invoice-dollar" },
  media: { title: "Documents & Photos", icon: "fa-folder-open" },
};

/** Wizard steps for the Dastan Exit submission. */
const EXIT_STEPS = [
  {
    key: "contact",
    title: "Your Details",
    short: "Contact",
    icon: "fa-user",
    hint: "Tell us who our consultant should reach out to.",
    groups: ["contact"],
  },
  {
    key: "unit",
    title: "Unit & Contract",
    short: "Unit",
    icon: "fa-building",
    hint: "Identify the unit and where it sits in the developer's plan.",
    groups: ["unit"],
  },
  {
    key: "financials",
    title: "Contract Financials",
    short: "Financials",
    icon: "fa-file-invoice-dollar",
    hint: "The figures our team reconciles against your contract and receipts.",
    groups: ["contract"],
  },
  {
    key: "documents",
    title: "Documents & Photos",
    short: "Documents",
    icon: "fa-folder-open",
    hint: "Upload the signed contract and payment receipts so every figure is verified, not claimed.",
    groups: ["media"],
  },
  {
    key: "review",
    title: "Review & Submit",
    short: "Review",
    icon: "fa-clipboard-check",
    hint: "Check everything over before sending it to our team.",
    groups: [],
  },
];

const NARROW_TYPES = new Set([
  "text",
  "email",
  "tel",
  "number",
  "select",
  "multi-select",
]);

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
    113: [
      { id: 1131, name: "Allegria" },
      { id: 1132, name: "Westown" },
    ],
    114: [
      { id: 1141, name: "Madinaty Phase 1" },
      { id: 1142, name: "Madinaty Phase 2" },
    ],
    115: [
      { id: 1151, name: "R3" },
      { id: 1152, name: "R7" },
      { id: 1153, name: "R8" },
    ],
    121: [
      { id: 1211, name: "Marassi" },
      { id: 1212, name: "Hacienda Bay" },
    ],
    122: [{ id: 1221, name: "June" }],
    131: [
      { id: 1311, name: "Sahl Hasheesh" },
      { id: 1312, name: "El Gouna" },
    ],
    132: [{ id: 1321, name: "Stella Di Mare" }],
    211: [
      { id: 2111, name: "Atlantis" },
      { id: 2112, name: "Shoreline" },
    ],
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
  exitunittype: [
    { id: 1, name: "Apartment" },
    { id: 2, name: "Villa" },
    { id: 3, name: "i-Villa" },
    { id: 4, name: "Townhouse" },
    { id: 5, name: "Twin House" },
    { id: 6, name: "Duplex" },
    { id: 7, name: "Chalet" },
    { id: 8, name: "Penthouse" },
    { id: 9, name: "Studio" },
  ],
  constructionstatus: [
    { id: 1, name: "Under construction" },
    { id: 2, name: "Near handover" },
    { id: 3, name: "Delivered" },
  ],
  installmentfrequency: [
    { id: 1, name: "Monthly" },
    { id: 2, name: "Quarterly" },
    { id: 3, name: "Semi-Annually" },
    { id: 4, name: "Annually" },
  ],
  transferstatus: [
    { id: 1, name: "Ready for transfer" },
    { id: 2, name: "Under review" },
    { id: 3, name: "Not yet eligible" },
  ],
  yesno: [
    { id: 1, name: "Yes" },
    { id: 2, name: "No" },
  ],
};

const escape = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

/** Every rendered id is namespaced by `prefix` so two form instances never collide. */
const fieldId = (prefix, field) => `${prefix}-${field.name}`;

function renderLabel(prefix, field) {
  return `
    <label for="${fieldId(prefix, field)}" class="form-label">
      ${escape(field.label)}${field.required ? ' <span class="required">*</span>' : ""}
    </label>`;
}

function renderInput(prefix, field) {
  const id = fieldId(prefix, field);
  const required = field.required ? "required" : "";
  const placeholder = field.placeholder
    ? `placeholder="${escape(field.placeholder)}"`
    : "";
  const min = field.min !== undefined ? `min="${field.min}"` : "";
  const step = field.step !== undefined ? `step="${field.step}"` : "";

  switch (field.type) {
    case "textarea":
      return `<textarea id="${id}" name="${field.name}" class="form-input form-textarea" ${placeholder} ${required} rows="4"></textarea>`;

    case "select": {
      const isLocationCascade = [
        "country",
        "region",
        "city",
        "areaplace",
      ].includes(field.lookupType);
      const opts = isLocationCascade
        ? locationOptionsFor(field)
        : LOOKUPS[field.lookupType] || [];
      const nativeOptions = opts
        .map((o) => `<option value="${o.id}">${escape(o.name)}</option>`)
        .join("");
      const customOptions = opts
        .map(
          (o) => `
            <button type="button" class="ms-option ms-option--single" role="option" aria-selected="false" data-value="${o.id}">
              <span class="ms-option__label">${escape(o.name)}</span>
              <i class="fa-solid fa-check ms-option__tick" aria-hidden="true"></i>
            </button>`,
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
            </label>`,
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

    case "file": {
      const multiple = field.multiple ? "multiple" : "";
      const emptyText = field.multiple
        ? "No files selected"
        : "No file selected";
      const hint = field.multiple
        ? `${field.accept ? escape(field.accept) : "Any file"} • select multiple`
        : field.accept
          ? escape(field.accept)
          : "Any file";
      return `
        <label class="file-drop" for="${id}">
          <i class="fa-solid fa-cloud-arrow-up"></i>
          <span class="file-drop__primary">Click to upload</span>
          <span class="file-drop__hint">${hint}</span>
          <span class="file-drop__name" data-empty="${emptyText}">${emptyText}</span>
          <input id="${id}" name="${field.name}" type="file" class="file-drop__input" ${field.accept ? `accept="${escape(field.accept)}"` : ""} ${multiple} />
        </label>`;
    }

    default:
      return `<input id="${id}" name="${field.name}" type="${field.type}" class="form-input" ${placeholder} ${min} ${step} ${required} />`;
  }
}

function isNarrow(field) {
  if (field.width === "full") return false;
  return NARROW_TYPES.has(field.type);
}

function renderField(prefix, field) {
  const widthClass = isNarrow(field)
    ? "form-group--narrow"
    : "form-group--full";
  return `
    <div class="form-group ${widthClass}" data-field="${field.name}">
      ${renderLabel(prefix, field)}
      ${renderInput(prefix, field)}
    </div>`;
}

function renderGrid(prefix, fields) {
  if (!fields.length) return "";
  return `<div class="form-grid">${fields.map((f) => renderField(prefix, f)).join("")}</div>`;
}

function renderSection(prefix, groups, groupKey, fields) {
  const meta = groups[groupKey] || {
    title: groupKey,
    icon: "fa-list",
  };

  const nonLangFields = fields.filter(
    (f) => f.lang !== "en" && f.lang !== "ar",
  );
  const enFields = fields.filter((f) => f.lang === "en");
  const arFields = fields.filter((f) => f.lang === "ar");

  const nonLangGrid = renderGrid(prefix, nonLangFields);

  let langBlock = "";
  if (enFields.length || arFields.length) {
    langBlock = `
      <div class="ur-lang">
        <div class="ur-lang__tabs" role="tablist" aria-label="Language">
          <button type="button" class="ur-lang__tab is-active" role="tab" aria-selected="true" data-lang="en">English</button>
          <button type="button" class="ur-lang__tab" role="tab" aria-selected="false" data-lang="ar">العربية</button>
        </div>
        <div class="ur-lang__panels">
          <div class="ur-lang__panel is-active" data-lang="en" role="tabpanel">${renderGrid(prefix, enFields)}</div>
          <div class="ur-lang__panel" data-lang="ar" role="tabpanel" dir="rtl">${renderGrid(prefix, arFields)}</div>
        </div>
      </div>`;
  }

  return `
    <div class="form-section">
      <h3 class="form-section__title">
        <i class="fa-solid ${meta.icon}"></i> ${escape(meta.title)}
      </h3>
      ${nonLangGrid}
      ${langBlock}
    </div>`;
}

function renderStepper(steps) {
  const items = steps
    .map(
      (step, i) => `
      <li class="ur-stepper__item" data-step="${i}">
        <button type="button" class="ur-stepper__btn" data-goto="${i}" aria-current="false" ${i === 0 ? "" : "disabled"}>
          <span class="ur-stepper__bubble">
            <span class="ur-stepper__num">${i + 1}</span>
            <i class="fa-solid fa-check ur-stepper__tick" aria-hidden="true"></i>
          </span>
          <span class="ur-stepper__label">${escape(step.short)}</span>
        </button>
      </li>`,
    )
    .join("");

  return `
    <nav class="ur-stepper" aria-label="Form progress">
      <ol class="ur-stepper__list">${items}</ol>
    </nav>
    <div class="ur-step-head">
      <span class="ur-step-head__count"></span>
      <h3 class="ur-step-head__title"></h3>
      <p class="ur-step-head__hint"></p>
    </div>`;
}

function renderStepNav(submitLabel) {
  return `
    <div class="ur-nav">
      <button type="button" class="ur-nav__btn ur-nav__btn--back">
        <i class="fa-solid fa-arrow-left"></i>
        <span>Back</span>
      </button>
      <button type="button" class="ur-nav__btn ur-nav__btn--next">
        <span>Continue</span>
        <i class="fa-solid fa-arrow-right"></i>
      </button>
      <button type="submit" class="submit-btn" hidden>
        <span>${escape(submitLabel)}</span>
        <i class="fa-solid fa-paper-plane"></i>
      </button>
    </div>`;
}

function renderReviewStep(prefix, consentHtml) {
  return `
    <div class="ur-review"></div>

    <div class="form-section">
      <h3 class="form-section__title">
        <i class="fa-solid fa-shield-halved"></i> Agreement
      </h3>
      <div class="form-group form-group--full">
        <label class="checkbox-inline">
          <input type="checkbox" id="${prefix}-consent" name="consent" required />
          <span>${consentHtml}</span>
        </label>
      </div>
    </div>`;
}

/** Fields belonging to a step, in schema order. */
function stepFields(steps, fields, index) {
  const step = steps[index];
  if (!step) return [];
  return fields.filter((f) => step.groups.includes(f.group));
}

/** Sensible empty default for a field, based on its type. */
function defaultValueFor(field) {
  if (field.type === "file") return field.multiple ? [] : null;
  if (field.type === "multi-select") return [];
  if (field.type === "number") return 0;
  if (field.type === "select") return null;
  return "";
}

function createEmptyPayload(fields) {
  const payload = {};
  for (const field of fields) payload[field.name] = defaultValueFor(field);
  return payload;
}

/** Human-readable current value of a field, for the review step. */
function displayValue(form, field) {
  if (field.type === "file") {
    const el = form.elements.namedItem(field.name);
    const files = el && el.files ? Array.from(el.files) : [];
    if (!files.length) return "";
    return files.length === 1 ? files[0].name : `${files.length} files selected`;
  }

  if (field.type === "multi-select") {
    const checked = form.querySelectorAll(
      `input[type="checkbox"][name="${field.name}"]:checked`,
    );
    return Array.from(checked)
      .map((c) =>
        c.parentElement.querySelector(".ms-option__label").textContent.trim(),
      )
      .join(", ");
  }

  const el = form.elements.namedItem(field.name);
  if (!el) return "";

  if (field.type === "select") {
    const opt = el.options ? el.options[el.selectedIndex] : null;
    return el.value === "" || !opt || opt.value === "" ? "" : opt.text;
  }

  return String(el.value || "").trim();
}

function reviewLabel(field) {
  const lang = field.lang ? ` (${field.lang.toUpperCase()})` : "";
  return `${field.label}${lang}`;
}

function renderReviewSummary(form, steps, fields, reviewStepIndex) {
  const box = form.querySelector(".ur-review");
  if (!box) return;

  box.innerHTML = steps
    .slice(0, reviewStepIndex)
    .map((step, i) => {
      const rows = stepFields(steps, fields, i)
        .map((field) => ({ field, value: displayValue(form, field) }))
        .filter((row) => row.value !== "");

      const body = rows.length
        ? `<dl class="ur-review__list">
            ${rows
              .map(
                (row) => `
                  <div class="ur-review__row">
                    <dt class="ur-review__key">${escape(reviewLabel(row.field))}</dt>
                    <dd class="ur-review__val">${escape(row.value)}</dd>
                  </div>`,
              )
              .join("")}
          </dl>`
        : `<p class="ur-review__empty">Nothing filled in yet.</p>`;

      return `
        <div class="ur-review__block">
          <div class="ur-review__head">
            <h4 class="ur-review__title">
              <i class="fa-solid ${step.icon}"></i> ${escape(step.title)}
            </h4>
            <button type="button" class="ur-review__edit" data-goto="${i}">
              <i class="fa-solid fa-pen"></i> Edit
            </button>
          </div>
          ${body}
        </div>`;
    })
    .join("");
}

function setSelectOptions(select, options, placeholderLabel) {
  if (!select) return;
  const opts = options || [];
  const placeholder = `<option value="">Select ${escape(placeholderLabel)}</option>`;
  const list = opts
    .map((o) => `<option value="${o.id}">${escape(o.name)}</option>`)
    .join("");
  select.innerHTML = placeholder + list;
  select.disabled = opts.length === 0;
  select.value = "";
}

function bindLocationCascade(form) {
  const cascadeData = {
    country_id: { childKey: "region", child: "region_id", label: "Region" },
    region_id: { childKey: "city", child: "city_id", label: "City" },
    city_id: {
      childKey: "areaplace",
      child: "area_place_id",
      label: "Area / Place",
    },
  };

  Object.entries(cascadeData).forEach(([parentName, cfg]) => {
    const parent = form.elements.namedItem(parentName);
    if (!parent) return;
    parent.addEventListener("change", () => {
      const parentValue = parent.value;
      const childSelect = form.elements.namedItem(cfg.child);
      const options = parentValue
        ? LOCATION_TREE[cfg.childKey][parentValue] || []
        : [];
      setSelectOptions(childSelect, options, cfg.label);
      childSelect.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
}

function closeAllDropdowns(except) {
  document
    .querySelectorAll(".multi-select.is-open, .select-field.is-open")
    .forEach((el) => {
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
    if (
      !e.target.closest(".multi-select") &&
      !e.target.closest(".select-field")
    ) {
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
            </span>`,
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

function bindLangTabs(form) {
  form.querySelectorAll(".ur-lang").forEach((wrap) => {
    const tabs = wrap.querySelectorAll(".ur-lang__tab");
    const panels = wrap.querySelectorAll(".ur-lang__panel");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const lang = tab.dataset.lang;
        tabs.forEach((t) => {
          const active = t.dataset.lang === lang;
          t.classList.toggle("is-active", active);
          t.setAttribute("aria-selected", active ? "true" : "false");
        });
        panels.forEach((p) => {
          p.classList.toggle("is-active", p.dataset.lang === lang);
        });
      });
    });
  });
}

function bindFileInputs(form) {
  form.querySelectorAll(".file-drop").forEach((wrap) => {
    const input = wrap.querySelector(".file-drop__input");
    const nameEl = wrap.querySelector(".file-drop__name");
    input.addEventListener("change", () => {
      const files = input.files;
      const count = files ? files.length : 0;
      let label = nameEl.dataset.empty;
      if (count === 1) label = files[0].name;
      else if (count > 1) label = `${count} files selected`;
      nameEl.textContent = label;
      wrap.classList.toggle("file-drop--has-file", count > 0);
    });
  });
}

function buildPayload(form, fields) {
  const payload = createEmptyPayload(fields);

  for (const field of fields) {
    if (field.type === "file") {
      const el = form.elements.namedItem(field.name);
      if (!el || !el.files || !el.files.length) continue;
      if (field.multiple) {
        payload[field.name] = Array.from(el.files);
      } else {
        payload[field.name] = el.files[0];
      }
      continue;
    }

    if (field.type === "multi-select") {
      const checked = form.querySelectorAll(
        `input[type="checkbox"][name="${field.name}"]:checked`,
      );
      payload[field.name] = Array.from(checked).map((c) => Number(c.value));
      continue;
    }

    const el = form.elements.namedItem(field.name);
    if (!el) continue;
    const raw = el.value;

    if (field.type === "number") {
      payload[field.name] = raw === "" ? 0 : Number(raw);
    } else if (field.type === "select") {
      // Single-pick lookups are numeric IDs.
      payload[field.name] = raw === "" ? null : Number(raw);
    } else {
      payload[field.name] = raw;
    }
  }

  return payload;
}

/**
 * Validates the required fields in `fields` and returns the first element
 * that needs attention, or null when all is well.
 */
function validate(form, fields, { checkConsent = false } = {}) {
  let firstInvalid = null;

  for (const field of fields) {
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

  // Cross-field sanity: installments range — only when both fields are in scope.
  const rangeInScope = fields.some(
    (f) => f.name === "number_of_installments_years_to",
  );
  if (rangeInScope) {
    const yFrom =
      parseFloat(form.elements.number_of_installments_years_from?.value) || 0;
    const yTo =
      parseFloat(form.elements.number_of_installments_years_to?.value) || 0;
    if (yFrom && yTo && yTo < yFrom) {
      form.elements.number_of_installments_years_to.classList.add("is-invalid");
      if (!firstInvalid)
        firstInvalid = form.elements.number_of_installments_years_to;
    }
  }

  if (checkConsent) {
    const consent = form.elements.namedItem("consent");
    if (consent && !consent.checked && !firstInvalid) firstInvalid = consent;
  }

  return firstInvalid;
}

/** Restores every custom control's display after `form.reset()`. */
function resetFormUi(form) {
  form.querySelectorAll(".file-drop").forEach((wrap) => {
    wrap.classList.remove("file-drop--has-file");
    const nameEl = wrap.querySelector(".file-drop__name");
    if (nameEl) nameEl.textContent = nameEl.dataset.empty;
  });

  form.querySelectorAll(".multi-select").forEach((ms) => {
    // renderTags() reads every checkbox, so one event per group is enough.
    ms.querySelector('input[type="checkbox"]')?.dispatchEvent(
      new Event("change"),
    );
  });

  // Re-runs the whole country → region → city → area cascade from the top.
  form.elements
    .namedItem("country_id")
    ?.dispatchEvent(new Event("change", { bubbles: true }));

  form.querySelectorAll(".select-field__hidden").forEach((select) => {
    select.dispatchEvent(new Event("change"));
  });

  form
    .querySelectorAll(".is-invalid")
    .forEach((el) => el.classList.remove("is-invalid"));
}

/**
 * Drives the step wizard: panel visibility, the stepper, the nav buttons and
 * per-step validation on the way forward.
 */
function createStepper(form, formStatus, steps, fields) {
  const stepCount = steps.length;
  const reviewStepIndex = stepCount - 1;

  const panels = Array.from(form.querySelectorAll(".ur-step"));
  const items = Array.from(form.querySelectorAll(".ur-stepper__item"));
  const backBtn = form.querySelector(".ur-nav__btn--back");
  const nextBtn = form.querySelector(".ur-nav__btn--next");
  const submitBtn = form.querySelector(".submit-btn");
  const countEl = form.querySelector(".ur-step-head__count");
  const titleEl = form.querySelector(".ur-step-head__title");
  const hintEl = form.querySelector(".ur-step-head__hint");

  let current = 0;
  let furthest = 0;

  function clearStatus() {
    formStatus.textContent = "";
    formStatus.className = "form-status";
    formStatus.style.display = "";
  }

  function paint() {
    panels.forEach((panel, i) => {
      const active = i === current;
      panel.hidden = !active;
      panel.classList.remove("is-entering");
      if (active) {
        void panel.offsetWidth; // restart the enter animation
        panel.classList.add("is-entering");
      }
    });

    items.forEach((item, i) => {
      item.classList.toggle("is-active", i === current);
      item.classList.toggle("is-done", i < furthest && i !== current);
      const btn = item.querySelector(".ur-stepper__btn");
      btn.disabled = i > furthest;
      btn.setAttribute("aria-current", i === current ? "step" : "false");
    });

    const step = steps[current];
    countEl.textContent = `Step ${current + 1} of ${stepCount}`;
    titleEl.textContent = step.title;
    hintEl.textContent = step.hint;

    const isLast = current === stepCount - 1;
    backBtn.hidden = current === 0;
    nextBtn.hidden = isLast;
    submitBtn.hidden = !isLast;
    if (isLast) renderReviewSummary(form, steps, fields, reviewStepIndex);
  }

  function scrollToTop() {
    const anchor = form.closest(".ur-form-wrapper") || form;
    const top = anchor.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  }

  function flagInvalid(el) {
    formStatus.textContent = "Please fix the highlighted fields to continue.";
    formStatus.className = "form-status error";
    formStatus.style.display = "";
    el.focus({ preventScroll: true });
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function goTo(index, { validateForward = true, scroll = true } = {}) {
    const target = Math.max(0, Math.min(stepCount - 1, index));

    if (validateForward && target > current) {
      for (let i = current; i < target; i++) {
        const invalid = validate(form, stepFields(steps, fields, i));
        if (invalid) {
          current = i;
          paint();
          flagInvalid(invalid);
          return false;
        }
      }
    }

    clearStatus();
    current = target;
    furthest = Math.max(furthest, current);
    paint();
    if (scroll) scrollToTop();
    return true;
  }

  nextBtn.addEventListener("click", () => goTo(current + 1));
  backBtn.addEventListener("click", () =>
    goTo(current - 1, { validateForward: false }),
  );

  // Stepper bubbles and the review step's "Edit" links.
  form.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-goto]");
    if (!btn || btn.disabled) return;
    const target = Number(btn.dataset.goto);
    goTo(target, { validateForward: target > current });
  });

  // Enter should advance the wizard, not submit it from step one.
  form.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    if (e.target.tagName === "TEXTAREA") return;
    if (current === stepCount - 1) return;
    e.preventDefault();
    goTo(current + 1);
  });

  paint();

  return {
    goTo,
    reset: () => {
      current = 0;
      furthest = 0;
      clearStatus();
      paint();
    },
    stepOf: (el) => {
      const panel = el.closest && el.closest(".ur-step");
      return panel ? Number(panel.dataset.step) : reviewStepIndex;
    },
    flagInvalid,
  };
}

function renderForm(form, config) {
  const { fields, groups, steps, prefix, submitLabel, consentHtml } = config;

  const stepperRoot = form.querySelector('[data-slot="stepper"]');
  if (stepperRoot) stepperRoot.innerHTML = renderStepper(steps);

  const byGroup = new Map();
  for (const f of fields) {
    if (!byGroup.has(f.group)) byGroup.set(f.group, []);
    byGroup.get(f.group).push(f);
  }

  const sectionsRoot = form.querySelector('[data-slot="sections"]');
  sectionsRoot.innerHTML = steps
    .map((step, i) => {
      const body =
        step.key === "review"
          ? renderReviewStep(prefix, consentHtml)
          : step.groups
              .filter((g) => (byGroup.get(g) || []).length > 0)
              .map((g) => renderSection(prefix, groups, g, byGroup.get(g)))
              .join("");

      return `
      <div class="ur-step" data-step="${i}" role="group" aria-label="${escape(step.title)}" ${i === 0 ? "" : "hidden"}>
        ${body}
      </div>`;
    })
    .join("");

  const navRoot = form.querySelector('[data-slot="nav"]');
  if (navRoot) navRoot.innerHTML = renderStepNav(submitLabel);
}

/** Wires up one full wizard instance (rendering, bindings, submit handling). */
function initUnitForm(config) {
  const form = document.getElementById(config.formId);
  if (!form) return;

  const formStatus = form.querySelector('[data-slot="status"]');

  renderForm(form, config);

  bindFileInputs(form);
  bindSelectFields(form);
  bindLocationCascade(form);
  bindMultiSelects(form);
  bindLangTabs(form);

  const stepper = createStepper(form, formStatus, config.steps, config.fields);

  form.querySelectorAll(".form-input").forEach((input) => {
    input.addEventListener("input", () => input.classList.remove("is-invalid"));
    input.addEventListener("change", () =>
      input.classList.remove("is-invalid"),
    );
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstInvalid = validate(form, config.fields, {
      checkConsent: true,
    });
    if (firstInvalid) {
      stepper.goTo(stepper.stepOf(firstInvalid), {
        validateForward: false,
        scroll: false,
      });
      stepper.flagInvalid(firstInvalid);
      return;
    }

    const payload = buildPayload(form, config.fields);

    const submitBtn = form.querySelector(".submit-btn");
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    formStatus.className = "form-status";
    formStatus.textContent = "";

    setTimeout(() => {
      console.log(`[${config.formId}] payload:`, payload);

      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;

      form.reset();
      resetFormUi(form);
      stepper.reset();

      formStatus.innerHTML = config.successHtml;
      formStatus.className = "form-status success";
      formStatus.style.display = "";
      form.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => {
        formStatus.style.display = "none";
        formStatus.className = "form-status";
      }, 8000);
    }, 1400);
  });
}

const NORMAL_CONFIG = {
  formId: "unitRequestForm",
  prefix: "ur",
  fields: NORMAL_FIELDS,
  groups: NORMAL_GROUPS,
  steps: NORMAL_STEPS,
  submitLabel: "Submit Property",
  consentHtml:
    'I confirm the information above is accurate and authorize Dastan Real Estate to list and market this property. <span class="required">*</span>',
  successHtml:
    "<strong>Thank you!</strong> Your property has been submitted for review. A Dastan consultant will reach out within one business day.",
};

const EXIT_CONFIG = {
  formId: "exitRequestForm",
  prefix: "ex",
  fields: EXIT_FIELDS,
  groups: EXIT_GROUPS,
  steps: EXIT_STEPS,
  submitLabel: "Submit Exit Request",
  consentHtml:
    'I confirm the contract details above are accurate and authorize Dastan to review this unit for a Dastan Exit assignment. <span class="required">*</span>',
  successHtml:
    "<strong>Thank you!</strong> Your exit request has been submitted. A Dastan consultant will review your contract and reach out within one business day.",
};

/** Toggles between the Property Submission and Dastan Exit panel groups. */
function initSubmissionTabs() {
  const tabs = document.querySelectorAll(".ur-tabs__btn");
  const panels = document.querySelectorAll("[data-panel-group]");
  if (!tabs.length || !panels.length) return;

  const activate = (key) => {
    tabs.forEach((t) => {
      const active = t.dataset.panel === key;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panelGroup !== key;
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.dataset.panel));
  });

  // Dastan Exit links here with ?type=exit so the right tab is already
  // open — e.g. "List your unit for assignment" on the Dastan Exit page.
  if (getParam("type") === "exit") activate("exit");
}

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root", { transparent: true });
  renderFooter("#footer-root");

  initUnitForm(NORMAL_CONFIG);
  initUnitForm(EXIT_CONFIG);
  initSubmissionTabs();

  // Grid columns fade in on page load (chained after the hero) — not scroll-gated.
  const immediateFadeSelectors = [
    ".ur-tabs.fade-up",
    ".ur-aside.fade-up",
    ".ur-form-wrapper.fade-up",
  ];
  const immediateFadeEls = document.querySelectorAll(
    immediateFadeSelectors.join(", "),
  );
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
    { root: null, rootMargin: "0px", threshold: 0.1 },
  );
  document.querySelectorAll(".fade-up").forEach((el) => {
    if (!el.classList.contains("visible") && !immediateFadeEls.length)
      return observer.observe(el);
    if (![...immediateFadeEls].includes(el)) observer.observe(el);
  });
});
