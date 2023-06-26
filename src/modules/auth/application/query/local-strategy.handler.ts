import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { LocalStrategyQuery } from './local-strategy.query'
import { Inject } from '@nestjs/common'
import {
  AuthRepositoryMysql,
  AuthRepositoryPort
} from '../../infrastructure/repository/auth.repository.port'
import { PassportStrategy } from '@nestjs/passport'

@QueryHandler(LocalStrategyQuery)
export class LocalStrategy extends PassportStrategy implements IQueryHandler<LocalStrategyQuery> {
  constructor(@Inject(AuthRepositoryMysql) private readonly authRepository: AuthRepositoryPort) {
    super()
  }

  async validate() {}
}
