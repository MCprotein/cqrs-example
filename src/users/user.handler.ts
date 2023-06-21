import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateUserCommand } from './user.command'
import { UserRepositoryMysql, UserRepositoryPort } from './user.repository.port'
import { Inject } from '@nestjs/common'
import { CreateUserHandlerDto } from './user.dto'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject(UserRepositoryMysql) private readonly userRepository: UserRepositoryPort) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { username, password, name, nickname, email } = command
    const createdAt = new Date()
    const isApproved = 'Y'

    this.userRepository.createOne(new CreateUserHandlerDto())
  }
}
