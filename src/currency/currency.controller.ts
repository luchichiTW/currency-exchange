import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyQueryDto } from './currency.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly service: CurrencyService) {}

  @Get('exchange')
  exchange(@Query() query: CurrencyQueryDto): string {
    const amount = this.service.exchange(query);

    return `${(Math.round(amount * 100) / 100).toLocaleString()}`;
  }
}
