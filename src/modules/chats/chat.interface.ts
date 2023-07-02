import { Socket } from 'socket.io'

export interface IClient extends Socket {
  id: string
  nickname: string
}
