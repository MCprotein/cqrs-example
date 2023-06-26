import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { CommandBus, EventBus } from '@nestjs/cqrs'
import { SignUpControllerDto, SignInControllerDto } from './auth.controller.dto'
import { SignUpEvent } from '../application/event/signup.event'
import { SignInCommand } from '../application/command/signin.command'
import { LocalAuthGuard } from '../guards/local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly eventBus: EventBus, private readonly commandBus: CommandBus) {}

  @Post('signup')
  @HttpCode(HttpStatus.ACCEPTED)
  signup(@Body() body: SignUpControllerDto) {
    const { username, password, name, nickname, email } = body

    this.eventBus.publish(new SignUpEvent(username, password, name, nickname, email))

    return { result: 'success' }
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() body: SignInControllerDto) {
    const { email, password } = body
    const result = await this.commandBus.execute(new SignInCommand(email, password))

    return { result }
  }
}
