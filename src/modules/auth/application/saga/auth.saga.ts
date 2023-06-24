import { Injectable } from '@nestjs/common'
import { ICommand, Saga, ofType } from '@nestjs/cqrs'
import { Observable, map } from 'rxjs'
import { SignUpEvent } from '../event/signup.event'
import { SignUpCommand } from '../command/signup.command'

@Injectable()
export class AuthSaga {
  @Saga()
  signup(event$: Observable<any>): Observable<ICommand> {
    return event$.pipe(
      ofType(SignUpEvent),
      map((event: SignUpEvent) => {
        const { username, password, name, nickname, email } = event

        return new SignUpCommand(username, password, name, nickname, email)
      })
    )
  }
}
