import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { SignUpCommand } from './signup.command'
import { Inject } from '@nestjs/common'
import { UserRepositoryMysql, UserRepositoryPort } from '../../infrastructure/user.repository.port'
import { Auth } from '../../domain/auth.domain'

@CommandHandler(SignUpCommand)
export class SignUpCHandler implements ICommandHandler<SignUpCommand> {
  constructor(@Inject(UserRepositoryMysql) private readonly userRepository: UserRepositoryPort) {}
  async execute(command: SignUpCommand): Promise<void> {
    const { username, password, name, nickname, email } = command
    const auth = Auth.create({ username, password, name, nickname, email })

    this.userRepository.createOne(auth.getCreateUser)
  }
}
