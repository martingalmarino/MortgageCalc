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
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-8 shadow-md">
        <p className="text-sm font-medium opacity-90 mb-2">Měsíční splátka</p>
        <p className="text-5xl font-semibold mb-1">
          {formatCZK(results.monthlyPayment)}
        </p>
        <p className="text-sm opacity-80">
          po dobu {results.principal > 0 ? Math.round(results.totalRepayment / results.monthlyPayment / 12) : 0} let
        </p>
      </div>

      {/* Breakdown Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-neutral-300 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary-light rounded-lg">
              <PiggyBank className="text-primary" size={22} />
            </div>
            <p className="text-sm font-medium text-neutral-600">Půjčená částka</p>
          </div>
          <p className="text-2xl font-semibold text-neutral-800">
            {formatCZK(results.principal)}
          </p>
        </div>

        <div className="bg-white border border-neutral-300 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-accent/20 rounded-lg">
              <TrendingUp className="text-accent" size={22} />
            </div>
            <p className="text-sm font-medium text-neutral-600">Celkové úroky</p>
          </div>
          <p className="text-2xl font-semibold text-neutral-800">
            {formatCZK(results.totalInterest)}
          </p>
        </div>

        <div className="bg-white border border-neutral-300 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary-light rounded-lg">
              <Calendar className="text-primary" size={22} />
            </div>
            <p className="text-sm font-medium text-neutral-600">Celkem zaplatíte</p>
          </div>
          <p className="text-2xl font-semibold text-neutral-800">
            {formatCZK(results.totalRepayment)}
          </p>
        </div>
      </div>

      {/* Visual Breakdown */}
      <div className="bg-white border border-neutral-300 rounded-xl p-5 shadow-sm">
        <p className="text-sm font-medium text-neutral-800 mb-4">Struktura splácení</p>
        <div className="flex rounded-lg overflow-hidden h-10 mb-3">
          <div 
            className="bg-primary flex items-center justify-center text-xs text-white font-medium"
            style={{ width: `${100 - interestPercentage}%` }}
          >
            {(100 - interestPercentage).toFixed(0)}%
          </div>
          <div 
            className="bg-accent flex items-center justify-center text-xs text-neutral-800 font-medium"
            style={{ width: `${interestPercentage}%` }}
          >
            {interestPercentage.toFixed(0)}%
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-primary rounded"></span>
            <span className="text-neutral-600">Jistina</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-accent rounded"></span>
            <span className="text-neutral-600">Úroky</span>
          </span>
        </div>
      </div>
    </div>
  );
}
