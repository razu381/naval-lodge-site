import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import SearchWidget from '@/components/shared/SearchWidget';
import LocationCard from '@/components/shared/LocationCard';
import StatsBar from '@/components/shared/StatsBar';
import { LOCATIONS } from '@/data/locations';
import { STATS } from '@/data/constants';

export default function Homepage1() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero with SearchWidget */}
        <section className="min-h-screen">
          <SearchWidget variant="full" />
        </section>

        {/* Locations */}
        <section className="py-25">
          <div className="grid grid-cols-3 gap-px">
            {LOCATIONS.slice(0, 4).map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        </section>

        {/* Stats */}
        <StatsBar stats={STATS} />
      </main>
      <Footer />
    </>
  );
}
