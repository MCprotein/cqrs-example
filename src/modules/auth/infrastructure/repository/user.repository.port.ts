import { CreateUserHandlerDto, UserDto } from './user.repository.dto'

export interface UserRepositoryPort {
  createOne(user: CreateUserHandlerDto): void
  findOneByEmail(email: string): Promise<UserDto>
}

export const UserRepositoryMysql = 'user-mysql'
