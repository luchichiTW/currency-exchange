import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

import { Currency } from './currency.enum';
import { parseCurrencyAmount } from './currency.utils';

export class CurrencyQueryDto {
  @ApiProperty({ example: Currency.JPY, enum: Currency })
  source: Currency;

  @ApiProperty({ example: Currency.USD, enum: Currency })
  target: Currency;

  @ApiProperty({ example: `$1,234,567.89`, type: 'string' })
  @Transform(({ value }) => parseCurrencyAmount(value))
  @IsNumber()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  amount: number;
}
