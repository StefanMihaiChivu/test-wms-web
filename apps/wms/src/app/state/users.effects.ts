import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, concatMap, map } from 'rxjs';
import * as UsersActions from './users.actions';
import { LocalStorageService, UserService } from '../core/services';
import { User } from '../core/models';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private usersService: UserService
  ) {}

  buildUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if (this.localStorageService.isValidToken()) {
          const userId = this.localStorageService.getUserIdFromToken();
          if (userId) {
            return this.usersService.getUserById(userId).pipe(
              map((user: User) => {
                return UsersActions.buildUserSessionSuccess({ user: user });
              }),
              catchError((error) => {
                console.log(error);
                return of(UsersActions.buildUserSessionFailed({ error }));
              })
            );
          } else {
            return of(
              UsersActions.buildUserSessionFailed({
                error: 'Missing User ID from Token',
              })
            );
          }
        } else {
          return of(
            UsersActions.buildUserSessionFailed({ error: 'Generic Error' })
          );
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(UsersActions.buildUserSessionFailed({ error }));
      })
    )
  );
}
