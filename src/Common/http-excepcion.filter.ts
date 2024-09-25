import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { errorManagment } from 'src/Model/Errors';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(Error: any, host: ArgumentsHost) {
    console.log(Error.response);
    let code = 500;
    let message =
      'Oops, algo salió mal. Por favor, inténtalo de nuevo más tarde.';

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (Error.keyValue) {
      const data = errorManagment(Error);
      code = data.code;
      message = data.message;
    } else if (Error.response) {
      code = Error.response.statusCode;
      message = Error.response.message;
    }

    response.status(code).json({
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
