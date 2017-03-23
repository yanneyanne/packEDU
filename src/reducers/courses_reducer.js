import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map } from 'immutable'

export const remoteCourses = createReducer(Map(), {
  [types.GET_REMOTE_COURSES](state, action) {
    let newRemoteCourses = Map()
    action.courses.forEach((course) => {
      newRemoteCourses = newRemoteCourses.set(course.id, course.name)
    })
    return newRemoteCourses
  }
})
