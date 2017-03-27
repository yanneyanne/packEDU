import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map } from 'immutable'

export const courses = createReducer(Map(), {
  [types.LOAD_LOCAL_COURSES] (state, action) {
    let newRemoteCourses = Map()
    return state
  }
})
