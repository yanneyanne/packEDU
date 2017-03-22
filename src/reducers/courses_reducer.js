import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map } from 'immutable'

export const remoteCourses = createReducer(Map(), {
  [types.GET_REMOTE_COURSES](state, action) {
    let newRemoteCourses = {}
    action.courses.forEach((course) => {
      newRemoteCourses[course.id] = course.name;
    })
    const newState =  Map(newRemoteCourses)
    return newState
  }
})
