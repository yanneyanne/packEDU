import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { List, Map } from 'immutable'

export const storedCourses = createReducer(List(), {

  [types.SET_STORED_REMOTE_COURSES](state, action) {
   if (!action.courses) {
     return state
   }
    let newStoredCourses = List()
    for (var id in action.courses) {
      newStoredCourses = newStoredCourses.push(Map({
        "id": id,
       "asasd": action.courses[id]
      }))
    }
    return newStoredCourses
    }
})

