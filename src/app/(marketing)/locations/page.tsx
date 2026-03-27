import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import LocationCard from '@/components/shared/LocationCard';
import { LOCATIONS } from '@/data/locations';

export default function LocationsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen py-20">
        <div className="mx-auto max-w-7xl px-8">
          <h1 className="font-syne font-extrabold text-5xl text-text mb-8">All Locations</h1>
          <div className="grid grid-cols-3 gap-px">
            {LOCATIONS.map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
