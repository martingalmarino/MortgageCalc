import React from 'react';
import Link from 'next/link';
import { Home, Calculator, TrendingDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 shadow-sm" style={{ background: '#059669' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-200">
              <Calculator className="text-white" size={22} />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-lg font-semibold text-white">
                Hypoteční kalkulačka
              </h2>
              <p className="text-xs text-white/80 -mt-0.5">
                Česká republika
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Domů</span>
            </Link>
            <Link 
              href="/compare-mortgage-rates"
              className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              <TrendingDown size={18} />
              <span className="hidden sm:inline">Sazby bank</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
