/**
 * Mortgage Calculator Utility Functions
 * Formula: M = P * r * (1+r)^n / ((1+r)^n - 1)
 * where M = monthly payment, P = principal, r = monthly rate, n = total months
 */

export interface MortgageInputs {
  propertyPrice: number;
  downPayment: number; // as amount in CZK
  interestRate: number; // annual percentage
  termYears: number;
}

export interface MortgageResults {
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
  principal: number;
  downPaymentAmount: number;
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResults {
  const { propertyPrice, downPayment, interestRate, termYears } = inputs;

  // Calculate principal (loan amount)
  const principal = propertyPrice - downPayment;

  // Handle edge case: no loan needed
  if (principal <= 0) {
    return {
      monthlyPayment: 0,
      totalRepayment: 0,
      totalInterest: 0,
      principal: 0,
      downPaymentAmount: downPayment,
    };
  }

  // Handle edge case: 0% interest
  if (interestRate === 0) {
    const monthlyPayment = principal / (termYears * 12);
    return {
      monthlyPayment,
      totalRepayment: principal,
      totalInterest: 0,
      principal,
      downPaymentAmount: downPayment,
    };
  }

  // Convert annual rate to monthly decimal
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = termYears * 12;

  // Calculate monthly payment using amortization formula
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalRepayment = monthlyPayment * totalMonths;
  const totalInterest = totalRepayment - principal;

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalRepayment: Math.round(totalRepayment),
    totalInterest: Math.round(totalInterest),
    principal,
    downPaymentAmount: downPayment,
  };
}

/**
 * Format number as Czech currency
 */
export function formatCZK(amount: number): string {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number with thousands separators
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('cs-CZ').format(num);
}

/**
 * Calculate down payment percentage
 */
export function calculateDownPaymentPercentage(
  propertyPrice: number,
  downPayment: number
): number {
  if (propertyPrice === 0) return 0;
  return Math.round((downPayment / propertyPrice) * 100);
}

/**
 * Get reference interest rate (placeholder for CNB integration)
 */
export function getReferenceInterestRate(): number {
  // Default reference rate for MVP
  // In future: integrate with CNB API
  return 5.5;
}

