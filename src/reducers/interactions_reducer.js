import Storage from '../lib/storage'
import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { List, Map } from 'immutable'

export const interactions = createReducer(Map(), {
  [types.ADD_INTERACTION](state, action) {
    return state.set(action.currentSlidePos, Map())
  },

  [types.VALIDATE_INTERACTION](state, action) {
    //This call to storage maybe should be in the actions
    let interactionState = state.get(action.currentSlidePos)
    console.log("This is the state of the interaction")
    console.log(interactionState)
    let newInteractionState = interactionState.set('input', action.input)
    console.log("The interaction state after setting input")
    console.log(newInteractionState)
    newInteractionState = newInteractionState.set('isCorrect', action.isCorrect)
    console.log("And after setting if its correct")
    console.log(newInteractionState)
    let newState = state.set(action.currentSlidePos, newInteractionState)
    console.log("This is new the state of the interaction")
    console.log(newState.get(action.currentSlidePos))
    return newState
  }

})

