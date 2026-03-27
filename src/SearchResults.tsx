import React from 'react';
import { MapPin, Star, ChevronRight, Calendar, Droplets, Wifi, Utensils, Dumbbell, Coffee, Waves, Car } from 'lucide-react';
import { format } from 'date-fns';

interface Hotel {
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

const amenityIcons: { [key: string]: React.ReactNode } = {
  Pool: <Droplets className="w-5 h-5" />,
  "Free WiFi": <Wifi className="w-5 h-5" />,
  Restaurant: <Utensils className="w-5 h-5" />,
  "Fitness Center": <Dumbbell className="w-5 h-5" />,
  "Coffee Bar": <Coffee className="w-5 h-5" />,
  "Beach Access": <Waves className="w-5 h-5" />,
  Parking: <Car className="w-5 h-5" />
};

interface SearchResultsProps {
  searchLocation?: string;
  checkIn?: Date;
  checkOut?: Date;
}

export default function SearchResults({ searchLocation = "All Locations", checkIn, checkOut }: SearchResultsProps) {
  const formatDate = (date: Date) => format(date, 'MMM d, yyyy');

  return (
    <div className="min-h-screen bg-sand-50 font-sans text-ocean-800">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-ocean-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-ocean-500">Searching:</span>
            <span className="font-semibold text-teal-accent">{searchLocation}</span>
            {checkIn && checkOut && (
              <>
                <span className="text-ocean-400">|</span>
                <span className="flex items-center gap-1 text-ocean-600">
                  <Calendar className="w-4 h-4" />
                  {formatDate(checkIn)} - {formatDate(checkOut)}
                </span>
              </>
            )}
            <span className="ml-auto text-ocean-500">{sampleHotels.length} results found</span>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {sampleHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 overflow-hidden flex flex-col md:flex-row border border-ocean-100/50"
            >
              {/* Image */}
              <div className="md:w-1/3 relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-64 md:h-full object-cover"
                />
                {hotel.discount && (
                  <div className="absolute top-4 left-4 bg-teal-accent text-ocean-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {hotel.discount}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="md:w-2/3 p-6 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-semibold text-ocean-900 mb-2">{hotel.name}</h3>
                    <p className="text-ocean-500 mb-3">{hotel.description}</p>
                    <div className="flex items-center gap-2 text-sm text-ocean-600">
                      <MapPin className="w-4 h-4 text-teal-accent" />
                      <span>{hotel.distance}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 text-teal-accent fill-teal-accent" />
                    <span className="font-semibold text-sm">{hotel.rating}</span>
                  </div>
                </div>

                {/* Amenity Icons */}
                <div className="flex flex-wrap gap-4 mb-4 text-ocean-500">
                  {hotel.amenities.slice(0, 5).map((amenity) => (
                    <div key={amenity} className="flex items-center gap-1.5 text-xs" title={amenity}>
                      {amenityIcons[amenity]}
                      <span>{amenity}</span>
                    </div>
                  ))}
                  {hotel.amenities.length > 5 && (
                    <span className="text-xs text-ocean-400">+{hotel.amenities.length - 5} more</span>
                  )}
                </div>

                {/* Reviews */}
                <div className="mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'text-teal-accent fill-teal-accent' : 'text-ocean-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-ocean-500 mt-1">
                    Rating: {hotel.rating} out of 5.0 based on {hotel.reviews} reviews
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-ocean-100">
                  <div>
                    <p className="text-xs text-ocean-500 mb-1">From*</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-ocean-900">{hotel.currency}{hotel.price}</span>
                      <span className="text-sm text-ocean-500">/ night</span>
                    </div>
                    <p className="text-xs text-teal-accent mt-1">{hotel.discount}</p>
                  </div>
                  <button className="bg-teal-accent hover:bg-teal-accent/80 text-ocean-900 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-accent/20 flex items-center gap-2 group cursor-pointer">
                    View Details
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
