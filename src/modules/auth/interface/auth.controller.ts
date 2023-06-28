import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
import { SignUpControllerDto, SignInControllerDto } from './auth.controller.dto'
import { SignUpEvent } from '../application/event/signup.event'
import { SignInCommand } from '../application/command/signin.command'
import { LocalAuthGuard } from '../guards/local-auth.guard'
import { SignInQuery } from '../application/query/signin.query'
import { Request } from 'express'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.ACCEPTED)
  signup(@Body() body: SignUpControllerDto) {
    const { username, password, name, nickname, email } = body

    this.eventBus.publish(new SignUpEvent(username, password, name, nickname, email))

    return { result: 'success' }
  }

  // @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  // async signin(@Body() body: SignInControllerDto) {
  // const { email, password } = body
  // const result = await this.commandBus.execute(new SignInCommand(email, password))

  // return { result }
  // }
  async signin(@Request() req: Request) {
    return await this.queryBus.execute(new SignInQuery())
  }
}
