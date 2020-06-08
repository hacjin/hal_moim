import { combineReducers } from 'redux'
import moim from './moim'

const rootReducer = combineReducers({
  moim,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
