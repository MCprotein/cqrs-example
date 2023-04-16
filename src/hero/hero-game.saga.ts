import { Injectable } from '@nestjs/common'
import { ICommand, Saga, ofType } from '@nestjs/cqrs'
import { Observable, map } from 'rxjs'
import { HeroKilledDragonEvent } from './hero-killed-dragon.event'

@Injectable()
export class HeroesGameSagas {
  @Saga()
  dragonkilled = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(HeroKilledDragonEvent),
      map((event) => new DropAncientItemCommand(event.heroId, fakeItemID))
    )
  }
}
