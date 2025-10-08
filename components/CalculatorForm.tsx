import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { MortgageInputs } from '@/lib/mortgageCalc';
import { formatNumber } from '@/lib/mortgageCalc';

interface CalculatorFormProps {
  onCalculate: (inputs: MortgageInputs) => void;
  defaultRate?: number;
}

export default function CalculatorForm({ onCalculate, defaultRate = 5.5 }: CalculatorFormProps) {
  const [propertyPrice, setPropertyPrice] = useState<string>('4000000');
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>('20');
  const [interestRate, setInterestRate] = useState<string>(defaultRate.toString());
  const [termYears, setTermYears] = useState<string>('30');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const price = parseFloat(propertyPrice) || 0;
    const downPercent = parseFloat(downPaymentPercent) || 0;
    const downPayment = (price * downPercent) / 100;
    
    onCalculate({
      propertyPrice: price,
      downPayment,
      interestRate: parseFloat(interestRate) || 0,
      termYears: parseFloat(termYears) || 0,
    });
  };

  const formatInputValue = (value: string): string => {
    const num = parseFloat(value.replace(/\s/g, ''));
    return isNaN(num) ? '' : formatNumber(num);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Property Price */}
      <div>
        <label htmlFor="propertyPrice" className="block text-sm font-semibold text-text-primary mb-2">
          Cena nemovitosti
        </label>
        <div className="relative">
          <input
            type="text"
            id="propertyPrice"
            value={formatInputValue(propertyPrice)}
            onChange={(e) => setPropertyPrice(e.target.value.replace(/\s/g, ''))}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors text-lg"
            placeholder="4 000 000"
            required
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary font-medium">
            Kč
          </span>
        </div>
      </div>

      {/* Down Payment */}
      <div>
        <label htmlFor="downPayment" className="block text-sm font-semibold text-text-primary mb-2">
          Vlastní kapitál (záloha)
        </label>
        <div className="relative">
          <input
            type="number"
            id="downPayment"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(e.target.value)}
            min="0"
            max="100"
            step="1"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors text-lg"
            placeholder="20"
            required
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary font-medium">
            %
          </span>
        </div>
        <p className="mt-1 text-sm text-text-secondary">
          Záloha: {formatNumber((parseFloat(propertyPrice) || 0) * (parseFloat(downPaymentPercent) || 0) / 100)} Kč
        </p>
      </div>

      {/* Interest Rate */}
      <div>
        <label htmlFor="interestRate" className="block text-sm font-semibold text-text-primary mb-2">
          Úroková sazba
        </label>
        <div className="relative">
          <input
            type="number"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            min="0"
            max="20"
            step="0.1"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors text-lg"
            placeholder="5.5"
            required
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary font-medium">
            % p.a.
          </span>
        </div>
        <p className="mt-1 text-sm text-text-secondary">
          Průměrná sazba na trhu: {defaultRate}%
        </p>
      </div>

      {/* Term */}
      <div>
        <label htmlFor="term" className="block text-sm font-semibold text-text-primary mb-2">
          Doba splácení
        </label>
        <div className="relative">
          <input
            type="number"
            id="term"
            value={termYears}
            onChange={(e) => setTermYears(e.target.value)}
            min="1"
            max="40"
            step="1"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors text-lg"
            placeholder="30"
            required
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary font-medium">
            let
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full md:w-auto md:px-12 bg-primary hover:bg-primary-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl md:float-right"
      >
        <Calculator size={20} />
        Vypočítat splátku
      </button>
      <div className="clear-both"></div>
    </form>
  );
}

