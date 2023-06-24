import { CreateUserHandlerDto, UserDto } from '../../dto/user.dto'

export interface UserRepositoryPort {
  createOne(user: CreateUserHandlerDto): void
  findOneByEmail(email: string): Promise<UserDto>
}

export const UserRepositoryMysql = 'user-mysql'
