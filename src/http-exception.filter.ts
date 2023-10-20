import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const res = exception.getResponse();

    if (typeof res === 'string') {
      response.status(status).json({
        statusCode: status,
        msg: res,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        msg: res['message'] || 'unexpected error',
      });
    }
  }
}
