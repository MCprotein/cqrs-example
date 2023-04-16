import { AggregateRoot } from '@nestjs/cqrs'
import { HeroKilledDragonEvent } from './hero-killed-dragon.event'

export class Hero extends AggregateRoot {
  constructor(private id: string) {
    super()
  }

  killEnemy(enemyId: string) {
    // HeroKilledDragonEvent: {heroId: string, dragonId: string}
    // 지금 이 상태는 모델과 EventPublisher 클래스 사이에 관계가 없어서 이벤트를 전달하지 못한다.
    this.apply(new HeroKilledDragonEvent(this.id, enemyId))
  }
}
