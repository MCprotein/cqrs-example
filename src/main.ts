import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Transport } from '@nestjs/microservices'
import { PrismaService } from 'prisma/prisma.service'
import { AllExceptionFilter } from './filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const httpAdapterHost = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(httpAdapterHost))

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

  await app.startAllMicroservices()
  await app.listen(port)
}
bootstrap()
