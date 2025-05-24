import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    
    response.status(404).json({
      statusCode: 404,
      message: 'Resource not found',
      code: HttpStatus.NOT_FOUND
    });
  }
}