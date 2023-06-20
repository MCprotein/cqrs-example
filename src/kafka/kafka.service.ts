import { Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'

export class KafkaService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('NestJS-Module') private readonly kafkaClient: ClientKafka) {}

  async onModuleInit(): Promise<void> {
    this.kafkaClient.subscribeToResponseOf('post')
    await this.kafkaClient.connect()
  }

  async onModuleDestroy(): Promise<void> {
    await this.kafkaClient.close()
  }
}
