import type { Formatter } from './../types/formatter';

const CURRENCY_FRACTION_DIGITS: { [key: string]: number } = {
  'VND': 0, 'JPY': 0, 'KZZ': 0, 'TST': 0, 'BIF': 0, 'BYR': 0, 'CLF': 0, 'CLP': 0, 'DJF': 0, 'GNF': 0, 'ISK': 0,
  'KMF': 0, 'KRW': 0, 'PYG': 0, 'RWF': 0, 'UYI': 0, 'VUV': 0, 'XAF': 0, 'XOF': 0, 'XPF': 0, 'XDR': 0, 'BHD': 3,
  'IQD': 3, 'JOD': 3, 'KWD': 3, 'LYD': 3, 'OMR': 3, 'TND': 3,
};

function formatAmount(amount: number, currency?: string): string {
  const fractionDigits = currency && Object.keys(CURRENCY_FRACTION_DIGITS).includes(currency.toUpperCase())
    ? CURRENCY_FRACTION_DIGITS[currency.toUpperCase()]
    : 2;

  const realAmount = amount / (fractionDigits ? Math.pow(10, fractionDigits) : 1);

  return parseFloat(`${realAmount}`).toFixed(fractionDigits);
}

export default function (): Formatter {
  return {
    formatAmount
  };
}
