import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common'
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
import { SignUpControllerDto } from './auth.controller.dto'
import { SignUpEvent } from '../application/event/signup.event'
import { LocalAuthGuard } from '../guards/local-auth.guard'
import { SignInQuery } from '../application/query/signin.query'
import { Request as ExpressRequest } from 'express'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'

interface IRequestIncludeUser extends ExpressRequest {
  user: {
    email: string
  }
}

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

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Request() req: IRequestIncludeUser) {
    return await this.queryBus.execute(new SignInQuery(req.user.email))
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@Request() req) {
    return req.user
  }
}
