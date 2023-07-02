import { Injectable } from '@nestjs/common'
import { IClient } from './chat.interface'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class ChatRoomService {
  private chatRoomList: Record<string, any>
  constructor() {
    this.chatRoomList = {
      'room:lobby': {
        roomId: 'room:lobby',
        roomName: '로비',
        adminId: null
      }
    }
  }

  createChatRoom(client: IClient, roomName: string): void {
    const roomId = `room:${uuidv4()}`
    const nickname: string = client.data.nickname
    this.chatRoomList[roomId] = {
      roomId,
      adminId: client.id,
      roomName
    }
    client.data.roomId = roomId
    client.rooms.clear()
    client.join(roomId)
    client.emit('getMessage', {
      id: null,
      nickname: '안내',
      message: `${nickname}님이 ${roomName}방을 생성하였습니다.`
    })
  }

  enterChatRoom(client: IClient, roomId: string) {
    client.data.roomId = roomId
    client.rooms.clear()
    client.join(roomId)
    const { nickname } = client.data
    const { roomName } = this.getChatRoom(roomId)
    client.to(roomId).emit('getMessage', {
      id: null,
      nickname: '안내',
      message: `${nickname}님이 ${roomName}방에 접속하였습니다.`
    })
  }

  exitChatRoom(client: IClient, roomId: string) {
    client.data.roomId = 'room:lobby'
    client.rooms.clear()
    client.join(`room:lobby`)
    const { nickname } = client.data
    client.to(roomId).emit('getMessage', {
      id: null,
      nickname: '안내',
      message: `${nickname}님이 방에서 나갔습니다.`
    })
  }

  getChatRoom(roomId: string) {
    return this.chatRoomList[roomId]
  }

  getChatRoomList(): Record<string, any> {
    return this.chatRoomList
  }

  deleteChatRoom(roomId: string) {
    delete this.chatRoomList[roomId]
  }
}
