import { CurrencyService } from '../currency.service';
import { Currency } from '../currency.enum';
import { Currencies } from '../currency.type';

describe('CurrencyService', () => {
  let service: CurrencyService;

  const mockCurrencies: Currencies = {
    TWD: {
      TWD: 1,
      JPY: 3.669,
      USD: 0.03281,
    },
    JPY: {
      TWD: 0.26956,
      JPY: 1,
      USD: 0.00885,
    },
    USD: {
      TWD: 30.444,
      JPY: 111.801,
      USD: 1,
    },
  };

  beforeEach(() => {
    service = new CurrencyService(mockCurrencies);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRatio', () => {
    it('should get ratio', () => {
      expect(service.getRatio(Currency.TWD, Currency.USD)).toBe(0.03281);
      expect(service.getRatio(Currency.JPY, Currency.TWD)).toBe(0.26956);
      expect(service.getRatio(Currency.USD, Currency.USD)).toBe(1);
    });
  });

  describe('exchange', () => {
    it('should exchange currency and round to two decimal places', () => {
      expect(
        service.exchange({
          source: Currency.TWD,
          target: Currency.USD,
          amount: 100,
        }),
      ).toBe(3.28);
      expect(
        service.exchange({
          source: Currency.JPY,
          target: Currency.TWD,
          amount: 100,
        }),
      ).toBe(26.96);
      expect(
        service.exchange({
          source: Currency.USD,
          target: Currency.USD,
          amount: 100,
        }),
      ).toBe(100);
    });
  });
});
