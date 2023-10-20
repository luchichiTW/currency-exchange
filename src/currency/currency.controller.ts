import {
  CallHandler,
  Controller,
  ExecutionContext,
  Get,
  Injectable,
  NestInterceptor,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyQueryDto } from './currency.dto';
import { formatCurrencyAmount } from './currency.utils';
import { Observable, map } from 'rxjs';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export interface Response<T> {
  amount: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((amount) => ({
        msg: 'success',
        amount,
      })),
    );
  }
}

class CurrencyRes {
  @ApiProperty({ example: `$1,234,567.89` })
  amount: string;

  @ApiProperty({ example: 'success' })
  msg: 'success';
}
class CurrencyBadRes {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'failure reason' })
  msg: string;
}

@Controller('currency')
export class CurrencyController {
  constructor(private readonly service: CurrencyService) {}

  @UseInterceptors(new TransformInterceptor())
  @Get('exchange')
  @ApiResponse({
    status: 200,
    description: 'The amount of formatted target currency',
    type: CurrencyRes,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: CurrencyBadRes,
  })
  exchange(@Query() query: CurrencyQueryDto): string {
    const amount = this.service.exchange(query);

    return formatCurrencyAmount(amount);
  }
}
