import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map } from 'immutable'

export const activeCourse = createReducer(Map(), {
  [types.SET_ACTIVE_COURSE](state, action) {
    let newState = state.set('id', action.course.id) 
    newState = newState.set('material', action.course.material)
    newState = newState.set('currentSlidePos', action.course.currentSlidePos)
    return newState
  },

  [types.RENDER_SLIDE](state, action) {
    let newState = state.set('currentSlideMaterial', action.slide)
    return newState
  },

  [types.SET_CURRENT_SLIDE_POS](state, action) {
    let newState = state.set('currentSlidePos', action.slidePos) 
    return newState
  },

  [types.VALIDATE_QUIZ](state, action) {
    return state 
  }
})

