import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import {
  AuthRepositoryMysql,
  AuthRepositoryPort
} from '../../infrastructure/repository/auth.repository.port'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AuthRepositoryMysql) private readonly authRepository: AuthRepositoryPort) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authRepository.findOneByEmail(email)
    if (user?.password !== password) {
      throw new UnauthorizedException()
    }
    return user
  }
}
