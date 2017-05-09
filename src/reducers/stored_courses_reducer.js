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
      console.log(id)
        console.log(action.courses[id])
      newStoredCourses = newStoredCourses.push(Map({
        "id": id,
       "name": action.courses[id]['name']
      }))
    }
    return newStoredCourses
    }
})

