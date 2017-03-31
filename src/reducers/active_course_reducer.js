import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map } from 'immutable'

export const activeCourse = createReducer(Map(), {
  [types.SET_ACTIVE_COURSE](state, action) {
    console.log("In active course reducer")
    console.log(action.course)
    let newState = state.set('id', action.course.id) 
    newState = newState.set('material', action.course.material)
    newState = newState.set('currentSlideAt', action.course.currentSlideAt)
    return newState
  }
})

