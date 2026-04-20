export const AMENITY_ICONS = {
  pool: "fa-water",
  gym: "fa-dumbbell",
  security: "fa-shield-halved",
  parking: "fa-square-parking",
  garden: "fa-leaf",
  playground: "fa-children",
  cctv: "fa-video",
  mosque: "fa-mosque",
  concierge: "fa-bell-concierge",
  rooftop: "fa-city",
  spa: "fa-spa",
  beach: "fa-umbrella-beach",
  cafe: "fa-mug-hot",
};

export const FACILITY_ICONS = {
  lobby: "fa-door-open",
  retail: "fa-store",
  parking: "fa-square-parking",
  rooftop: "fa-city",
  beach: "fa-umbrella-beach",
  pool: "fa-water",
  kitchen: "fa-utensils",
  garage: "fa-car-side",
  smart: "fa-microchip",
  garden: "fa-leaf",
  lounge: "fa-couch",
};

export const PURPOSE_ICONS = {
  residential: "fa-house",
  commercial: "fa-building",
  mixed: "fa-city",
  office: "fa-briefcase",
  retail: "fa-store",
  hotel: "fa-hotel",
};

export function getFacilityIcon(name) {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(FACILITY_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "fa-check";
}

export function getPurposeIcon(name) {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(PURPOSE_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "fa-tag";
}
