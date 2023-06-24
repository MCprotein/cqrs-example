import { Module, Provider } from '@nestjs/common'
import { SignUpCHandler } from './application/command/signup.handler'
import { CqrsModule } from '@nestjs/cqrs'
import { AuthController } from './interface/auth.controller'
import { UserRepository } from '../users/infrastructure/repository/user.repository'
import { UserModule } from '../users/user.module'
import { PrismaModule } from 'prisma/prisma.module'
import { AuthSaga } from './application/saga/auth.saga'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { UserRepositoryMysql } from './infrastructure/repository/user.repository.port'

const Sagas: Provider[] = [AuthSaga]

const Handlers: Provider[] = [SignUpCHandler]

@Module({
  imports: [
    CqrsModule,
    UserModule,
    PrismaModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '2h' }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [{ provide: UserRepositoryMysql, useClass: UserRepository }, ...Sagas, ...Handlers],
  exports: []
})
export class AuthModule {}
