/**
 * Dastan Exit — assignment ("exit") opportunities.
 *
 * These are installment units whose owner can no longer continue paying and
 * wants to assign the contract. The field set mirrors what an exit listing
 * actually needs, which is different from a normal listing:
 *
 *   Identity      id, propertyId (the matching listing on Properties),
 *                 unitCode, project, developer, location, contractYear
 *   Unit          type, bedrooms, bathrooms, area, finishing, constructionStatus
 *   Contract      contractPrice, paidToDate, remainingToDeveloper,
 *                 installment { amount, frequency, remaining }, deliveryDate
 *   Market        marketPriceToday — what the same unit costs today
 *   Trust         verified (figures checked against contract + receipts),
 *                 transferStatus, negotiable, featured
 *   Media         image (the card), images (the dialog's small gallery)
 *
 * The seller receives exactly `paidToDate` — no overprice — so that is also
 * the cash the buyer pays now. Everything else is derived: see exitMath().
 */

/** Dastan Exit fee, charged to the buyer only, on completion of the transfer. */
export const BUYER_FEE_RATE = 0.0125;

/**
 * The fee as it is written in copy. Derived once here rather than formatted at
 * each call site, so "1.25%" cannot drift from BUYER_FEE_RATE.
 */
export const BUYER_FEE_LABEL = `${Number((BUYER_FEE_RATE * 100).toFixed(4))}%`;

