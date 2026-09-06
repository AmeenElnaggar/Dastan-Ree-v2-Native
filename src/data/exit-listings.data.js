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
    finishing: "Core & shell",
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
    finishing: "Semi-finished",
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
    finishing: "Fully finished",
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
    finishing: "Core & shell",
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
    finishing: "Fully finished",
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
    finishing: "Semi-finished",
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
];

/**
 * Derive every number an exit listing displays from its raw contract fields.
 *
 * The buyer's gain is what is left of today's market price once the cash to
 * the seller, the balance still owed to the developer, and the Dastan Exit
 * fee are all accounted for.
 *
 * @param {(typeof exitListings)[number]} listing
 */
export function exitMath(listing) {
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
    gainPercent: Math.round((gain / listing.marketPriceToday) * 100),
    pricePerMeterContract: Math.round(listing.contractPrice / listing.area),
    pricePerMeterMarket: Math.round(listing.marketPriceToday / listing.area),
    paidPercent: Math.round((cashNow / listing.contractPrice) * 100),
  };
}

/** Listings shown first: featured, then biggest buyer gain. */
export function sortedExitListings() {
  return [...exitListings].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return exitMath(b).gain - exitMath(a).gain;
  });
}
