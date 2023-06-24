import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PrismaModule } from 'prisma/prisma.module'
import { UserSaga } from './application/user.saga'
import { CreateUserHandler } from './application/user.handler'
import { UserController } from './interface/user.controller'
import { UserRepositoryMysql } from './infrastructure/repository/user.repository.port'
import { UserRepository } from './infrastructure/repository/user.repository'

const Sagas = [UserSaga]
const Handlers = [CreateUserHandler]
const Repositories: Provider[] = [UserRepository]
@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [UserController],
  providers: [
    { provide: UserRepositoryMysql, useClass: UserRepository },
    ...Sagas,
    ...Handlers,
    ...Repositories
  ],
  exports: [UserRepository]
})
export class UserModule {}