export const exitListings = [
  {
    id: "exit-001",
    /** The full listing shown on the Properties page for this same unit. */
    propertyId: "luxe-008",
    unitCode: "U-15653",
    project: "Kingsway",
    developer: "Mountain View",
    location: "6th of October, Giza",
    type: "i-Villa",
    bedrooms: 3,
    bathrooms: 2,
    area: 140,
    finishing: "Core & Shell",
    constructionStatus: "Under construction",
    contractYear: 2024,
    contractPrice: 10835460,
    paidToDate: 3395487,
    remainingToDeveloper: 7439973,
    installment: { amount: 255838, frequency: "Quarterly", remaining: 29 },
    marketPriceToday: 12000000,
    deliveryDate: "2028",
    transferStatus: "Ready for transfer",
    verified: true,
    featured: true,
    negotiable: false,
    highlights: [
      "Upper garden i-villa with roof access",
      "Reception, kitchen and two terraces",
      "Developer approval on assignment already confirmed",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=600&fit=crop&q=80",
    /** A few extra angles for the mandatory-info dialog's small gallery. */
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&h=600&fit=crop&q=80",
    ],
  },
  {
    id: "exit-002",
    propertyId: "luxe-005",
    unitCode: "U-12478",
    project: "Stone Park",
    developer: "Rooya Group",
    location: "Fifth Settlement, New Cairo",
    type: "Townhouse",
    bedrooms: 4,
    bathrooms: 5,
    area: 244,
    finishing: "Semi-Finished",
    constructionStatus: "Under construction",
    contractYear: 2023,
    contractPrice: 14200000,
    paidToDate: 4260000,
    remainingToDeveloper: 9940000,
    installment: { amount: 355000, frequency: "Quarterly", remaining: 28 },
    marketPriceToday: 16900000,
    deliveryDate: "2027",
    transferStatus: "Ready for transfer",
    verified: true,
    featured: true,
    negotiable: true,
    highlights: [
      "Corner plot on the landscape spine",
      "Contract signed before the 2024 price revision",
      "Every payment receipt verified by Dastan",
    ],
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&h=600&fit=crop&q=80",
    ],
  },
  {
    id: "exit-003",
    propertyId: "luxe-010",
    unitCode: "U-09321",
    project: "Zed East",
    developer: "Ora Developers",
    location: "Fifth Settlement, New Cairo",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 128,
    finishing: "Fully Finished",
    constructionStatus: "Near handover",
    contractYear: 2022,
    contractPrice: 6450000,
    paidToDate: 2580000,
    remainingToDeveloper: 3870000,
    installment: { amount: 161250, frequency: "Quarterly", remaining: 24 },
    marketPriceToday: 8100000,
    deliveryDate: "2026",
    transferStatus: "Ready for transfer",
    verified: true,
    featured: false,
    negotiable: true,
    highlights: [
      "Handover expected within the year",
      "Club and park view",
      "40% of the contract already paid",
    ],
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=900&h=600&fit=crop&q=80",
    ],
  },
  {
    id: "exit-004",
    propertyId: "luxe-011",
    unitCode: "U-17740",
    project: "Bloomfields",
    developer: "Tatweer Misr",
    location: "Mostakbal City, New Cairo",
    type: "Twin House",
    bedrooms: 4,
    bathrooms: 4,
    area: 210,
    finishing: "Core & Shell",
    constructionStatus: "Under construction",
    contractYear: 2024,
    contractPrice: 12600000,
    paidToDate: 1890000,
    remainingToDeveloper: 10710000,
    installment: { amount: 297500, frequency: "Quarterly", remaining: 36 },
    marketPriceToday: 14300000,
    deliveryDate: "2029",
    transferStatus: "Under review",
    verified: true,
    featured: false,
    negotiable: false,
    highlights: [
      "Lowest cash entry on the platform this month",
      "Nine-year plan still running",
      "Private garden of 120 m2",
    ],
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=900&h=600&fit=crop&q=80",
    ],
  },
  {
    id: "exit-005",
    propertyId: "luxe-009",
    unitCode: "U-14002",
    project: "Hyde Park Coast",
    developer: "Hyde Park",
    location: "North Coast, Matrouh",
    type: "Chalet",
    bedrooms: 3,
    bathrooms: 3,
    area: 155,
    finishing: "Fully Finished",
    constructionStatus: "Under construction",
    contractYear: 2023,
    contractPrice: 9400000,
    paidToDate: 3290000,
    remainingToDeveloper: 6110000,
    installment: { amount: 218214, frequency: "Quarterly", remaining: 28 },
    marketPriceToday: 11500000,
    deliveryDate: "2027",
    transferStatus: "Ready for transfer",
    verified: true,
    featured: false,
    negotiable: true,
    highlights: [
      "Second row from the lagoon",
      "Beach-front phase, sold out at the developer",
      "Seller needs to exit before the next instalment",
    ],
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=900&h=600&fit=crop&q=80",
    ],
  },
  {
    id: "exit-006",
    propertyId: "luxe-003",
    unitCode: "U-11185",
    project: "The Waterway",
    developer: "Equity Developments",
    location: "New Cairo, Cairo",
    type: "Duplex",
    bedrooms: 3,
    bathrooms: 3,
    area: 186,
    finishing: "Semi-Finished",
    constructionStatus: "Near handover",
    contractYear: 2022,
    contractPrice: 8750000,
    paidToDate: 4375000,
    remainingToDeveloper: 4375000,
    installment: { amount: 273437, frequency: "Quarterly", remaining: 16 },
    marketPriceToday: 10600000,
    deliveryDate: "2026",
    transferStatus: "Ready for transfer",
    verified: true,
    featured: false,
    negotiable: false,
    highlights: [
      "Half of the contract already settled",
      "Four years left on the plan",
      "Roof terrace of 45 m2",
    ],
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&h=600&fit=crop&q=80",
    ],
  },
  {
    id: "exit-007",
    propertyId: "luxe-001",
    unitCode: "U-20418",
    project: "Makadi Heights",
    developer: "Emaar Properties",
    location: "Hurghada, Red Sea",
    type: "Penthouse",
    bedrooms: 4,
    bathrooms: 5,
    area: 350,
    finishing: "Fully Finished",
    constructionStatus: "Under construction",
    contractYear: 2023,
    contractPrice: 4500000,
    paidToDate: 1575000,
    remainingToDeveloper: 2925000,
    installment: { amount: 146250, frequency: "Quarterly", remaining: 20 },
    marketPriceToday: 5600000,
    deliveryDate: "December 2027",
    transferStatus: "Ready for transfer",
    verified: true,
    featured: true,
    negotiable: true,
    highlights: [
      "Top floor with a private roof terrace",
      "Full sea view across the Riviera phase",
      "Developer approval on assignment already confirmed",
    ],
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=900&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&h=600&fit=crop&q=80",
    ],
  },
  {
    id: "exit-008",
    propertyId: "luxe-002",
    unitCode: "U-18902",
    project: "Noor City",
    developer: "Nakheel",
    location: "New Cairo, Cairo",
    type: "Villa",
    bedrooms: 6,
    bathrooms: 7,
    area: 850,
    finishing: "Ultra-Lux",
    constructionStatus: "Delivered",
    contractYear: 2021,
    contractPrice: 8200000,
    paidToDate: 5740000,
    remainingToDeveloper: 2460000,
    installment: { amount: 205000, frequency: "Quarterly", remaining: 12 },
    marketPriceToday: 10250000,
    deliveryDate: "Delivered 2024",
    transferStatus: "Ready for transfer",
    verified: true,
    featured: true,
    negotiable: false,
    highlights: [
      "Already handed over, so no construction risk is left",
      "70% of the contract settled, three years still to run",
      "Standalone plot of 850 m2 on the outer ring",
    ],
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&h=600&fit=crop&q=80",
    ],
  },
  {
    id: "exit-009",
    propertyId: "luxe-004",
    unitCode: "U-16337",
    project: "Noor City",
    developer: "Damac Properties",
    location: "New Cairo, Cairo",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 135,
    finishing: "Fully Finished",
    constructionStatus: "Delivered",
    contractYear: 2022,
    contractPrice: 1850000,
    paidToDate: 740000,
    remainingToDeveloper: 1110000,
    installment: { amount: 92500, frequency: "Quarterly", remaining: 12 },
    marketPriceToday: 2400000,
    deliveryDate: "Delivered 2024",
    transferStatus: "Under review",
    verified: true,
    featured: false,
    negotiable: true,
    highlights: [
      "Smallest cash entry on the platform",
      "Keys in hand, so it can be rented from day one",
      "Seller relocating abroad and needs a quick exit",
    ],
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=600&fit=crop&q=80",
    ],
  },
  {
    id: "exit-010",
    propertyId: "luxe-006",
    unitCode: "U-13560",
    project: "Privado",
    developer: "Hassan Allam Properties",
    location: "Madinaty, Cairo",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 160,
    finishing: "Fully Finished",
    constructionStatus: "Delivered",
    contractYear: 2021,
    contractPrice: 2100000,
    paidToDate: 1260000,
    remainingToDeveloper: 840000,
    installment: { amount: 105000, frequency: "Quarterly", remaining: 8 },
    marketPriceToday: 2850000,
    deliveryDate: "Delivered 2023",
    transferStatus: "Ready for transfer",
    verified: true,
    featured: false,
    negotiable: false,
    highlights: [
      "Only two years left on the instalment plan",
      "Overlooking the Privado central park",
      "60% of the contract already paid",
    ],
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&h=600&fit=crop&q=80",
    ],
  },
  {
    id: "exit-011",
    propertyId: "luxe-007",
    unitCode: "U-19274",
    project: "Sky Residence",
    developer: "Emaar Misr",
    location: "Fifth Settlement, New Cairo",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 175,
    finishing: "Fully Finished",
    constructionStatus: "Under construction",
    contractYear: 2023,
    contractPrice: 2750000,
    paidToDate: 825000,
    remainingToDeveloper: 1925000,
    installment: { amount: 87500, frequency: "Quarterly", remaining: 22 },
    marketPriceToday: 3500000,
    deliveryDate: "March 2027",
    transferStatus: "Ready for transfer",
    verified: true,
    featured: true,
    negotiable: false,
    highlights: [
      "Lowest quarterly instalment of any file listed",
      "Phase sold out at the developer",
      "Contract signed before the 2024 price revision",
    ],
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=900&h=600&fit=crop&q=80",
    ],
  },
  {
    id: "exit-012",
    propertyId: "luxe-012",
    unitCode: "U-10863",
    project: "Porto Sokhna",
    developer: "Porto Group",
    location: "Ain Sokhna, Suez",
    type: "Duplex",
    bedrooms: 3,
    bathrooms: 3,
    area: 260,
    finishing: "Fully Finished",
    constructionStatus: "Delivered",
    contractYear: 2022,
    contractPrice: 3600000,
    paidToDate: 1800000,
    remainingToDeveloper: 1800000,
    installment: { amount: 150000, frequency: "Quarterly", remaining: 12 },
    marketPriceToday: 4450000,
    deliveryDate: "Delivered 2024",
    transferStatus: "Ready for transfer",
    verified: true,
    featured: false,
    negotiable: true,
    highlights: [
      "Half of the contract already settled",
      "Marina-facing duplex with a 60 m2 terrace",
      "Every payment receipt verified by Dastan",
    ],
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=900&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=900&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&h=600&fit=crop&q=80",
    ],
  },
];

