import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyQueryDto } from './currency.dto';
import { formatCurrencyAmount } from './currency.utils';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly service: CurrencyService) {}

  @Get('exchange')
  exchange(@Query() query: CurrencyQueryDto): string {
    const amount = this.service.exchange(query);

    return formatCurrencyAmount(amount);
  }
}
