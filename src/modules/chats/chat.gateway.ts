import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { IClient } from './chat.interface'
import { ChatRoomService } from './chat.service'

@WebSocketGateway(4000, {
  cors: {
    origin: 'http://localhost:3000'
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private client: Record<string, any>
  constructor(private readonly chatRoomservice: ChatRoomService) {}

  @WebSocketServer()
  private server: Server

  handleConnection(client: IClient): void {
    console.log('connected', client.id)
    client.leave(client.id)
    client.data.roomId = `room:lobby`
    client.join(`room:lobby`)
  }

  handleDisconnect(client: IClient) {
    const { roomId } = client.data
    if (roomId !== 'room:lobby' && !this.server.sockets.adapter.rooms.get(roomId)) {
      this.chatRoomservice.deleteChatRoom(roomId)
      this.server.emit('getChatRoomList', this.chatRoomservice.getChatRoomList())
    }
    console.log('disconnected', client.id)
  }

  @SubscribeMessage('sendMessage')
  sendMessage(client: IClient, message: string): void {
    const { roomId } = client.data
    client.to(roomId).emit('getMessage', {
      id: client.id,
      nickname: client.data.nickname,
      message
    })
  }

  @SubscribeMessage('setInit')
  setInit(client: IClient, data: any): any {
    if (client.data.isInit) {
      return
    }

    client.data.nickname = data.nickname || `익명 ${client.id}`
    client.data.isInit = true

    return {
      nickname: client.data.nickname,
      room: {
        roomId: 'room:lobby',
        roomName: '로비'
      }
    }
  }

  @SubscribeMessage('setNickname')
  setNickname(client: IClient, nickname: string): void {
    const { roomId } = client.data
    client.data.nickname = nickname
    client.to(roomId).emit('getMessage', {
      id: null,
      nickname: '안내',
      message: `${client.data.nickname}님이 ${nickname}으로 닉네임을 변경하였습니다.`
    })
  }

  @SubscribeMessage('getChatRoomList')
  getChatRoomList(client: IClient, payload: any) {
    client.emit('getChatRoomLisit', this.chatRoomservice.getChatRoomList())
  }

  @SubscribeMessage('createChatRoom')
  createChatRoom(client: IClient, roomName: string) {
    if (
      client.data.roomId !== 'room:lobby' &&
      this.server.sockets.adapter.rooms.get(client.data.roomId).size === 1
    ) {
      this.chatRoomservice.deleteChatRoom(client.data.roomId)
    }

    this.chatRoomservice.createChatRoom(client, roomName)
    return {
      roomId: client.data.roomId,
      roomName: this.chatRoomservice.getChatRoom(client.data.roomId).roomName
    }
  }

  @SubscribeMessage('enterChatRoom')
  enterChatRoom(client: IClient, roomId: string) {
    if (client.rooms.has(roomId)) {
      return
    }

    if (
      client.data.roomId !== 'room:lobby' &&
      this.server.sockets.adapter.rooms.get(client.data.roomId).size === 1
    ) {
      this.chatRoomservice.deleteChatRoom(client.data.roomId)
    }

    return {
      roomId,
      roomName: this.chatRoomservice.getChatRoom(roomId).roomName
    }
  }
}
