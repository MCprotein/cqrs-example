import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { KilldragonCommand } from './kill-dragon.command'

@Injectable()
export class HeroesGameService {
  constructor(private commandBus: CommandBus) {}

  async killDragon(heroId: string, killDragonDto: KillDragonDto) {
    // 커맨드를 보낸다.
    // 커맨드: {heroId: string, dragonId: string}
    return this.commandBus.execute(new KilldragonCommand(heroId, killDragonDto, dragonId))
  }
}
