import { Module, Provider } from '@nestjs/common'
import { SignUpCHandler } from './application/command/signup.handler'
import { CqrsModule } from '@nestjs/cqrs'
import { AuthController } from './interface/auth.controller'
import { UserRepositoryMysql } from './infrastructure/user.repository.port'
import { UserRepository } from '../users/infrastructure/repository/user.repository'
import { UserModule } from '../users/user.module'
import { PrismaModule } from 'prisma/prisma.module'
import { AuthSaga } from './application/saga/auth.saga'

const Sagas: Provider[] = [AuthSaga]

const Handlers: Provider[] = [SignUpCHandler]

@Module({
  imports: [CqrsModule, UserModule, PrismaModule],
  controllers: [AuthController],
  providers: [{ provide: UserRepositoryMysql, useClass: UserRepository }, ...Sagas, ...Handlers],
  exports: []
})
export class AuthModule {}
