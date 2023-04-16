import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { OrderHandler } from './orders/order.handler'
import { OrderSaga } from './orders/order.saga'
import { ItemRepository } from './items/item.repository'

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [OrderHandler, OrderSaga, ItemRepository]
})
export class AppModule {}
