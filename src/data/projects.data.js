/**
 * Mock project data for the real estate app.
 * @type {Array<Object>}
 */
export const projects = [
  {
    id: "azure-heights",
    name: "Azure Heights",
    shortDescription:
      "Premier residential tower with breathtaking Dubai skyline views.",
    location: "Downtown Dubai, UAE",
    developer: "Emaar Properties",
    developerLogo:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&h=100&fit=crop&crop=center",
    type: "apartment",
    status: "Available",
    price: 1_200_000,
    units: 120,
    year: 2025,
    bedrooms: 2,
    bathrooms: 2,
    area: 140,
    featured: true,
    deliveryDate: "December 2026",
    finishingType: "Fully Finished",
    furnishingStatus: "Fully Furnished",
    masterplanImage:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200",
    facilities: [
      "Grand Lobby",
      "Retail Shops",
      "Underground Parking",
      "Rooftop Lounge",
    ],
    purposeTypes: ["Residential"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200",
    ],
    floorPlans: [
      {
        name: "Studio — 65 m²",
        image:
          "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/08/floor-plan-1-1920x1280.jpg",
      },
      {
        name: "1 Bedroom — 90 m²",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      },
      {
        name: "2 Bedroom — 140 m²",
        image:
          "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/08/floor-plan-1-1920x1280.jpg",
      },
    ],
    latitude: 25.1972,
    longitude: 55.2744,
    description:
      "Azure Heights is a premier residential tower offering breathtaking views of the Dubai skyline. Designed for the modern professional, each unit features floor-to-ceiling windows, smart home integration, and premium finishes.",
    amenityIds: ["pool", "gym", "parking", "concierge", "rooftop"],
  },
  {
    id: "palm-villa-4",
    name: "Palm Villa IV",
    shortDescription:
      "Exclusive beachfront villas with private access on the iconic Palm Jumeirah.",
    location: "Palm Jumeirah, Dubai",
    developer: "Nakheel Properties",
    developerLogo:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=100&h=100&fit=crop&crop=center",
    type: "villa",
    status: "Available",
    price: 8_500_000,
    units: 12,
    year: 2024,
    bedrooms: 5,
    bathrooms: 6,
    area: 680,
    featured: true,
    deliveryDate: "June 2024",
    finishingType: "Fully Finished",
    furnishingStatus: "Fully Furnished",
    masterplanImage:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200",
    facilities: [
      "Private Beach",
      "Infinity Pool",
      "Smart Kitchen",
      "Double Garage",
    ],
    purposeTypes: ["Residential"],
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    ],
    floorPlans: [
      {
        name: "Ground Floor — 340 m²",
        image:
          "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/08/floor-plan-1-1920x1280.jpg",
      },
      {
        name: "First Floor — 340 m²",
        image:
          "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/08/floor-plan-1-1920x1280.jpg",
      },
    ],
    latitude: 25.1124,
    longitude: 55.139,
    description:
      "An exclusive collection of beachfront villas on the iconic Palm Jumeirah. Each villa offers private beach access, infinity pools, and fully equipped smart kitchens with panoramic sea views.",
    amenityIds: ["pool", "beach", "gym", "parking", "security", "garden"],
  },
  {
    id: "marina-gate",
    name: "Marina Gate Residences",
    shortDescription:
      "Contemporary waterfront apartments at the heart of Dubai Marina.",
    location: "Dubai Marina, UAE",
    developer: "Select Group",
    developerLogo:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=100&h=100&fit=crop&crop=center",
    type: "apartment",
    status: "Available",
    price: 950_000,
    units: 280,
    year: 2025,
    bedrooms: 1,
    bathrooms: 1,
    area: 88,
    featured: true,
    deliveryDate: "March 2025",
    finishingType: "Semi-Finished",
    furnishingStatus: "Semi-Furnished",
    masterplanImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
    facilities: [
      "Grand Lobby",
      "Retail Promenade",
      "Valet Parking",
      "Club Room",
    ],
    purposeTypes: ["Residential"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
    ],
    floorPlans: [
      {
        name: "Studio — 45 m²",
        image:
          "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/08/floor-plan-1-1920x1280.jpg",
      },
      {
        name: "1 Bedroom — 88 m²",
        image:
          "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/08/floor-plan-1-1920x1280.jpg",
      },
      {
        name: "3 Bedroom — 180 m²",
        image:
          "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/08/floor-plan-1-1920x1280.jpg",
      },
    ],
    latitude: 25.0777,
    longitude: 55.1397,
    description:
      "Marina Gate sits at the heart of Dubai Marina, steps from the waterfront promenade. Studio to 3-bedroom units available with resort-style amenities and 24-hour concierge.",
    amenityIds: ["pool", "gym", "parking", "concierge", "spa"],
  },
  {
    id: "greenfield-villas",
    name: "Greenfield Villas",
    shortDescription:
      "Serene community living surrounded by lush landscaping in Arabian Ranches.",
    location: "Arabian Ranches, Dubai",
    developer: "Dubai Properties",
    developerLogo:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop&crop=center",
    type: "villa",
    status: "Sold Out",
    price: 3_200_000,
    units: 40,
    year: 2023,
    bedrooms: 4,
    bathrooms: 4,
    area: 420,
    featured: false,
    deliveryDate: "September 2023",
    finishingType: "Fully Finished",
    furnishingStatus: "Unfurnished",
    masterplanImage:
      "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=1200",
    facilities: [
      "Community Center",
      "Cycling Track",
      "School Nearby",
      "Covered Parking",
    ],
    purposeTypes: ["Residential"],
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600",
    images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    ],
    floorPlans: [
      {
        name: "Type A — 420 m²",
        image:
          "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/08/floor-plan-1-1920x1280.jpg",
      },
      {
        name: "Type B — 380 m²",
        image:
          "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/08/floor-plan-1-1920x1280.jpg",
      },
    ],
    latitude: 25.0657,
    longitude: 55.2735,
    description:
      "Greenfield Villas offer serene community living in Arabian Ranches. Surrounded by lush landscaping, cycling tracks, and world-class schooling within walking distance.",
    amenityIds: ["pool", "garden", "parking", "security", "playground"],
  },
  {
    id: "business-plaza",
    name: "Business Plaza Tower",
    shortDescription:
      "Grade-A commercial offices in the heart of the Dubai International Financial Centre.",
    location: "DIFC, Dubai",
    developer: "ICD Brookfield",
    developerLogo:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100&h=100&fit=crop&crop=center",
    type: "commercial",
    status: "Available",
    price: 5_400_000,
    units: 60,
    year: 2026,
    bedrooms: null,
    bathrooms: null,
    area: 320,
    featured: false,
    deliveryDate: "August 2026",
    finishingType: "Core & Shell",
    furnishingStatus: "Unfurnished",
    masterplanImage:
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200",
    facilities: [
      "Conference Suites",
      "Rooftop Terrace",
      "In-Building Café",
      "Dedicated Parking",
    ],
    purposeTypes: ["Commercial", "Administrative"],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
    ],
    floorPlans: [
      {
        name: "Small Office — 120 m²",
        image:
          "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/08/floor-plan-1-1920x1280.jpg",
      },
      {
        name: "Medium Office — 250 m²",
        image:
          "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/08/floor-plan-1-1920x1280.jpg",
      },
      {
        name: "Full Floor — 500 m²",
        image:
          "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/08/floor-plan-1-1920x1280.jpg",
      },
    ],
    latitude: 25.21,
    longitude: 55.28,
    description:
      "Grade-A commercial offices in the Dubai International Financial Centre. Flexible floor plans from 500 to 5,000 sq ft, with dedicated meeting suites and rooftop terrace.",
    amenityIds: ["parking", "concierge", "security", "cafe"],
  },
  {
    id: "creek-harbour",
    name: "Creek Harbour Suites",
    shortDescription:
      "Contemporary suites overlooking Dubai Creek and the upcoming Creek Tower.",
    location: "Dubai Creek Harbour",
    developer: "Emaar Properties",
    developerLogo:
      "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=100&h=100&fit=crop&crop=top",
    type: "apartment",
    status: "Available",
    price: 780_000,
    units: 350,
    year: 2025,
    bedrooms: 1,
    bathrooms: 1,
    area: 72,
    featured: true,
    deliveryDate: "October 2025",
    finishingType: "Semi-Finished",
    furnishingStatus: "Semi-Furnished",
    masterplanImage:
      "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=1200",
    facilities: ["Lobby", "Pool Deck", "Retail Strip", "Multi-Level Parking"],
    purposeTypes: ["Residential"],
    image: "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=600",
    images: [
      "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=1200",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    ],
    floorPlans: [
      {
        name: "Studio — 45 m²",
        image:
          "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/08/floor-plan-1-1920x1280.jpg",
      },
      {
        name: "1 Bedroom — 72 m²",
        image:
          "https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/08/floor-plan-1-1920x1280.jpg",
      },
    ],
    latitude: 25.1921,
    longitude: 55.3508,
    description:
      "Overlooking the Creek and the upcoming Dubai Creek Tower, these suites blend contemporary design with cultural heritage, offering a truly unique urban living experience.",
    amenityIds: ["pool", "gym", "parking", "rooftop"],
  },
];
