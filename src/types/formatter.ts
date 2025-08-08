export interface Formatter {
  formatAmount: (amount: number, currency?: string) => string;
}
