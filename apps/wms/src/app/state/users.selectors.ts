import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState } from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const usersState =
  createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const getUser = createSelector(
  usersState,
  (state: UsersState) => state.user
);

export const getUserIsAuth = createSelector(
  usersState,
  (state: UsersState) => state.isAuthenticated
);