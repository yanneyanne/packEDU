import Storage from '../lib/storage'
import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { List, Map } from 'immutable'

export const interactions = createReducer(Map(), {
  [types.ADD_INTERACTION](state, action) {
    if (state.has(action.currentSlidePos))
      return state
    return state.set(action.currentSlidePos, Map())
  },

  [types.VALIDATE_INTERACTION](state, action) {
    //This call to storage maybe should be in the actions
    let interactionState = state.get(action.currentSlidePos)
    let newInteractionState = interactionState.set('input', action.input)
    newInteractionState = newInteractionState.set('isCorrect', action.isCorrect)
    let newState = state.set(action.currentSlidePos, newInteractionState)
    return newState
  }

})

