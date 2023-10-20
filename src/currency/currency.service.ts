import { Injectable } from '@nestjs/common';
import { type CurrencyQueryDto } from './currency.dto';
import { Currency } from './currency.enum';

@Injectable()
export class CurrencyService {
  private CURRENCIES = {
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

  getRatio(source: Currency, target: Currency): number {
    return this.CURRENCIES[source][target];
  }

  exchange({ source, target, amount }: CurrencyQueryDto): number {
    return Math.round(amount * this.getRatio(source, target) * 100) / 100;
  }
}
