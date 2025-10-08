import React from 'react';
import { ArrowRight, Building2, CheckCircle, Landmark } from 'lucide-react';

export default function CTACompareBanks() {
  const banks = [
    { name: 'Česká spořitelna' },
    { name: 'ČSOB' },
    { name: 'Komerční banka' },
    { name: 'Raiffeisenbank' },
  ];

  return (
    <div className="my-12 bg-gradient-to-br from-primary-50 to-accent-50 border-2 border-primary-100 rounded-2xl p-8 md:p-10">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex p-3 bg-white rounded-full mb-6 shadow-md">
          <Building2 className="text-primary" size={32} />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Připraveni porovnat hypoteční nabídky?
        </h2>
        
        <p className="text-lg text-text-secondary mb-8">
          Podívejte se na aktuální sazby od nejlepších českých bank a najděte si tu nejvýhodnější hypotéku.
        </p>

        {/* Bank Logos */}
        <div className="flex justify-center items-center gap-6 mb-8 flex-wrap">
          {banks.map((bank, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm"
            >
              <Landmark className="text-primary" size={20} />
              <span className="text-sm font-medium text-text-secondary hidden sm:inline">
                {bank.name}
              </span>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-text-primary">
            <CheckCircle className="text-primary" size={18} />
            <span>Nezávazné porovnání</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-primary">
            <CheckCircle className="text-primary" size={18} />
            <span>Aktuální nabídky</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-primary">
            <CheckCircle className="text-primary" size={18} />
            <span>Zdarma</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="group bg-primary hover:bg-primary-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-3 text-lg">
          Porovnat hypoteční nabídky
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </button>

        <p className="mt-4 text-sm text-text-secondary">
          Vyplnění trvá pouze 2 minuty
        </p>
      </div>
    </div>
  );
}