/**
 * Derive every number an exit listing displays from its raw contract fields.
 *
 * The buyer's gain is what is left of today's market price once the cash to
 * the seller, the balance still owed to the developer, and the Dastan Exit
 * fee are all accounted for. Because `paidToDate + remainingToDeveloper`
 * always equals `contractPrice`, that reduces exactly to the price uplift
 * since signing, less the fee — which is how the pages word it.
 *
 * @param {(typeof exitListings)[number]} listing
 * @returns {{
 *   cashNow: number, buyerFee: number, totalDueNow: number, gain: number,
 *   gainPercent: number, gainOnCashPercent: number, remainingTotal: number,
 *   pricePerMeterContract: number, pricePerMeterMarket: number,
 *   paidPercent: number,
 * } | null} `null` when there is no listing, so callers can branch on it.
 */
export function exitMath(listing) {
  if (!listing) return null;

  const cashNow = listing.paidToDate;
  const buyerFee = Math.round(cashNow * BUYER_FEE_RATE);
  const totalDueNow = cashNow + buyerFee;
  const gain =
    listing.marketPriceToday - cashNow - listing.remainingToDeveloper - buyerFee;

  return {
    cashNow,
    buyerFee,
    totalDueNow,
    gain,
    /** Gain as a share of today's market price — reads as a discount. */
    gainPercent: Math.round((gain / listing.marketPriceToday) * 100),
    /** Gain against the cash actually deployed now — reads as a return. */
    gainOnCashPercent: Math.round((gain / totalDueNow) * 100),
    /** Everything the buyer still owes the developer, cash now excluded. */
    remainingTotal: listing.remainingToDeveloper,
    pricePerMeterContract: Math.round(listing.contractPrice / listing.area),
    pricePerMeterMarket: Math.round(listing.marketPriceToday / listing.area),
    paidPercent: Math.round((cashNow / listing.contractPrice) * 100),
  };
}

/**
 * The exit opportunity attached to a Properties listing, if there is one.
 * Property pages call this to decide whether to show their exit sections.
 *
 * @param {string} propertyId
 * @returns {(typeof exitListings)[number] | undefined}
 */
export function getExitByPropertyId(propertyId) {
  if (!propertyId) return undefined;
  return exitListings.find((l) => l.propertyId === propertyId);
}

/** Listings shown first: featured, then biggest buyer gain. */
export function sortedExitListings() {
  return [...exitListings].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return exitMath(b).gain - exitMath(a).gain;
  });
}
