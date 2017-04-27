import Storage from '../lib/storage'
import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { List, Map } from 'immutable'

export const interactions = createReducer(Map(), {
  [types.ADD_INTERACTION](state, action) {
    let interactionsLeft = state.get('interactionsLeft', 0) 
    return state.set('interactionsLeft', interactionsLeft + 1)
  },

  [types.VALIDATE_INTERACTION](state, action) {
    //This call to storage maybe should be in the actions
    let interactionsLeft = state.get('interactionsLeft')
    let newState = state.set('interactionsLeft', interactionsLeft - 1)
    if (action.isCorrect) {
      let correctAnswers = newState.get('correctAnswers', 0)
      newState = newState.set('correctAnswers', correctAnswers + 1)
    } else {
      let wrongAnswers = newState.get('wrongAnswers', 0)
      newState = newState.set('wrongAnswers', wrongAnswers + 1)
    }
    newState = newState.set('latestInteractionResult', action.isCorrect)
    newState = newState.set('input', action.input)
    return newState
  }

})

