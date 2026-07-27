// Events data — mirrors the shape used by blogs.data.js so the listing,
// card and details logic stay in sync with the blogs feature.
// Each event carries the same content-block structure as a blog article,
// plus event-specific fields: `time`, `location`, `video` (embed URL),
// `projectId` (the related project this event is held for) and `host`.

export const events = [
  {
    id: 1,
    title: "Grand Launch — Dastan Waterfront Residences",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80",
    description:
      "Be the first to explore our newest waterfront collection at an exclusive evening launch — with priority booking, launch pricing, and a first look at the show units.",
    date: "September 12, 2026",
    time: "6:00 PM – 9:30 PM",
    location: "The Nile Ritz-Carlton, Downtown Cairo",
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    category: "Launch Event",
    projectId: "privado",
    tags: ["Waterfront", "Launch", "Priority Booking", "New Cairo"],
    host: {
      name: "Yara Mahmoud",
      role: "Head of Sales & Launches",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    excerpt:
      "Our Waterfront Residences launch is the one date our investors clear their calendars for — an evening of first-look access, launch-only payment plans, and a room full of people who move early.",
    content: [
      { type: "paragraph", text: "The Waterfront Residences launch marks the release of our most anticipated collection this year — a limited run of units set directly along the promenade, with layouts and finishes shown publicly for the first time. Attendees get priority allocation before the general release." },
      { type: "heading", text: "What the evening includes" },
      { type: "paragraph", text: "A guided walkthrough of the master plan and scale model, a first look at two fully-furnished show units, and a private session with our sales advisors to reserve your preferred unit ahead of the public opening. Launch-night pricing and payment plans apply only to reservations made on the evening." },
      { type: "heading", text: "Why arrive early" },
      { type: "paragraph", text: "The most requested layouts — corner units with unobstructed water views — are always the first to go. Guests who register and arrive at doors-open get first pick of allocation and a dedicated advisor for the night." },
      { type: "quote", text: "The best units at every launch are reserved in the first hour. Everything after that is a waiting list." },
      { type: "heading", text: "Who should attend" },
      { type: "paragraph", text: "Investors looking for launch-stage entry pricing, families ready to reserve a primary home, and brokers registering clients ahead of the public release. Attendance is by registration to keep the evening private and unhurried." },
      { type: "paragraph", text: "Seats are limited and allocated on a first-registered basis. Confirm your place and we'll send full venue details, parking, and your named invitation." },
    ],
  },
  {
    id: 2,
    title: "Open House Weekend — New Capital Show Villas",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    description:
      "Walk through our fully-finished show villas across an open weekend. No appointment needed — tour the homes, meet the design team, and see the finishes in person.",
    date: "August 22, 2026",
    time: "11:00 AM – 7:00 PM",
    location: "Dastan Sales Pavilion, New Administrative Capital",
    video: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    category: "Open House",
    projectId: "makadi-heights",
    tags: ["Open House", "Show Villas", "New Capital", "Finishes"],
    host: {
      name: "Hana Khalil",
      role: "Senior Interior Architect",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
    },
    excerpt:
      "Photos flatten a home; standing in it doesn't. Our open weekend lets you experience ceiling heights, natural light, and material quality the way a brochure never can.",
    content: [
      { type: "paragraph", text: "For one weekend, three fully-finished show villas are open to the public with no appointment required. It's the clearest way to judge what you're actually buying — the flow between rooms, the quality of the joinery, the way afternoon light moves through the living spaces." },
      { type: "heading", text: "What you can see" },
      { type: "paragraph", text: "Three distinct villa typologies, each finished to handover standard, including kitchens, wardrobes, bathrooms, and landscaped gardens. Our interior team will be on-site to talk through finish packages and the customisation options available at contract stage." },
      { type: "heading", text: "Bring your questions" },
      { type: "paragraph", text: "Handover timelines, maintenance and service charges, payment plans, and community amenities — the sales and delivery teams will both be present, so you can get answers from the people who actually manage each stage." },
      { type: "quote", text: "Buy the home you can stand inside, not the one you can only see rendered." },
      { type: "paragraph", text: "Drop in any time across the weekend. Registering ahead simply lets us have a dedicated advisor ready for you and skip the sign-in queue at the pavilion." },
    ],
  },
  {
    id: 3,
    title: "Investor Seminar — Off-Plan Strategy for 2027",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    description:
      "A focused half-day seminar on where the market is heading, how to read a payment plan, and which corridors are set to outperform over the next cycle.",
    date: "July 5, 2026",
    time: "9:30 AM – 1:00 PM",
    location: "Dusit Thani LakeView, New Cairo",
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    category: "Seminar",
    projectId: "al-maqsad-residences",
    tags: ["Investment", "Off-Plan", "Strategy", "Market Outlook"],
    host: {
      name: "Layla Saber",
      role: "Senior Market Analyst",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    },
    excerpt:
      "This seminar is deliberately not a sales pitch. It's a working session on the numbers behind off-plan investing — the diligence, the payment-plan maths, and the corridors worth watching.",
    content: [
      { type: "paragraph", text: "Our half-day investor seminar brings together market data, developer-side insight, and a practical framework for evaluating off-plan opportunities. It's built for buyers who want to make decisions from evidence rather than launch-day momentum." },
      { type: "heading", text: "Agenda" },
      { type: "paragraph", text: "Session one covers the 2027 market outlook and the growth corridors we're tracking. Session two is a hands-on breakdown of payment plans — total cost, missed-payment terms, and how to compare offers on a like-for-like basis. The closing session is open Q&A with our analysts." },
      { type: "heading", text: "What you'll leave with" },
      { type: "paragraph", text: "A one-page diligence checklist for vetting any developer and project, a payment-plan comparison template, and a clear read on which areas the data favours over the next three years." },
      { type: "quote", text: "The best off-plan deal isn't the lowest price — it's the one where developer, location, and payment plan all reinforce each other." },
      { type: "paragraph", text: "Seats are capped to keep the Q&A useful. Register to reserve your place and receive the pre-reading pack a week before the session." },
    ],
  },
  {
    id: 4,
    title: "Architecture & Design Talk — Living with Light",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    description:
      "An evening conversation with our lead architects on biophilic design, material honesty, and how the best homes are organised around daylight.",
    date: "June 14, 2026",
    time: "7:00 PM – 9:00 PM",
    location: "Dastan Design Studio, Sheikh Zayed",
    video: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    category: "Talk",
    projectId: "solara-park",
    tags: ["Architecture", "Interior Design", "Biophilic", "Lifestyle"],
    host: {
      name: "Karim Adel",
      role: "Design Director",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    excerpt:
      "The most memorable homes aren't the loudest — they're the ones designed around light and air. This evening talk unpacks how that thinking shapes every plan we draw.",
    content: [
      { type: "paragraph", text: "Join our design team for an intimate evening on the ideas behind our most recent residences: plant-forward planning, honest materials that age well, and floor plans reorganised around natural light rather than square-metre counts." },
      { type: "heading", text: "The themes" },
      { type: "paragraph", text: "We'll walk through built examples — double-height spaces designed around mature trees, bathrooms that open onto private courtyards, and kitchens lit by long horizontal slot windows — and explain the decisions behind each." },
      { type: "quote", text: "Luxury in 2026 is the absence of generic. Every object earns its place, or it doesn't get a place at all." },
      { type: "heading", text: "Format" },
      { type: "paragraph", text: "A 40-minute talk followed by an open discussion over refreshments. Come with questions — the evening is deliberately conversational and small enough for everyone to be heard." },
      { type: "paragraph", text: "Space in the studio is limited. Register to reserve a seat and we'll hold your place until doors open." },
    ],
  },
  {
    id: 5,
    title: "Broker Networking Night — Partner Program Preview",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
    description:
      "An evening for brokerage partners to preview our 2027 inventory, meet the sales leadership, and get first look at the refreshed partner commission structure.",
    date: "May 28, 2026",
    time: "8:00 PM – 11:00 PM",
    location: "The St. Regis Almasa, New Administrative Capital",
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    category: "Networking",
    projectId: "privado",
    tags: ["Brokers", "Partners", "Networking", "Inventory Preview"],
    host: {
      name: "Omar Fathy",
      role: "Head of Channel Partnerships",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    excerpt:
      "Our best broker relationships start over a table, not a contract. This networking night is where partners see what's launching next — before it reaches the market.",
    content: [
      { type: "paragraph", text: "An evening built for our brokerage partners: a preview of the inventory releasing across 2027, a first look at the refreshed partner commission structure, and time to connect directly with our sales leadership." },
      { type: "heading", text: "On the agenda" },
      { type: "paragraph", text: "A short presentation on upcoming launches and allocation for partners, followed by open networking. Our leadership team will be present throughout to answer questions on inventory, incentives, and the co-marketing support available to active partners." },
      { type: "heading", text: "Who it's for" },
      { type: "paragraph", text: "Registered brokerage partners and their senior agents. If your firm isn't yet on our partner roster, register your interest and our channel team will follow up before the event." },
      { type: "quote", text: "The partners who move first on a launch are the ones who saw it coming a quarter early." },
      { type: "paragraph", text: "Entry is by registration only. Confirm your attendance and we'll send named invitations for your team." },
    ],
  },
  {
    id: 6,
    title: "Online Webinar — Property Ownership for Expats",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
    description:
      "A live, remote-friendly session on freehold zones, title deeds, and everything an expat buyer should understand before purchasing property in Egypt.",
    date: "April 18, 2026",
    time: "5:00 PM – 6:15 PM (GMT+2)",
    location: "Online — Live Webinar",
    video: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    category: "Webinar",
    projectId: "makadi-heights",
    tags: ["Legal", "Expats", "Ownership", "Webinar"],
    host: {
      name: "Omar Fathy",
      role: "Real Estate Counsel",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    excerpt:
      "You don't need to be in Cairo to buy in Cairo — but you do need to understand the process. This live webinar walks expat buyers through it, step by step.",
    content: [
      { type: "paragraph", text: "A live online session designed for expat and overseas buyers. We'll cover the legal framework for foreign ownership in Egypt, where you can buy, the title types you'll encounter, and the practical steps of a clean transaction — all with time for live questions." },
      { type: "heading", text: "What we'll cover" },
      { type: "paragraph", text: "Freehold zones and ownership limits, the difference between green, orange, and standard contracts, the registration process end to end, and the real costs beyond the sale price. We'll close with residency and resale considerations for foreign owners." },
      { type: "quote", text: "The single most expensive mistake expat buyers make is treating the contract stage as a formality. It isn't — it's the entire transaction." },
      { type: "heading", text: "Join from anywhere" },
      { type: "paragraph", text: "The session runs live over video with a moderated Q&A. Registered attendees receive the recording and a summary guide afterwards, so it works across time zones even if you can't attend live." },
      { type: "paragraph", text: "Register to receive the join link and calendar invite. A recording is sent to all registrants after the session." },
    ],
  },
];
