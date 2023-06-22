import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateUserCommand } from './user.command'
import { UserRepositoryMysql, UserRepositoryPort } from './user.repository.port'
import { Inject } from '@nestjs/common'
import { User } from './user.domain'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject(UserRepositoryMysql) private readonly userRepository: UserRepositoryPort) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { username, password, name, nickname, email } = command
    const user = User.create({ username, password, name, nickname, email })

    this.userRepository.createOne(user.getCreateUser)
  }
}
