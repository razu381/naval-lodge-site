import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import SearchWidget from '@/components/shared/SearchWidget';
import LocationCard from '@/components/shared/LocationCard';
import StatsBar from '@/components/shared/StatsBar';
import { LOCATIONS } from '@/data/locations';
import { STATS } from '@/data/constants';

export default function Homepage2() {
  return (
    <>
      <Navigation />
      <main>
        <section className="min-h-screen">
          <SearchWidget variant="full" />
        </section>
        <section className="py-25">
          <div className="grid grid-cols-3 gap-px">
            {LOCATIONS.slice(0, 4).map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        </section>
        <StatsBar stats={STATS} />
      </main>
      <Footer />
    </>
  );
}
