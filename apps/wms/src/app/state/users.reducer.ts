import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { User } from '../core/models';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
  user: User;
  isAuthenticated: boolean;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialUsersState: UsersState = {
  user: new User(),
  isAuthenticated: false,
};

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.buildUserSession, (state) => ({
    ...state,
  })),
  on(UsersActions.buildUserSessionSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isAuthenticated: true
  })),
  on(UsersActions.buildUserSessionFailed, (state, action) => ({
    ...state,
    user: new User(),
    isAuthenticated: false,
    error: action.error
  }))
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}
