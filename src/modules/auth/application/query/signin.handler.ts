import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { SignInQuery } from './signin.query'
import { Inject, UnauthorizedException } from '@nestjs/common'
import {
  AuthRepositoryMysql,
  AuthRepositoryPort
} from '../../infrastructure/repository/auth.repository.port'
import { JwtService } from '@nestjs/jwt'

@QueryHandler(SignInQuery)
export class SignInHandler implements IQueryHandler<SignInQuery> {
  constructor(
    @Inject(AuthRepositoryMysql) private readonly authRepository: AuthRepositoryPort,
    private readonly jwtService: JwtService
  ) {}

  async execute(query: SignInQuery): Promise<any> {
    const { email, password } = query
    const user = await this.authRepository.findOneByEmail(email)

    if (user?.password !== password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.')
    }

    const payload = { userId: user.id, email: user.email }
    return {
      accessToken: await this.jwtService.signAsync(payload)
    }
  }
}
