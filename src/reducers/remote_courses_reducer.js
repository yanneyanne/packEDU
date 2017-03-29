import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { List } from 'immutable'

export const remoteCourses = createReducer(List(), {
  [types.GET_REMOTE_COURSES](state, action) {
    let newRemoteCourses = List()
    action.courses.forEach((course) => {
      newRemoteCourses = newRemoteCourses.push([course.id, course.name])
    })
    return newRemoteCourses
  }
})

