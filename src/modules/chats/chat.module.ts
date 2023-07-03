import { Module } from '@nestjs/common'
import { ChatGateway } from './chat.gateway'
import { ChatRoomService } from './chat.service'

@Module({
  imports: [],
  controllers: [],
  providers: [ChatGateway, ChatRoomService],
  exports: []
})
export class ChatModule {}
