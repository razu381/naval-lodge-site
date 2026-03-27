import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <span className="font-display text-9xl md:text-[12rem] font-bold text-teal-accent/20 leading-none">
            404
          </span>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-teal-accent/10 rounded-full">
            <Home className="w-16 h-16 text-teal-accent" />
          </div>
        </div>

        {/* Message */}
        <h1 className="font-display text-3xl md:text-4xl font-medium text-ocean-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-ocean-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-ocean-700 rounded-xl border border-ocean-200 hover:border-teal-accent hover:text-teal-accent transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 px-6 py-3 bg-teal-accent text-ocean-900 rounded-xl hover:bg-teal-accent/80 transition-all duration-300 shadow-lg shadow-teal-accent/20 hover:shadow-teal-accent/40 hover:-translate-y-0.5 font-semibold"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-ocean-200">
          <p className="text-sm text-ocean-500 mb-4">Looking for something else?</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <a href="/" className="text-teal-accent hover:text-teal-accent/80 font-medium transition-colors">
              Home
            </a>
            <span className="text-ocean-300">|</span>
            <a href="/locations" className="text-teal-accent hover:text-teal-accent/80 font-medium transition-colors">
              Locations
            </a>
            <span className="text-ocean-300">|</span>
            <a href="/offers" className="text-teal-accent hover:text-teal-accent/80 font-medium transition-colors">
              Special Offers
            </a>
            <span className="text-ocean-300">|</span>
            <a href="/about" className="text-teal-accent hover:text-teal-accent/80 font-medium transition-colors">
              About Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
