import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { LocalStrategyQuery } from './local-strategy.query'
import { Inject, UnauthorizedException } from '@nestjs/common'
import {
  AuthRepositoryMysql,
  AuthRepositoryPort
} from '../../infrastructure/repository/auth.repository.port'

@QueryHandler(LocalStrategyQuery)
// 로그인하면 username, password 검증해서 user 정보 controller 에 넘겨줌 req.user
export class LocalStrategyHandler implements IQueryHandler<LocalStrategyQuery> {
  constructor(@Inject(AuthRepositoryMysql) private readonly authRepository: AuthRepositoryPort) {}

  async execute(query: LocalStrategyQuery): Promise<any> {
    const { email, password: inputPassword } = query
    const user = await this.authRepository.findOneByEmail(email)

    if (user?.password !== inputPassword) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.')
    }

    const { password, ...result } = user
    return result
  }
}
