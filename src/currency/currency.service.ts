import { Injectable } from '@nestjs/common';
import { type CurrencyQueryDto } from './currency.dto';
import { Currency } from './currency.enum';

const CURRENCIES = {
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

@Injectable()
export class CurrencyService {
  getCurrency(source: Currency, target: Currency): number {
    return CURRENCIES[source][target];
  }

  exchange({ source, target, amount }: CurrencyQueryDto): number {
    return amount * this.getCurrency(source, target);
  }
}
