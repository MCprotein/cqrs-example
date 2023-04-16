import { Injectable } from '@nestjs/common'
import { IItemInterface } from './item.interface'
import { ItemModel } from './item.model'

@Injectable()
export class ItemRepository {
  async getItemById(id: string): Promise<ItemModel> {
    const item: IItemInterface = {
      id,
      amount: 50000
    }
    return new ItemModel(item)
  }
  async getAll() {
    return []
  }
}
