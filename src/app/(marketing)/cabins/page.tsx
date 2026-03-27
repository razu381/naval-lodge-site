import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';

export default function CabinsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-syne font-extrabold text-6xl text-text mb-4">Cabins</h1>
          <p className="text-text-muted text-lg">Coming soon...</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
