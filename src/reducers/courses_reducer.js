import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map, List, fromJS } from 'immutable'
import Storage from '../lib/storage.js'

export const courses = createReducer(Map(), {
  [types.LOAD_LOCAL_COURSES] (state, action) {
    if (!action.courses) {
      return state
    }
    let newState = Map()
    Object.keys(action.courses).forEach((id) => {
      newState = newState.set(id, Map({
        "id": id, 
        "name": action.courses[id].name
      }))
    })
    return newState
  },

  [types.DOWNLOAD_REMOTE_COURSE](state, action) {
    let courseId = action.course.id
    let courseName = action.course.name
    let lessons = action.course.lessons
    Storage.saveCourse(courseId, courseName, lessons)
    const newState = state.set(courseId, Map({
      "id": courseId,
      "name": action.course.name
    }))
    return newState
  }
})
