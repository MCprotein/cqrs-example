import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { OrderHandler } from './orders/order.handler'
import { OrderSaga } from './orders/order.saga'
import { ItemRepository } from './items/item.repository'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { PostModule } from './posts/post.module'
import { PrismaModule } from 'prisma/prisma.module'
import { UserModule } from './modules/users/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ChatModule } from './modules/chats/chat.module'

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: 'NestJS-Module',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const kafkaBroker1 = configService.getOrThrow('KAFKA_BROKER_1')
          const kafkaBroker2 = configService.getOrThrow('KAFKA_BROKER_2')
          const kafkaBroker3 = configService.getOrThrow('KAFKA_BROKER_3')
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'NestJS-Client-Module',
                brokers: [kafkaBroker1, kafkaBroker2, kafkaBroker3]
              },
              consumer: {
                groupId: 'NestJS-Consumer-GroupId-Module'
              }
            }
          }
        }
      }
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static')
    }),
    PrismaModule,
    UserModule,
    PostModule,
    AuthModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [OrderHandler, OrderSaga, ItemRepository]
})
export class AppModule {}
