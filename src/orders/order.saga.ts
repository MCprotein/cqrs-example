import { Injectable } from '@nestjs/common'
import { ICommand, Saga, ofType } from '@nestjs/cqrs'
import { Observable, map, mergeMap } from 'rxjs'
import { OrderEvent, OrderEventFail, OrderEventSuccess } from './order.event'
import { OrderCommand } from './order.command'

@Injectable()
export class OrderSaga {
  @Saga()
  // Saga는 Command를 반환하는 특별한 이벤트 핸들러로 생각할 수 있다.
  // 이벤트 버스에 게시된 모든 이벤트를 수신하고 반응하기 위해 RxJS를 활용한다.
  // OrderEvent Saga에 의해 OrderCommand가 생성되고 이것은 Command 핸들러에 의해 처리된다.
  createOrder = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderEvent),
      map((event: OrderEvent) => {
        return new OrderCommand(
          event.orderTransactionGUID,
          event.orderUser,
          event.orderItem,
          event.orderAmount
        )
      })
    )
  }

  @Saga()
  createOrderSuccess = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderEventSuccess),
      mergeMap((event: OrderEventSuccess) => {
        console.log('Order Placed')
        return []
      })
    )
  }

  @Saga()
  createOrderFail = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderEventFail),
      mergeMap((event: OrderEventFail) => {
        console.log('Order Placing Failed')
        return []
      })
    )
  }
}
