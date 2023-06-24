import { Body, Controller, Post } from '@nestjs/common'
import { EventBus } from '@nestjs/cqrs'
import { CreateUserEvent } from '../application/user.event'
import { CreateUserControllerDto } from '../dto/user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly eventBus: EventBus) {}

  @Post()
  async signup(@Body() body: CreateUserControllerDto) {
    const { username, password, name, nickname, email } = body
    this.eventBus.publish(new CreateUserEvent(username, password, name, nickname, email))
  }
}