import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Sign in:', { email, password });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-sand-50 font-sans text-ocean-800 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group cursor-pointer mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-accent to-teal-light rounded-xl flex items-center justify-center shadow-lg shadow-teal-accent/25 group-hover:shadow-teal-accent/40 group-hover:scale-105 transition-all duration-300">
              <Star className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold text-xl tracking-tight leading-none text-ocean-900">NAVY LODGE</span>
              <span className="text-[10px] tracking-[0.15em] uppercase text-teal-accent font-medium">By Nexcom</span>
            </div>
          </Link>
          <h1 className="font-serif text-3xl font-medium text-ocean-900 mb-2">Welcome Back</h1>
          <p className="text-ocean-600">Sign in to your account</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ocean-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ocean-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-ocean-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-accent focus:border-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ocean-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ocean-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-ocean-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-accent focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-teal-accent border-ocean-300 rounded focus:ring-teal-accent" />
                <span className="ml-2 text-sm text-ocean-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-teal-accent hover:text-teal-accent/80 font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-ocean-900 text-white py-3 rounded-xl font-semibold hover:bg-ocean-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-ocean-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-teal-accent hover:text-teal-accent/80 font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-ocean-500 mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
