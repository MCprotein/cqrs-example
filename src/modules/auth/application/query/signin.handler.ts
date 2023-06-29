import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { SignInQuery } from './signin.query'
import { JwtService } from '@nestjs/jwt'

@QueryHandler(SignInQuery)
export class SignInHandler implements IQueryHandler<SignInQuery> {
  constructor(private readonly jwtService: JwtService) {}

  async execute(query: SignInQuery): Promise<any> {
    const { email } = query

    const payload = { email }
    return {
      accessToken: await this.jwtService.signAsync(payload)
    }
  }
}
