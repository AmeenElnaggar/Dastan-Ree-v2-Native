export const AMENITY_ICONS = {
  pool: "fa-water",
  swim: "fa-water",
  gym: "fa-dumbbell",
  fitness: "fa-dumbbell",
  security: "fa-shield-halved",
  guard: "fa-shield-halved",
  gated: "fa-shield-halved",
  parking: "fa-square-parking",
  garage: "fa-car-side",
  garden: "fa-leaf",
  landscape: "fa-leaf",
  green: "fa-leaf",
  playground: "fa-children",
  kids: "fa-children",
  cctv: "fa-video",
  surveillance: "fa-video",
  camera: "fa-video",
  mosque: "fa-mosque",
  concierge: "fa-bell-concierge",
  reception: "fa-bell-concierge",
  rooftop: "fa-city",
  skyline: "fa-city",
  spa: "fa-spa",
  sauna: "fa-hot-tub-person",
  jacuzzi: "fa-hot-tub-person",
  beach: "fa-umbrella-beach",
  cafe: "fa-mug-hot",
  coffee: "fa-mug-hot",
  restaurant: "fa-utensils",
  dining: "fa-utensils",
  kitchen: "fa-utensils",
  retail: "fa-store",
  shop: "fa-store",
  mall: "fa-store",
  market: "fa-cart-shopping",
  lobby: "fa-door-open",
  elevator: "fa-elevator",
  lift: "fa-elevator",
  lounge: "fa-couch",
  smart: "fa-microchip",
  wifi: "fa-wifi",
  internet: "fa-wifi",
  laundry: "fa-shirt",
  storage: "fa-box-archive",
  pets: "fa-paw",
  pet: "fa-paw",
  bike: "fa-bicycle",
  cycling: "fa-bicycle",
  jog: "fa-person-running",
  running: "fa-person-running",
  track: "fa-person-running",
  yoga: "fa-spa",
  tennis: "fa-table-tennis-paddle-ball",
  golf: "fa-golf-ball-tee",
  basketball: "fa-basketball",
  football: "fa-futbol",
  soccer: "fa-futbol",
  sports: "fa-medal",
  club: "fa-medal",
  school: "fa-school",
  clinic: "fa-stethoscope",
  medical: "fa-stethoscope",
  hospital: "fa-hospital",
  pharmacy: "fa-prescription-bottle-medical",
  bank: "fa-building-columns",
  atm: "fa-money-bill",
  hotel: "fa-hotel",
  business: "fa-briefcase",
  coworking: "fa-briefcase",
  office: "fa-briefcase",
  cinema: "fa-film",
  theater: "fa-film",
  park: "fa-tree",
  fountain: "fa-water",
  lake: "fa-water",
  bbq: "fa-fire-burner",
  barbecue: "fa-fire-burner",
  fire: "fa-fire",
  solar: "fa-sun",
  ev: "fa-charging-station",
  charging: "fa-charging-station",
  recycling: "fa-recycle",
  air: "fa-wind",
  ac: "fa-snowflake",
  heating: "fa-temperature-high",
  balcony: "fa-house-chimney-window",
  terrace: "fa-house-chimney-window",
  view: "fa-eye",
};

export function getAmenityIcon(name) {
  if (!name) return "fa-star";
  const lower = String(name).toLowerCase();
  for (const [key, icon] of Object.entries(AMENITY_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "fa-star";
}

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
