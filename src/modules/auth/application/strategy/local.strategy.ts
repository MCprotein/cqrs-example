import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { QueryBus } from '@nestjs/cqrs'
import { LocalStrategyQuery } from '../query/local-strategy.query'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly queryBus: QueryBus) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.queryBus.execute(new LocalStrategyQuery(email, password))
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}

// TODO: https://docs.nestjs.com/recipes/passport#extending-guards
