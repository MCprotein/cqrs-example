import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Global()
@Module({
  imports: [
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
    ])
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class KafkaModule {}
