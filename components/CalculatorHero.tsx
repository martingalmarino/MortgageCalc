import React, { useState } from 'react';
import { Shield, TrendingUp, Clock, Lightbulb, MapPin } from 'lucide-react';
import CalculatorForm from './CalculatorForm';
import ResultSummary from './ResultSummary';
import { calculateMortgage, MortgageInputs, MortgageResults, getReferenceInterestRate } from '@/lib/mortgageCalc';
import { citiesCZ } from '@/lib/citiesCZ';

interface CalculatorHeroProps {
  cityName?: string;
  defaultRate?: number;
}

export default function CalculatorHero({ cityName, defaultRate }: CalculatorHeroProps) {
  const [results, setResults] = useState<MortgageResults | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const referenceRate = defaultRate || getReferenceInterestRate();

  const handleCalculate = (inputs: MortgageInputs) => {
    const calculatedResults = calculateMortgage(inputs);
    setResults(calculatedResults);
    
    // Smooth scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const citySlug = e.target.value;
    if (citySlug) {
      window.location.href = `/cz/hypotecni-kalkulacka/${citySlug}`;
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#4cec5d] to-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-neutral-800 mb-3">
            Hypoteční kalkulačka {cityName ? `– ${cityName}` : 'pro Českou republiku'} 2025
          </h1>
          
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Spočítejte si měsíční splátku hypotéky a zjistěte, kolik vás bude nemovitost{cityName ? ` v ${cityName === 'Praha' ? 'Praze' : `městě ${cityName}`}` : ''} skutečně stát
          </p>

          {/* City Selector (only on home page) */}
          {!cityName && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={20} />
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  aria-label="Výběr města"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-300 rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all text-base"
                >
                  <option value="">Vyberte město pro specifické informace</option>
                  {citiesCZ.map((city) => (
                    <option key={city.slug} value={city.slug}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-2 text-xs text-neutral-600">
                Kalkulačka funguje stejně pro celou ČR. Výběr města zobrazí místní informace.
              </p>
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Shield className="text-primary" size={18} />
            <span className="font-medium">Zdarma</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <TrendingUp className="text-primary" size={18} />
            <span className="font-medium">Aktuální sazby</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Clock className="text-primary" size={18} />
            <span className="font-medium">Bez registrace</span>
          </div>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-neutral-300">
          <CalculatorForm onCalculate={handleCalculate} defaultRate={referenceRate} />
          
          <div id="results">
            <ResultSummary results={results} />
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-primary bg-primary-light px-4 py-3 rounded-md">
            <Lightbulb className="text-primary flex-shrink-0" size={18} />
            <p>
              <strong>Tip:</strong> Průměrná úroková sazba hypotéky v ČR je aktuálně okolo {referenceRate}%.
              {cityName ? ` Pro ${cityName} platí standardní podmínky českých bank.` : ' Podmínky jsou shodné pro celou Českou republiku.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
