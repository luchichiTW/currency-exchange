/**
 * Converts a currency string in the format $1,234,567.89 to a number.
 * @param amount The currency string to be converted.
 * @returns The converted number.
 */
export const parseCurrencyAmount = (amount: string) => {
  if (amount.split('.').length > 2) {
    return NaN;
  }

  return Number.parseFloat(amount.replace(/[^0-9.-]+/g, ''));
};

/**
 * @param amount - The number to format as currency.
 * @returns The currency string formatted as "$ X,XXX.XX".
 */
export const formatCurrencyAmount = (amount: number) => {
  return `$${(Math.round(amount * 100) / 100).toLocaleString()}`;
};
