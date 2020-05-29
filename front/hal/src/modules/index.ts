import { combineReducers } from 'redux'
import counter from './counter'
import moim from './moim'

const rootReducer = combineReducers({
<<<<<<< HEAD:front/hal/src/modules/index.ts
  counter,
  moim,
=======
  counter
>>>>>>> feature/register:front/hal/src/modules/index.tsx
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
