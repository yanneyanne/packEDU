import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { List, Map } from 'immutable'

export const remoteCourses = createReducer(List(), {
  [types.GET_REMOTE_COURSES](state, action) {
    let newRemoteCourses = List()
    action.courses.forEach((course) => {
      newRemoteCourses = newRemoteCourses.push(Map({
        "id": course.id,
        "name": course.name
      }))
    })
    return newRemoteCourses
  }
})
