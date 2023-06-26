import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { QueryBus } from '@nestjs/cqrs'
import { SignInQuery } from '../query/signin.query'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly queryBus: QueryBus) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<any> {
    return await this.queryBus.execute(new SignInQuery(email, password))
  }
}
