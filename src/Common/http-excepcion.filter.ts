import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { errorManagment } from 'src/Model/Errors';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(Error: any, host: ArgumentsHost) {
    console.log('hola');
    console.log(Error.keyValue);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { code, message } = errorManagment(Error);

    response.status(code).json({
      statusCode: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
