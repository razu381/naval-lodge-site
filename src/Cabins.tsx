import React from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Menu,
  X,
  MapPin,
  Heart,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Wifi,
  PawPrint,
  Waves,
  Coffee,
  Users,
  Flame
} from 'lucide-react';

const cabinsData = {
  featured: [
    { id: 1, title: "Whispering Pine Cabin", location: "Big Sky, Montana", price: 285, image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", rating: 4.9 },
    { id: 2, title: "Mountain Lake Retreat", location: "Lake Tahoe, Colorado", price: 320, image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80", rating: 4.8 },
    { id: 3, title: "Alpine Springs Lodge", location: "Park City, Utah", price: 245, image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80", rating: 4.7 },
  ],
  montana: [
    { id: 4, title: "Silver Creek Escape", location: "West Yellowstone, MT", price: 195, image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", rating: 4.9 },
    { id: 5, title: "Glacier View Cabin", location: "Whitefish, MT", price: 275, image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80", rating: 4.8 },
    { id: 6, title: "Bitterroot Valley Cabin", location: "Hamilton, MT", price: 180, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", rating: 4.7 },
  ],
  colorado: [
    { id: 7, title: "Aspen Ridge Retreat", location: "Aspen, CO", price: 350, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", rating: 4.9 },
    { id: 8, title: "Bear Lake Cottage", location: "Estes Park, CO", price: 220, image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", rating: 4.8 },
    { id: 9, title: "Crested Butte Cabin", location: "Crested Butte, CO", price: 195, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", rating: 4.6 },
  ],
  utah: [
    { id: 10, title: "Ski-in Chalet", location: "Snowbird, UT", price: 290, image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80", rating: 4.8 },
    { id: 11, title: "Red Rock Haven", location: "Moab, UT", price: 175, image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", rating: 4.7 },
    { id: 12, title: "Provo River Cabin", location: "Provo, UT", price: 210, image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80", rating: 4.9 },
  ],
  georgia: [
    { id: 13, title: "Blue Ridge Mountain Cabin", location: "Blue Ridge, GA", price: 165, image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80", rating: 4.8 },
    { id: 14, title: "Tallulah Falls Retreat", location: "Tallulah Falls, GA", price: 145, image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80", rating: 4.7 },
    { id: 15, title: "Dawsonville Forest Cabin", location: "Dawsonville, GA", price: 130, image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", rating: 4.6 },
  ],
};

const amenities = [
  { icon: Wifi, label: "WiFi" },
  { icon: PawPrint, label: "Pet Friendly" },
  { icon: Waves, label: "Hot Tub" },
  { icon: Coffee, label: "Kitchen" },
  { icon: Users, label: "Fireplace" },
];

export default function Cabins() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [favorites, setFavorites] = React.useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const CabinCard = ({ cabin }: { cabin: typeof cabinsData.featured[0] }) => (
    <div className="group bg-white rounded-[1.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-stone-100/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={cabin.image} 
          alt={cabin.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <button 
          onClick={() => toggleFavorite(cabin.id)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${favorites.includes(cabin.id) ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} 
          />
        </button>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl font-medium text-slate-900 mb-2">{cabin.title}</h3>
        <p className="text-slate-500 text-sm mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-500" /> {cabin.location}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-slate-900 font-semibold">${cabin.price}<span className="text-slate-500 font-normal text-sm">/night</span></span>
          <span className="text-sm text-amber-600 font-medium flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-500" /> {cabin.rating}
          </span>
        </div>
      </div>
    </div>
  );

  const SectionHeader = ({ title, showViewMore = true }: { title: string; showViewMore?: boolean }) => (
    <div className="flex justify-between items-end mb-8">
      <h2 className="font-serif text-3xl font-medium text-slate-900">{title}</h2>
      {showViewMore && (
        <button className="text-amber-600 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
          View More <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-800">
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all duration-300">
                <Star className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg tracking-tight leading-none text-slate-900">NAVY LODGE</span>
                <span className="text-[10px] tracking-[0.15em] uppercase text-amber-600 font-medium">By Nexcom</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link to="/cabins" className="text-sm font-medium text-slate-900 bg-slate-50 px-4 py-2 rounded-lg">Cabins</Link>
              <Link to="/inns" className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-4 py-2 rounded-lg transition-all"> Inns</Link>
              <Link to="/locations" className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-4 py-2 rounded-lg transition-all">Locations</Link>
              <div className="w-px h-4 bg-slate-200 mx-2"></div>
              <Link to="/signin" className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-4 py-2 rounded-lg transition-all">Sign In</Link>
              <Link to="/signup" className="text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 px-5 py-2 rounded-lg transition-all shadow-lg shadow-slate-900/10">Create Account</Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 px-4 pt-2 pb-4 space-y-1 shadow-xl">
            <Link to="/cabins" className="block px-3 py-3 text-sm font-medium text-slate-900 bg-slate-50 rounded-lg">Cabins</Link>
            <Link to="/inns" className="block px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Inns</Link>
            <Link to="/locations" className="block px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Locations</Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="font-serif text-5xl md:text-6xl font-medium text-slate-900 mb-4">
                Curated <span className="text-amber-600 italic">Mountain Cabins</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-md leading-relaxed mb-8">
                Escape to handpicked cabins in the most scenic locations. Experience nature without sacrificing comfort.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                    <amenity.icon className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-slate-600">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80" 
                  alt="Mountain Cabin"
                  className="w-full h-[400px] object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                  <div className="text-3xl font-bold text-slate-900">50+</div>
                  <div className="text-sm text-slate-500">Unique Cabins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Featured Vacation Cabin Rentals" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {cabinsData.featured.map(cabin => (
              <CabinCard key={cabin.id} cabin={cabin} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-12">
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-amber-500 hover:text-amber-500 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="w-2 h-2 rounded-full bg-slate-200"></span>
              <span className="w-2 h-2 rounded-full bg-slate-200"></span>
            </div>
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-amber-500 hover:text-amber-500 transition-all">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* MONTANA SECTION */}
      <section className="py-16 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Montana Cabins" />
          <div className="grid md:grid-cols-3 gap-8">
            {cabinsData.montana.map(cabin => (
              <CabinCard key={cabin.id} cabin={cabin} />
            ))}
          </div>
        </div>
      </section>

      {/* COLORADO SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Colorado Cabins" />
          <div className="grid md:grid-cols-3 gap-8">
            {cabinsData.colorado.map(cabin => (
              <CabinCard key={cabin.id} cabin={cabin} />
            ))}
          </div>
        </div>
      </section>

      {/* UTAH SECTION */}
      <section className="py-16 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Utah Cabins" />
          <div className="grid md:grid-cols-3 gap-8">
            {cabinsData.utah.map(cabin => (
              <CabinCard key={cabin.id} cabin={cabin} />
            ))}
          </div>
        </div>
      </section>

      {/* GEORGIA SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Georgia Cabins" />
          <div className="grid md:grid-cols-3 gap-8">
            {cabinsData.georgia.map(cabin => (
              <CabinCard key={cabin.id} cabin={cabin} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#F7F7F7] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/5">
              <img 
                src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80" 
                alt="Custom Cabin"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
            <div className="md:w-3/5">
              <h2 className="font-serif text-3xl font-medium text-slate-900 mb-4">Can't Find What You're Looking For?</h2>
              <p className="text-slate-600 mb-6">We also offer custom cabin experiences and group bookings. Contact us to plan your perfect mountain getaway.</p>
              <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-slate-800 pb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-slate-900" fill="currentColor" />
              </div>
              <span className="font-bold text-lg text-white">NAVY LODGE</span>
            </div>
            <p className="text-sm">Premium lodging for military families worldwide.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase">Reservations</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amber-400">Book a Room</a></li>
              <li><a href="#" className="hover:text-amber-400">Special Offers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase">About</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amber-400">Our Story</a></li>
              <li><a href="#" className="hover:text-amber-400">Locations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>1-800-NAVY-INN</li>
              <li>Virginia Beach, VA</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-xs text-center">
          <p>&copy; {new Date().getFullYear()} Navy Exchange Service Command. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}