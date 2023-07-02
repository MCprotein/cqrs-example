import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { WsException } from '@nestjs/websockets'

@Catch()
// websocket 나누기
export class AllHttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    if (!(exception instanceof WsException)) {
      const { httpAdapter } = this.httpAdapterHost

      const ctx = host.switchToHttp()

      const statusCode =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR

      const responseBody = {
        statusCode,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        message: exception.message
      }

      httpAdapter.reply(ctx.getResponse(), responseBody, statusCode)
    }
  }
}
