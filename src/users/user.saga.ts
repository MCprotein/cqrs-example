import { Injectable } from '@nestjs/common'
import { ICommand, Saga, ofType } from '@nestjs/cqrs'
import { Observable, map } from 'rxjs'
import { CreateUserEvent } from './user.event'
import { CreateUserCommand } from './user.command'

@Injectable()
export class UserSaga {
  @Saga()
  signup(events$: Observable<any>): Observable<ICommand> {
    return events$.pipe(
      ofType(CreateUserEvent),
      map((event: CreateUserEvent) => {
        const { username, password, name, nickname, email } = event
        return new CreateUserCommand(username, password, name, nickname, email)
      })
    )
  }
}
