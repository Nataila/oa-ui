import { combineReducers } from 'redux'

import UserInfo from './UserInfo'

export const rootReducer = combineReducers({
  UserInfo
})

export type RootState = ReturnType<typeof rootReducer>
