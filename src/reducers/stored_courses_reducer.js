import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { List, Map } from 'immutable'

export const storedCourses = createReducer(List(), {

  [types.SET_STORED_REMOTE_COURSES](state, action) {
    let newStoredCourses = List()
    action.courses.forEach((course) => {
      newStoredCourses = newStoredCourses.push(Map({
        "id": course.id,
        "name": course.name
      }))
    })
    return newStoredCourses
    }
})

