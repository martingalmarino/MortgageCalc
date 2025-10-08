import React from 'react';
import { ArrowRight, Building2, CheckCircle, Landmark } from 'lucide-react';

export default function CTACompareBanks() {
  const banks = [
    { name: 'Česká spořitelna' },
    { name: 'ČSOB' },
    { name: 'Komerční banka' },
    { name: 'Raiffeisenbank' },
  ];

  const trustChips = [
    'Aktuální sazby',
    'Nezávislé srovnání',
    'Bez registrace',
  ];

  return (
    <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 rounded-2xl p-8 md:p-10 shadow-sm">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex p-3 bg-white backdrop-blur-sm rounded-full mb-6 shadow-sm">
          <Building2 className="text-primary" size={32} />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-textMain mb-4">
          Připraveni porovnat hypoteční nabídky?
        </h2>
        
        <p className="text-lg text-textSecondary mb-6">
          Podívejte se na aktuální sazby od nejlepších českých bank a najděte si tu nejvýhodnější hypotéku.
        </p>

        {/* Trust Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {trustChips.map((chip, index) => (
            <div 
              key={index}
              className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-xs font-medium text-textMain shadow-sm"
            >
              <CheckCircle className="text-accent" size={14} />
              {chip}
            </div>
          ))}
        </div>

        {/* Bank Logos */}
        <div className="flex justify-center items-center gap-6 mb-8 flex-wrap">
          {banks.map((bank, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg shadow-sm border border-cardBorder grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
            >
              <Landmark className="text-textSecondary" size={18} />
              <span className="text-sm font-medium text-textMain hidden sm:inline">
                {bank.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="group bg-primary hover:bg-primaryHover text-white font-medium h-12 px-8 rounded-lg transition-all duration-200 hover:scale-[1.02] inline-flex items-center gap-3 text-base shadow-sm">
          Porovnat hypoteční nabídky
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
        </button>

        <p className="mt-4 text-sm text-textSecondary">
          Vyplnění trvá pouze 2 minuty
        </p>
      </div>
    </div>
  );
}
