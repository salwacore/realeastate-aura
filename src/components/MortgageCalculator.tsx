import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Shield, Home } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPrice?: number;
  initialHoa?: number;
  initialTax?: number;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  initialPrice = 18500000,
  initialHoa = 1250,
  initialTax = 185000,
}) => {
  const [homePrice, setHomePrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.25);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [annualTax, setAnnualTax] = useState<number>(initialTax);
  const [monthlyHoa, setMonthlyHoa] = useState<number>(initialHoa);
  const [annualInsurance, setAnnualInsurance] = useState<number>(Math.round(initialPrice * 0.0035));

  const downPaymentAmount = Math.round(homePrice * (downPaymentPercent / 100));
  const principalLoan = Math.max(0, homePrice - downPaymentAmount);

  // Monthly mortgage calculation formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  let monthlyPrincipalInterest = 0;
  if (monthlyRate > 0 && numberOfPayments > 0 && principalLoan > 0) {
    monthlyPrincipalInterest = Math.round(
      (principalLoan * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    );
  }

  const monthlyPropertyTax = Math.round(annualTax / 12);
  const monthlyHomeInsurance = Math.round(annualInsurance / 12);
  const totalMonthlyPayment = monthlyPrincipalInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyHoa;

  // Percentage shares for bar visualization
  const piShare = totalMonthlyPayment > 0 ? (monthlyPrincipalInterest / totalMonthlyPayment) * 100 : 0;
  const taxShare = totalMonthlyPayment > 0 ? (monthlyPropertyTax / totalMonthlyPayment) * 100 : 0;
  const insShare = totalMonthlyPayment > 0 ? (monthlyHomeInsurance / totalMonthlyPayment) * 100 : 0;
  const hoaShare = totalMonthlyPayment > 0 ? (monthlyHoa / totalMonthlyPayment) * 100 : 0;

  return (
    <div className="bg-stone-900 text-stone-100 rounded-lg p-6 sm:p-8 border border-stone-800 shadow-xl">
      <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
            <Calculator className="w-4 h-4" />
            <span>Investment & Financing Modeler</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Mortgage Estimator
          </h3>
        </div>

        <div className="text-right">
          <span className="text-xs uppercase tracking-wider text-stone-400 block">
            Est. Monthly Payment
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-amber-300 tabular-nums">
            ${totalMonthlyPayment.toLocaleString()}
            <span className="text-xs text-stone-400 font-normal"> / mo</span>
          </span>
        </div>
      </div>

      {/* Breakdown Visual Bar */}
      <div className="mb-6">
        <div className="h-3 w-full bg-stone-800 rounded-full overflow-hidden flex">
          <div style={{ width: `${piShare}%` }} className="bg-amber-500 h-full transition-all duration-300" title="Principal & Interest" />
          <div style={{ width: `${taxShare}%` }} className="bg-emerald-500 h-full transition-all duration-300" title="Property Tax" />
          <div style={{ width: `${insShare}%` }} className="bg-blue-500 h-full transition-all duration-300" title="Insurance" />
          <div style={{ width: `${hoaShare}%` }} className="bg-purple-500 h-full transition-all duration-300" title="HOA Dues" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
            <span className="text-stone-300">P&I:</span>
            <span className="font-semibold text-white tabular-nums">${monthlyPrincipalInterest.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-stone-300">Taxes:</span>
            <span className="font-semibold text-white tabular-nums">${monthlyPropertyTax.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
            <span className="text-stone-300">Insurance:</span>
            <span className="font-semibold text-white tabular-nums">${monthlyHomeInsurance.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
            <span className="text-stone-300">HOA:</span>
            <span className="font-semibold text-white tabular-nums">${monthlyHoa.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Sliders & Numerical Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-800 text-xs">
        {/* Home Price */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-stone-300 font-medium">Estate Price</label>
            <span className="font-semibold text-white tabular-nums">${homePrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={1000000}
            max={40000000}
            step={250000}
            value={homePrice}
            onChange={(e) => {
              const val = Number(e.target.value);
              setHomePrice(val);
              setAnnualTax(Math.round(val * 0.01));
              setAnnualInsurance(Math.round(val * 0.0035));
            }}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Down Payment */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-stone-300 font-medium">Down Payment ({downPaymentPercent}%)</label>
            <span className="font-semibold text-white tabular-nums">${downPaymentAmount.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={10}
            max={50}
            step={5}
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-stone-300 font-medium">Interest Rate</label>
            <span className="font-semibold text-white tabular-nums">{interestRate.toFixed(2)}%</span>
          </div>
          <input
            type="range"
            min={3.5}
            max={9.0}
            step={0.125}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-stone-300 font-medium mb-1.5">Loan Term</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setLoanTermYears(30)}
              className={`py-2 px-3 rounded text-center transition-colors cursor-pointer ${
                loanTermYears === 30
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              30-Year Fixed
            </button>
            <button
              type="button"
              onClick={() => setLoanTermYears(15)}
              className={`py-2 px-3 rounded text-center transition-colors cursor-pointer ${
                loanTermYears === 15
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              15-Year Fixed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
