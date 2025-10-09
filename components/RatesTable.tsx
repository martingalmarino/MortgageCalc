import React from 'react';
import { Landmark, Info } from 'lucide-react';

interface FixedPeriod {
  term: string;
  rate: number;
}

interface BankRate {
  bank: string;
  fixed_periods: FixedPeriod[];
  conditions: string;
  last_updated: string;
  source: string;
}

interface RatesTableProps {
  banks: BankRate[];
}

export default function RatesTable({ banks }: RatesTableProps) {
  // Get all unique terms across all banks
  const allTerms = ['1y', '2y', '3y', '4y', '5y', '7y', '8y', '10y', '15y', '20y'];
  
  // Find the lowest rate for each term
  const lowestRates: Record<string, number> = {};
  allTerms.forEach(term => {
    const rates = banks
      .map(bank => bank.fixed_periods.find(p => p.term === term)?.rate)
      .filter((rate): rate is number => rate !== undefined);
    if (rates.length > 0) {
      lowestRates[term] = Math.min(...rates);
    }
  });

  // Get rate for a specific bank and term
  const getRate = (bank: BankRate, term: string): number | null => {
    return bank.fixed_periods.find(p => p.term === term)?.rate ?? null;
  };

  // Check if rate is the lowest for that term
  const isLowestRate = (rate: number | null, term: string): boolean => {
    if (rate === null) return false;
    return rate === lowestRates[term];
  };

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gradient-to-r from-primary/10 to-accent/10">
              <th className="text-left p-4 font-semibold text-textMain border-b-2 border-primary/20">
                Banka
              </th>
              {allTerms.map(term => (
                <th key={term} className="text-center p-4 font-semibold text-textMain border-b-2 border-primary/20">
                  {term}
                </th>
              ))}
              <th className="text-left p-4 font-semibold text-textMain border-b-2 border-primary/20">
                Podmínky
              </th>
            </tr>
          </thead>
          <tbody>
            {banks.map((bank, idx) => (
              <tr 
                key={idx} 
                className="border-b border-cardBorder hover:bg-neutralBg transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Landmark className="text-primary" size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-textMain">{bank.bank}</div>
                      <div className="text-xs text-textSecondary">
                        Aktualizováno: {new Date(bank.last_updated).toLocaleDateString('cs-CZ')}
                      </div>
                    </div>
                  </div>
                </td>
                {allTerms.map(term => {
                  const rate = getRate(bank, term);
                  const isLowest = rate !== null && isLowestRate(rate, term);
                  return (
                    <td key={term} className="text-center p-4">
                      {rate !== null ? (
                        <span 
                          className={`inline-block px-3 py-1.5 rounded-md font-medium ${
                            isLowest 
                              ? 'bg-primary text-white' 
                              : 'text-textMain'
                          }`}
                        >
                          {rate.toFixed(2)}%
                        </span>
                      ) : (
                        <span className="text-textSecondary">—</span>
                      )}
                    </td>
                  );
                })}
                <td className="p-4">
                  <div className="flex items-start gap-2 max-w-xs">
                    <Info className="text-accent flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm text-textSecondary">{bank.conditions}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {banks.map((bank, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm border border-cardBorder p-4">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-cardBorder">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Landmark className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg text-textMain">{bank.bank}</div>
                <div className="text-xs text-textSecondary">
                  Aktualizováno: {new Date(bank.last_updated).toLocaleDateString('cs-CZ')}
                </div>
              </div>
            </div>
            
            {/* Rates Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {allTerms.map(term => {
                const rate = getRate(bank, term);
                const isLowest = rate !== null && isLowestRate(rate, term);
                return (
                  <div key={term} className="flex justify-between items-center">
                    <span className="text-sm text-textSecondary font-medium">{term}:</span>
                    {rate !== null ? (
                      <span 
                        className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                          isLowest 
                            ? 'bg-primary text-white' 
                            : 'text-textMain'
                        }`}
                      >
                        {rate.toFixed(2)}%
                      </span>
                    ) : (
                      <span className="text-textSecondary text-sm">—</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Conditions */}
            <div className="pt-3 border-t border-cardBorder">
              <div className="flex items-start gap-2">
                <Info className="text-accent flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <div className="text-xs font-medium text-textMain mb-1">Podmínky:</div>
                  <div className="text-xs text-textSecondary">{bank.conditions}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

