import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Transport } from '@nestjs/microservices'
import { PrismaService } from 'prisma/prisma.service'
import { AllHttpExceptionFilter } from './filters/http-exception.filter'
import { AllWebsocketExceptionFilter } from './filters/websocket-exception.filter'
import { SocketIoAdapter } from './modules/chats/chat.adapter'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors()
  app.setBaseViewsDir(join(__dirname, '..', 'static'))
  app.setViewEngine('ejs')

  const httpAdapterHost = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllHttpExceptionFilter(httpAdapterHost))
  app.useGlobalFilters(new AllWebsocketExceptionFilter())

  const configService = app.get<ConfigService>(ConfigService)
  const port = configService.getOrThrow('PORT')
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  const kafkaBroker1 = configService.getOrThrow('KAFKA_BROKER_1')
  const kafkaBroker2 = configService.getOrThrow('KAFKA_BROKER_2')
  const kafkaBroker3 = configService.getOrThrow('KAFKA_BROKER_3')

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        client: 'NestJS-Client-Main',
        brokers: [kafkaBroker1, kafkaBroker2, kafkaBroker3]
      },
      consumer: {
        groupId: configService.get('KAFKA_CONSUMER_GROUP_ID')
      }
    }
  })

  app.useWebSocketAdapter(new SocketIoAdapter(app))
  await app.startAllMicroservices()
  await app.listen(port)
}
bootstrap()
