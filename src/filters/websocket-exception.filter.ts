import { ArgumentsHost, Catch } from '@nestjs/common'
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets'

@Catch(WsException)
export class AllWebsocketExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    super.catch(exception, host)
  }
}
