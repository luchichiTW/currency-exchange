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

@Controller('currency')
export class CurrencyController {
  constructor(private readonly service: CurrencyService) {}

  @UseInterceptors(new TransformInterceptor())
  @Get('exchange')
  exchange(@Query() query: CurrencyQueryDto): string {
    const amount = this.service.exchange(query);

    return formatCurrencyAmount(amount);
  }
}
