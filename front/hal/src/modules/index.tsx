import { StoreState } from '../types/index'
import Hello from '../components/Hello'
import { connect } from 'react-redux'
import { Dispatch } from 'react'

export const INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM'
export type INCREMENT_ENTHUSIASM = typeof INCREMENT_ENTHUSIASM

export const DECREMENT_ENTHUSIASM = 'DECREMENT_ENTHUSIASM'
export type DECREMENT_ENTHUSIASM = typeof DECREMENT_ENTHUSIASM

export interface IncrementEnthusiasm {
  type: INCREMENT_ENTHUSIASM
}

export interface DecrementEnthusiasm {
  type: DECREMENT_ENTHUSIASM
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm

export function incrementEnthusiasm(): IncrementEnthusiasm {
  return {
    type: INCREMENT_ENTHUSIASM,
  }
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
  return {
    type: DECREMENT_ENTHUSIASM,
  }
}

export function enthusiasm(state: StoreState, action: EnthusiasmAction): StoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 }
    case DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) }
    default:
      return state
  }
}
