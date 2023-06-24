import { CreateUserRepositoryDto, UserDto } from './auth.repository.dto'

export interface AuthRepositoryPort {
  createOne(user: CreateUserRepositoryDto): void
  findOneByEmail(email: string): Promise<UserDto>
}

export const AuthRepositoryMysql = 'auth-mysql'
