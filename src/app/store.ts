import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';

import userReducer from '../features/user/userSlice'
import userSearchReducer from '../features/user-search/userSearchSlice'
import repoReducer from '../features/repo/repoDetailsSlice'
import userReposReducer from '../features/user-repos/userReposSlice'
import repoReadmeReducer from '../features/repo-readme/repoReadmeSlice'

export function makeStore() {
  return configureStore({
    reducer: { 
      user: userReducer, 
      userSearch: userSearchReducer,
      repo: repoReducer,
      userRepos: userReposReducer,
      repoReadme: repoReadmeReducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export const wrapper = createWrapper<AppStore>(makeStore);
