/**
 * Mock project data for the real estate app.
 * @type {Array<Object>}
 */
export const projects = [
  {
    id: "privado",
    name: "Privado",
    shortDescription:
      "Privado emerges as the crown jewel of Madinaty, a self-contained sanctuary meticulously developed across 276 feddans by the industry titan, Talaat Moustafa Group (TMG). ",
    location: "Cairo, Madinaty, Privado",
    developer: "Talaat Moustafa Group (TMG)",
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
    featured: true,
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
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200",
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
      "Privado emerges as the crown jewel of Madinaty, a self-contained sanctuary meticulously developed across 276 feddans by the industry titan, Talaat Moustafa Group (TMG). ",
    amenityIds: ["pool", "garden", "parking", "security", "playground"],
  },
  {
    id: "makadi-heights",
    name: "Makadi Heights",
    shortDescription:
      "Makadi Heights by Orascom Development is a premier residential community located in the heart of Makadi Bay on the Red Sea.",
    location: "Red Sea, Hurghada, EGY",
    developer: "Orascom Development",
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
    image:
      "https://new-projects-media.propertyfinder.com/project/6e9a4054-9bf0-4a4d-926a-2c73e79f84eb/gallery/image/SarNBC4dbkDEyuki76zftNW0V2BQbwbnn9pm3_G_xFs=/original.webp",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
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
      "Makadi Heights by Orascom Development is a premier residential community located in the heart of Makadi Bay on the Red Sea.",
    amenityIds: ["pool", "gym", "parking", "concierge", "rooftop"],
  },
  {
    id: "al-maqsad-residences",
    name: "Al Maqsad Residences",
    shortDescription:
      "Al Maqsad Residences, developed by City Edge, is a distinguished residential project in the New Administrative Capital designed to offer a blend of elegance, comfort, and modern living.",
    location: "Palm Jumeirah, Cairo",
    developer: "City Edge",
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
    image:
      "https://new-projects-media.propertyfinder.com/project/78e3bb0c-4785-4967-9082-fa6476e92b31/gallery/image/wqnp4ujffNacgR-FjIGj6qwiuWmsLUFQWJZspnBe7_w=/original.webp",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
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
      "Al Maqsad Residences, developed by City Edge, is a distinguished residential project in the New Administrative Capital designed to offer a blend of elegance, comfort, and modern living.",
    amenityIds: ["pool", "beach", "gym", "parking", "security", "garden"],
  },
  {
    id: "dejoya-4",
    name: "DeJoya 4",
    shortDescription:
      "De Joya 4 by Taj Misr Development represents a thoughtful addition to the New Administrative Capital's residential landscape",
    location: "Cairo, New Capital, EGY",
    developer: "Taj Misr Development",
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
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600",
    images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
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
      "De Joya 4 by Taj Misr Development represents a thoughtful addition to the New Administrative Capital's residential landscape",
    amenityIds: ["pool", "gym", "parking", "concierge", "spa"],
  },
];
