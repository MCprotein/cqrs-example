import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { IClient } from './chat.interface'

@WebSocketGateway(4000)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private client: Record<string, any>
  constructor() {
    this.client = {}
  }

  @WebSocketServer()
  private server: Server

  handleConnection(client: IClient): void {
    console.log('connected', client.id)
    client.leave(client.id)
    client.data.roomId = `room:lobby`
    client.join(`room:lobby`)
  }

  handleDisconnect(client: IClient) {
    console.log('bye', client.id)
    delete this.client[client.id]
  }

  @SubscribeMessage('sendMessage')
  sendMessage(client: IClient, message: string): void {
    this.server.emit('getMessage', message)
  }
}
