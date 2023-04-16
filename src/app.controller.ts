import { Controller, Get } from '@nestjs/common'
import { EventBus, QueryBus } from '@nestjs/cqrs'
import * as uuid from 'uuid'
import { OrderEvent } from './orders/order.event'

@Controller()
export class AppController {
  constructor(private readonly eventBus: EventBus, private queryBus: QueryBus) {}

  // QueryBus와 EventBus는 Observable
  @Get()
  async bid(): Promise<object> {
    const orderTransactionGUID = uuid.v4()
    // 사용자가 앱 컨트롤러에 도달하면 Order를 위한 새 이벤트가 아래와 같이 시작한다.
    this.eventBus.publish(
      new OrderEvent(orderTransactionGUID, 'Daniel Trimson', 'Samsung LED TV', 50000)
    )
    return { status: 'PENDING' }
  }
}
