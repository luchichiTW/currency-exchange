import { ApiProperty } from '@nestjs/swagger';
import { Currency } from './currency.enum';

export class CurrencyQueryDto {
  @ApiProperty({ example: Currency.JPY, enum: Currency })
  source: Currency;

  @ApiProperty({ example: Currency.USD, enum: Currency })
  target: Currency;

  @ApiProperty({ example: `$1,234,567.89` })
  amount: string;
}
