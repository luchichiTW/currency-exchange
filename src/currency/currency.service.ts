import { Inject, Injectable } from '@nestjs/common';
import { type CurrencyQueryDto } from './currency.dto';
import { Currency } from './currency.enum';
import { CURRENCIES, Currencies } from './currency.type';

@Injectable()
export class CurrencyService {
  constructor(@Inject(CURRENCIES) private currencies: Currencies) {}

  getRatio(source: Currency, target: Currency): number {
    return this.currencies[source][target];
  }

  exchange({ source, target, amount }: CurrencyQueryDto): number {
    return Math.round(amount * this.getRatio(source, target) * 100) / 100;
  }
}
