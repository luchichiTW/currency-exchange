import { formatCurrencyAmount, parseCurrencyAmount } from '../currency.utils';

describe('parseCurrencyAmount', () => {
  it('should handle currency amount in $X,XXX,XXX.XX format', () => {
    expect(parseCurrencyAmount('$1,234,567.89')).toBe(1234567.89);
  });

  it('should should not handle currency amount with more than one dot', () => {
    expect(parseCurrencyAmount('$1,234,567.89.')).toBe(NaN);
  });
});

describe('formatCurrencyAmount', () => {
  it('should format currency amount in $X,XXX.XX format', () => {
    expect(formatCurrencyAmount(1234567.89)).toBe('$1,234,567.89');
  });
});
