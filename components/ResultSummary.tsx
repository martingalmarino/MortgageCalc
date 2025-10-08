import React from 'react';
import { TrendingUp, PiggyBank, Calendar } from 'lucide-react';
import { MortgageResults, formatCZK } from '@/lib/mortgageCalc';

interface ResultSummaryProps {
  results: MortgageResults | null;
}

export default function ResultSummary({ results }: ResultSummaryProps) {
  if (!results) {
    return null;
  }

  const interestPercentage = results.principal > 0 
    ? (results.totalInterest / results.totalRepayment) * 100 
    : 0;

  return (
    <div className="mt-8 space-y-6 animate-fadeIn">
      {/* Main Result Card */}
      <div className="bg-gradient-to-br from-primary to-primary-600 text-white rounded-xl p-8 shadow-xl">
        <p className="text-sm font-medium opacity-90 mb-2">Měsíční splátka</p>
        <p className="text-5xl font-bold mb-1">
          {formatCZK(results.monthlyPayment)}
        </p>
        <p className="text-sm opacity-75">
          po dobu {results.principal > 0 ? Math.round(results.totalRepayment / results.monthlyPayment / 12) : 0} let
        </p>
      </div>

      {/* Breakdown Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-gray-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <PiggyBank className="text-primary" size={24} />
            </div>
            <p className="text-sm font-medium text-text-secondary">Půjčená částka</p>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {formatCZK(results.principal)}
          </p>
        </div>

        <div className="bg-white border-2 border-gray-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-accent-50 rounded-lg">
              <TrendingUp className="text-accent-700" size={24} />
            </div>
            <p className="text-sm font-medium text-text-secondary">Celkové úroky</p>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {formatCZK(results.totalInterest)}
          </p>
        </div>

        <div className="bg-white border-2 border-gray-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Calendar className="text-primary" size={24} />
            </div>
            <p className="text-sm font-medium text-text-secondary">Celkem zaplatíte</p>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {formatCZK(results.totalRepayment)}
          </p>
        </div>
      </div>

      {/* Visual Breakdown */}
      <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
        <p className="text-sm font-semibold text-text-primary mb-4">Struktura splácení</p>
        <div className="flex rounded-lg overflow-hidden h-8 mb-3">
          <div 
            className="bg-primary flex items-center justify-center text-xs text-white font-medium"
            style={{ width: `${100 - interestPercentage}%` }}
          >
            {(100 - interestPercentage).toFixed(0)}%
          </div>
          <div 
            className="bg-accent flex items-center justify-center text-xs text-accent-900 font-medium"
            style={{ width: `${interestPercentage}%` }}
          >
            {interestPercentage.toFixed(0)}%
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-primary rounded"></span>
            <span className="text-text-secondary">Jistina</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-accent rounded"></span>
            <span className="text-text-secondary">Úroky</span>
          </span>
        </div>
      </div>
    </div>
  );
}

