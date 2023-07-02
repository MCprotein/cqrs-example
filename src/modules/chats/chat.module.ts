import { Module } from '@nestjs/common'
import { EventsGateway } from './chat.gateway'

@Module({
  imports: [],
  controllers: [],
  providers: [EventsGateway],
  exports: []
})
export class ChatModule {}
