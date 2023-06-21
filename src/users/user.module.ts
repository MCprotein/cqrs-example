import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PrismaModule } from 'prisma/prisma.module'
import { UserController } from './user.controller'
import { UserRepositoryMysql } from './user.repository.port'
import { UserRepository } from './user.repository'

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [UserController],
  providers: [{ provide: UserRepositoryMysql, useClass: UserRepository }],
  exports: []
})
export class UserModule {}
