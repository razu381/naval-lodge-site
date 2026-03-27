import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navigation from './components/Navigation';
import './styles/homepage-3.css';

export default function Homepage3() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Track scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0F0F] text-white">
      {/* Vertical Spine Navigation */}
      <Navigation scrollProgress={scrollProgress} />

      {/* Main Content - Offset for vertical nav */}
      <main className="ml-0 lg:ml-[60px] overflow-hidden">

        {/* HERO */}
        <section className="relative px-6 lg:px-12 pt-32 pb-24">

          {/* Ghost Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-[18vw] font-bold tracking-tight text-transparent [text-stroke:1px_rgba(13,148,136,0.08)]">
              LODGE
            </h1>
          </div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-[60%_40%] gap-12 items-center relative z-10">

            {/* LEFT */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs tracking-widest text-teal-500 mb-6"
              >
                MILITARY LODGING
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[clamp(3rem,6vw,6rem)] leading-[0.9] font-semibold tracking-tight"
              >
                Comfort You Can
                <br />
                <span className="text-teal-500">Trust</span>
              </motion.h1>

              {/* Search */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 border border-white/10 bg-white/5 backdrop-blur-md p-4 flex flex-col lg:flex-row gap-4"
              >
                <input className="bg-transparent outline-none flex-1 text-sm text-white placeholder-white/40" placeholder="Destination" />
                <input className="bg-transparent outline-none text-sm text-white placeholder-white/40" placeholder="Dates" />
                <input className="bg-transparent outline-none text-sm text-white placeholder-white/40" placeholder="Guests" />
                <button className="bg-teal-500 text-black px-6 py-3 text-sm font-medium hover:opacity-90 transition">
                  Search
                </button>
              </motion.div>

              {/* Stats */}
              <div className="flex gap-10 mt-12">
                {["200+", "50%", "4.9"].map((stat, i) => (
                  <div key={i}>
                    <p className="text-2xl text-teal-500">{stat}</p>
                    <p className="text-xs text-white/50 font-mono">
                      {["Locations", "Savings", "Rating"][i]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[500px] lg:h-[650px] -mr-12"
            >
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
                alt="Lodge"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md p-4 border border-white/10">
                <p className="text-sm">California, USA</p>
                <p className="text-xs text-white/50">$79 / night</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="border-y border-white/10 py-4 overflow-hidden">
          <div className="flex w-[200%] animate-marquee text-sm font-mono tracking-widest text-white/60">
            <span className="mx-8">GLOBAL COVERAGE</span>
            <span className="mx-8 text-teal-500">TAX FREE RATES</span>
            <span className="mx-8">MILITARY EXCLUSIVE</span>
            <span className="mx-8">SECURE BASE ACCESS</span>
            <span className="mx-8">GLOBAL COVERAGE</span>
            <span className="mx-8 text-teal-500">TAX FREE RATES</span>
            <span className="mx-8">MILITARY EXCLUSIVE</span>
            <span className="mx-8">SECURE BASE ACCESS</span>
          </div>
        </div>

        {/* DESTINATIONS */}
        <section className="px-6 lg:px-12 py-32 relative">

          <div className="absolute text-[12rem] opacity-[0.04] top-10 left-10 font-bold">
            02
          </div>

          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl mb-16">Featured Destinations</h2>

            <div className="grid lg:grid-cols-3 gap-10">
              {[
                {
                  title: "San Diego",
                  price: "$79",
                  img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                },
                {
                  title: "Hawaii",
                  price: "$95",
                  img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                },
                {
                  title: "Virginia",
                  price: "$72",
                  img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-[400px] overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  </div>

                  <div className="mt-4 flex justify-between">
                    <h3>{item.title}</h3>
                    <p className="text-teal-500">{item.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 lg:px-12 py-40 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[clamp(2rem,4vw,3rem)]"
          >
            Ready to Book Your Stay?
          </motion.h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-10 bg-teal-500 text-black px-8 py-4"
          >
            Check Availability
          </motion.button>
        </section>

      </main>
    </div>
  );
}
