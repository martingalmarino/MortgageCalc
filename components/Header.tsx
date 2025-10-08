import React from 'react';
import Link from 'next/link';
import { Home, Calculator } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-neutral-300 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-primary rounded-lg group-hover:bg-primary-dark transition-all duration-200">
              <Calculator className="text-white" size={22} />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-lg font-semibold text-neutral-800">
                Hypoteční kalkulačka
              </h2>
              <p className="text-xs text-neutral-600 -mt-0.5">
                Česká republika
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary transition-colors"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Domů</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
