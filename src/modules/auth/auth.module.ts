import { Module, Provider } from '@nestjs/common'
import { SignUpCHandler } from './application/command/signup.handler'
import { CqrsModule } from '@nestjs/cqrs'
import { AuthController } from './interface/auth.controller'
import { PrismaModule } from 'prisma/prisma.module'
import { AuthSaga } from './application/saga/auth.saga'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthRepositoryMysql } from './infrastructure/repository/auth.repository.port'
import { AuthRepository } from './infrastructure/repository/auth.repository'
import { LocalStrategy } from './application/strategy/local.strategy'

const Sagas: Provider[] = [AuthSaga]

const Handlers: Provider[] = [SignUpCHandler]

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    PrismaModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '2h' }
        }
      }
    }),
    LocalStrategy
  ],
  controllers: [AuthController],
  providers: [{ provide: AuthRepositoryMysql, useClass: AuthRepository }, ...Sagas, ...Handlers],
  exports: []
})
export class AuthModule {}
