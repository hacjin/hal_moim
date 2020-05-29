import { combineReducers } from 'redux'
import counter from './counter'
import moim from './moim'

const rootReducer = combineReducers({
  counter,
  moim,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
