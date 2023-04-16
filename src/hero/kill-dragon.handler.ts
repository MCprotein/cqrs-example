import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { KilldragonCommand } from './kill-dragon.command'

@CommandHandler(KilldragonCommand)
// KillDragonCommand 의 Handler 로 등록
export class KillDragonHandler implements ICommandHandler<KilldragonCommand> {
  constructor(private repository: HeroRepository, private publisher: EventPublisher) {}

  async execute(command: KilldragonCommand): Promise<any> {
    const { heroId, dragonId } = command
    // 지금 이 상태는 model과 event publisher 사이의 관계가 없다.
    // const hero = this.repository.findOneById(+heroId)
    // 아래처럼 바꾼다.
    const hero = this.publisher.mergeObjectContext(await this.repository.findOneById(+heroId))

    hero.killEnemy(dragonId)
    // await this.repository.persist(hero)
    hero.commit()
  }
}
