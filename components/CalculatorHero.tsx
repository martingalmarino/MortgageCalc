import React, { useState } from 'react';
import { Home, Shield, TrendingUp, Clock, Lightbulb } from 'lucide-react';
import CalculatorForm from './CalculatorForm';
import ResultSummary from './ResultSummary';
import { calculateMortgage, MortgageInputs, MortgageResults, getReferenceInterestRate } from '@/lib/mortgageCalc';

interface CalculatorHeroProps {
  cityName?: string;
  defaultRate?: number;
}

export default function CalculatorHero({ cityName, defaultRate }: CalculatorHeroProps) {
  const [results, setResults] = useState<MortgageResults | null>(null);
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

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-primary-50 rounded-full mb-6">
            <Home className="text-primary" size={40} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Hypoteční kalkulačka {cityName ? `– ${cityName}` : ''} 2025
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            Spočítejte si měsíční splátku hypotéky a zjistěte, kolik vás bude nemovitost{cityName ? ` v ${cityName === 'Praha' ? 'Praze' : `městě ${cityName}`}` : ''} skutečně stát
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Shield className="text-primary" size={18} />
            <span className="font-medium">Zdarma</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <TrendingUp className="text-primary" size={18} />
            <span className="font-medium">Aktuální sazby</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Clock className="text-primary" size={18} />
            <span className="font-medium">Bez registrace</span>
          </div>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
          <CalculatorForm onCalculate={handleCalculate} defaultRate={referenceRate} />
          
          <div id="results">
            <ResultSummary results={results} />
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-text-secondary bg-primary-50 px-4 py-3 rounded-lg">
            <Lightbulb className="text-primary flex-shrink-0" size={18} />
            <p>
              <strong>Tip:</strong> Průměrná úroková sazba hypotéky v ČR je aktuálně okolo {referenceRate}%.
              {cityName && ` Pro ${cityName} platí standardní podmínky českých bank.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

