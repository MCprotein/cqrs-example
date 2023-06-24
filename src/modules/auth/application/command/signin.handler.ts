import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { SignInCommand } from './signin.command'
import { Inject, UnauthorizedException } from '@nestjs/common'
import {
  AuthRepositoryMysql,
  AuthRepositoryPort
} from '../../infrastructure/repository/auth.repository.port'
import { JwtService } from '@nestjs/jwt'

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    @Inject(AuthRepositoryMysql) private readonly authRepository: AuthRepositoryPort,
    private readonly jwtService: JwtService
  ) {}

  async execute(command: SignInCommand): Promise<any> {
    const { email, password } = command
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
