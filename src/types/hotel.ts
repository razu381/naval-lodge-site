export interface Hotel {
  id: number;
  name: string;
  description: string;
  distance: string;
  rating: number;
  reviews: number;
  price: number;
  currency: string;
  discount?: string;
  amenities: string[];
  image: string;
  lat?: number;
  lng?: number;
}

export interface Location {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  badge?: string;
  code: string;
}

export const sampleHotels: Hotel[] = [
  {
    id: 1,
    name: "Navy Lodge San Diego Bay",
    description: "Waterfront location with stunning harbor views",
    distance: "0.36 miles",
    rating: 4.6,
    reviews: 1284,
    price: 89,
    currency: "$",
    discount: "Military Rate",
    amenities: ["Pool", "Free WiFi", "Restaurant"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 32.7157,
    lng: -117.1611
  },
  {
    id: 2,
    name: "Pearl Harbor Beachside Lodge",
    description: "Steps from Pearl Harbor Memorial",
    distance: "0.52 miles",
    rating: 4.8,
    reviews: 956,
    price: 125,
    currency: "$",
    discount: "Advance Purchase",
    amenities: ["Pool", "Free WiFi", "Fitness Center", "Restaurant"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 21.3450,
    lng: -157.9410
  },
  {
    id: 3,
    name: "Oceana Oceanfront Suites",
    description: "Direct beach access and family-friendly",
    distance: "0.28 miles",
    rating: 4.5,
    reviews: 847,
    price: 99,
    currency: "$",
    amenities: ["Pool", "Free WiFi", "Coffee Bar"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 36.8419,
    lng: -76.0005
  },
  {
    id: 4,
    name: "Naval Base Jacksonville Lodge",
    description: "Minutes from downtown and the base",
    distance: "0.61 miles",
    rating: 4.4,
    reviews: 723,
    price: 79,
    currency: "$",
    discount: "Weekly Rate",
    amenities: ["Free WiFi", "Restaurant", "Parking"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 30.3322,
    lng: -81.6557
  },
  {
    id: 5,
    name: "Newport Harbor Inn",
    description: "Historic charm with modern amenities",
    distance: "0.45 miles",
    rating: 4.7,
    reviews: 1102,
    price: 139,
    currency: "$",
    discount: "Military Discount",
    amenities: ["Pool", "Free WiFi", "Restaurant", "Fitness Center", "Parking"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 41.4901,
    lng: -71.3128
  },
  {
    id: 6,
    name: "Kitsap Bay Lodge",
    description: "Scenic Puget Sound views",
    distance: "0.73 miles",
    rating: 4.3,
    reviews: 589,
    price: 85,
    currency: "$",
    amenities: ["Free WiFi", "Coffee Bar", "Parking"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 47.5671,
    lng: -122.6326
  },
  {
    id: 7,
    name: "Norfolk Navy Gateway",
    description: "Largest Navy base lodging facility",
    distance: "0.19 miles",
    rating: 4.6,
    reviews: 2341,
    price: 75,
    currency: "$",
    discount: "Group Rate",
    amenities: ["Pool", "Free WiFi", "Restaurant", "Fitness Center", "Parking", "Coffee Bar"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 36.8508,
    lng: -76.2859
  },
  {
    id: 8,
    name: "Corpus Christi Coastal Lodge",
    description: "Gulf Coast views and beach access",
    distance: "0.82 miles",
    rating: 4.4,
    reviews: 678,
    price: 95,
    currency: "$",
    amenities: ["Pool", "Free WiFi", "Restaurant"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 27.8006,
    lng: -97.3964
  },
  {
    id: 9,
    name: "San Diego Downtown Navy Lodge",
    description: "Urban location near Gaslamp Quarter",
    distance: "1.12 miles",
    rating: 4.5,
    reviews: 1567,
    price: 119,
    currency: "$",
    discount: "Advance Purchase",
    amenities: ["Free WiFi", "Fitness Center", "Restaurant", "Parking"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 32.7174,
    lng: -117.1628
  },
  {
    id: 10,
    name: "Hickam Family Suites",
    description: "Spacious suites perfect for families",
    distance: "0.34 miles",
    rating: 4.7,
    reviews: 934,
    price: 145,
    currency: "$",
    amenities: ["Pool", "Free WiFi", "Restaurant", "Fitness Center", "Coffee Bar"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 21.3206,
    lng: -157.9499
  },
  {
    id: 11,
    name: "Virginia Beach Oceanfront",
    description: "Beachfront luxury with full amenities",
    distance: "0.41 miles",
    rating: 4.8,
    reviews: 1876,
    price: 165,
    currency: "$",
    discount: "Military Rate",
    amenities: ["Pool", "Free WiFi", "Restaurant", "Fitness Center", "Parking", "Coffee Bar", "Beach Access"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 36.8529,
    lng: -75.9780
  },
  {
    id: 12,
    name: "Jacksonville Riverfront",
    description: "Historic St. Johns River location",
    distance: "0.67 miles",
    rating: 4.3,
    reviews: 543,
    price: 89,
    currency: "$",
    amenities: ["Free WiFi", "Restaurant", "Parking"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 30.3322,
    lng: -81.6557
  },
  {
    id: 13,
    name: "Newport Harbor View",
    description: "Panoramic views of Newport Harbor",
    distance: "0.38 miles",
    rating: 4.6,
    reviews: 1089,
    price: 129,
    currency: "$",
    discount: "Seasonal Offer",
    amenities: ["Pool", "Free WiFi", "Fitness Center", "Restaurant", "Parking"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 41.4901,
    lng: -71.3128
  },
  {
    id: 14,
    name: "Bremerton Bay Lodge",
    description: "Ferry accessible to Seattle",
    distance: "0.94 miles",
    rating: 4.4,
    reviews: 467,
    price: 79,
    currency: "$",
    amenities: ["Free WiFi", "Parking", "Coffee Bar"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 47.5671,
    lng: -122.6326
  },
  {
    id: 15,
    name: "Norfolk Naval Station",
    description: "On-base convenience and security",
    distance: "0.15 miles",
    rating: 4.5,
    reviews: 2103,
    price: 72,
    currency: "$",
    discount: "Extended Stay",
    amenities: ["Free WiFi", "Restaurant", "Fitness Center", "Parking"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 36.8508,
    lng: -76.2859
  },
  {
    id: 16,
    name: "Corpus Christi Marina",
    description: "Waterfront dining and activities",
    distance: "0.56 miles",
    rating: 4.5,
    reviews: 723,
    price: 109,
    currency: "$",
    discount: "Military Discount",
    amenities: ["Pool", "Free WiFi", "Restaurant", "Parking"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 27.8006,
    lng: -97.3964
  },
  {
    id: 17,
    name: "San Diego North County",
    description: "Quiet retreat near Camp Pendleton",
    distance: "1.45 miles",
    rating: 4.4,
    reviews: 892,
    price: 99,
    currency: "$",
    amenities: ["Pool", "Free WiFi", "Fitness Center", "Coffee Bar"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 33.1581,
    lng: -117.3506
  },
  {
    id: 18,
    name: "Waikiki Military Resort",
    description: "Premium location steps from Waikiki Beach",
    distance: "0.89 miles",
    rating: 4.9,
    reviews: 3245,
    price: 189,
    currency: "$",
    discount: "Honors Discount",
    amenities: ["Pool", "Free WiFi", "Restaurant", "Fitness Center", "Parking", "Coffee Bar", "Beach Access"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 21.2767,
    lng: -157.8223
  },
  {
    id: 19,
    name: "Chesapeake Bay Lodge",
    description: "Scenic Chesapeake Bay views",
    distance: "0.71 miles",
    rating: 4.6,
    reviews: 1156,
    price: 115,
    currency: "$",
    discount: "Weekly Rate",
    amenities: ["Pool", "Free WiFi", "Restaurant", "Fitness Center", "Parking"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 36.8354,
    lng: -76.2590
  },
  {
    id: 20,
    name: "Pensacola Beach Lodge",
    description: "Gulf Coast paradise for families",
    distance: "0.63 miles",
    rating: 4.7,
    reviews: 1432,
    price: 139,
    currency: "$",
    discount: "Advance Purchase",
    amenities: ["Pool", "Free WiFi", "Restaurant", "Fitness Center", "Parking", "Beach Access"],
    image: "/01_NL_Corpus_Christi_Exterior.jpg",
    lat: 30.3958,
    lng: -87.3251
  }
];
