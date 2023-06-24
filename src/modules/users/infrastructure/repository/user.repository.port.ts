import { CreateUserHandlerDto } from '../../dto/user.dto'

export interface UserRepositoryPort {
  createOne(user: CreateUserHandlerDto): void
}

export const UserRepositoryMysql = 'user-mysql'
