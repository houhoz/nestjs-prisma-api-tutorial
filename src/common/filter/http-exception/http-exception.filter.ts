import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiException } from './api.exception';
// 一个异常过滤器进行自定义的操作

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (exception instanceof ApiException) {
      response.status(status).json({
        code: exception.getErrorCode(),
        timestamp: new Date().toISOString(),
        path: request.url,
        describe: exception.getErrorMessage(),
      });
      return;
    }

    console.log('exception.getResponse() ', exception.getResponse());

    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: (exception.getResponse() as any)?.message || exception.message,
    });
  }
}
