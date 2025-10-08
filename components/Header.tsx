import React from 'react';
import Link from 'next/link';
import { Home, Calculator } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary rounded-lg group-hover:bg-primary-600 transition-colors">
              <Calculator className="text-white" size={24} />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-lg font-bold text-text-primary">
                Hypoteční kalkulačka
              </h2>
              <p className="text-xs text-text-secondary -mt-1">
                Česká republika
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
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

