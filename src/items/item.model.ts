import { AggregateRoot } from '@nestjs/cqrs'
import { IItemInterface } from './item.interface'
import { OrderEventFail, OrderEventSuccess } from 'src/orders/order.event'

export class ItemModel extends AggregateRoot {
  constructor(private readonly item: IItemInterface) {
    super()
  }

  orderOnItem(orderTransactionGUID: string, userID: string, amount: number) {
    try {
      // 비즈니스 로직
      // 주문이 성공하면 새로운 이벤트를 보낸다.
      this.apply(
        new OrderEventSuccess(orderTransactionGUID, this.item.id, amount, {
          email: 'test@test.com',
          id: userID
        })
      )
    } catch (e) {
      // 주문 실패 이벤트를 보낸다.
      this.apply(new OrderEventFail(orderTransactionGUID, e))
    }
  }
}
