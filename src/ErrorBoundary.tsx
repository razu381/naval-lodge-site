import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-sand-50 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-red-50 rounded-full">
                <AlertTriangle className="w-16 h-16 text-red-500" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="font-display text-3xl md:text-4xl font-medium text-ocean-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-ocean-600 text-lg mb-6 max-w-md mx-auto leading-relaxed">
              We're sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
            </p>

            {/* Error Details (in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-ocean-500 hover:text-ocean-700 transition-colors mb-2">
                  View error details
                </summary>
                <div className="bg-ocean-100 rounded-lg p-4 text-xs text-ocean-700 font-mono overflow-auto max-h-48">
                  <pre className="whitespace-pre-wrap">{this.state.error.toString()}</pre>
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={this.handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-white text-ocean-700 rounded-xl border border-ocean-200 hover:border-teal-accent hover:text-teal-accent transition-all duration-300 group"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform" />
                Try Again
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
              <p className="text-sm text-ocean-500 mb-4">Still having trouble?</p>
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                <a href="/locations" className="text-teal-accent hover:text-teal-accent/80 font-medium transition-colors">
                  Browse Locations
                </a>
                <span className="text-ocean-300">|</span>
                <a href="mailto:support@navylodge.example.com" className="text-teal-accent hover:text-teal-accent/80 font-medium transition-colors">
                  Contact Support
                </a>
                <span className="text-ocean-300">|</span>
                <a href="/faq" className="text-teal-accent hover:text-teal-accent/80 font-medium transition-colors">
                  FAQ
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
