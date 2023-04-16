import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { OrderCommand } from './order.command'
import { ItemRepository } from 'src/items/item.repository'

@CommandHandler(OrderCommand)
export class OrderHandler implements ICommandHandler<OrderCommand> {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly publisher: EventPublisher
  ) {}
  async execute(command: OrderCommand): Promise<any> {
    const { orderTransactionGUID, orderAmount, orderItem, orderUserGUID } = command

    console.log(`Make a bid on ${orderItem}, with userID: ${orderUserGUID}, amount: ${orderAmount}`)

    const item = this.publisher.mergeObjectContext(await this.itemRepository.getItemById(orderItem))
    item.orderOnItem(orderTransactionGUID, orderUserGUID, orderAmount)
    item.commit()
  }
}
