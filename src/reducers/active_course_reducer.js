import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map } from 'immutable'

export const activeCourse = createReducer(Map(), {
  [types.SET_ACTIVE_COURSE](state, action) {
    console.log("In active course reducer")
    let newState = state.set('activeCourse', action.courseId) 
    newState = newState.set('courseMaterial', action.material)
    return newState
  }
})
