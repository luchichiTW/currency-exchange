import { CurrencyService } from '../currency.service';
import { CurrencyController } from '../currency.controller';
import { Test } from '@nestjs/testing';
import { CURRENCIES, Currencies } from '../currency.type';
import { Currency } from '../currency.enum';

describe('CurrencyController', () => {
  let controller: CurrencyController;

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

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [
        CurrencyService,
        {
          provide: CURRENCIES,
          useValue: mockCurrencies,
        },
      ],
    }).compile();

    controller = moduleRef.get<CurrencyController>(CurrencyController);
  });

  it('should exchange currency and round to two decimal places', () => {
    expect(
      controller.exchange({
        source: Currency.USD,
        target: Currency.JPY,
        amount: 1525,
      }),
    ).toBe('$170,496.53');
  });
});
