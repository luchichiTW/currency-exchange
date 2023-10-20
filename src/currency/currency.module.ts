import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { CURRENCIES, Currencies } from './currency.type';

const currencies: Currencies = {
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

@Module({
  controllers: [CurrencyController],
  providers: [
    CurrencyService,
    {
      provide: CURRENCIES,
      useValue: currencies,
    },
  ],
})
export class CurrencyModule {}
