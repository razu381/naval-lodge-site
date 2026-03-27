import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <span className="font-serif text-9xl md:text-[12rem] font-bold text-amber-500/20 leading-none">
            404
          </span>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-amber-50 rounded-full">
            <Home className="w-16 h-16 text-amber-500" />
          </div>
        </div>

        {/* Message */}
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-slate-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-xl border border-slate-200 hover:border-amber-500 hover:text-amber-600 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-slate-900 rounded-xl hover:bg-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 font-semibold"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-slate-500 mb-4">Looking for something else?</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <a href="/" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
              Home
            </a>
            <span className="text-slate-300">|</span>
            <a href="/locations" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
              Locations
            </a>
            <span className="text-slate-300">|</span>
            <a href="/offers" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
              Special Offers
            </a>
            <span className="text-slate-300">|</span>
            <a href="/about" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
              About Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
