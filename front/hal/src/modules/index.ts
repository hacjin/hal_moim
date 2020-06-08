import { combineReducers } from 'redux'
import counter from './counter'
import moim from './moim'
import myInfo from './myInfo'

const rootReducer = combineReducers({
  counter,
  moim,
  myInfo,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
