import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { EventBus } from '@nestjs/cqrs'
import { CreateUserControllerDto } from './auth.controller.dto'
import { SignUpEvent } from '../application/event/signup.event'

@Controller('auth')
export class AuthController {
  constructor(private readonly eventBus: EventBus) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  signup(@Body() body: CreateUserControllerDto) {
    const { username, password, name, nickname, email } = body

    this.eventBus.publish(new SignUpEvent(username, password, name, nickname, email))

    return { result: 'success' }
  }
}
