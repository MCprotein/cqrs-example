import { CreateUserHandlerDto } from './user.repository.dto'

export interface UserRepositoryPort {
  createOne(user: CreateUserHandlerDto): void
}

export const UserRepositoryMysql = 'user-mysql'
