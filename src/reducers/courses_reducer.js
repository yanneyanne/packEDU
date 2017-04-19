import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map, List, fromJS } from 'immutable'
import Storage from '../lib/storage.js'

export const courses = createReducer(List(), {
  [types.LOAD_LOCAL_COURSES] (state, action) {
    let newState = List()
    Object.keys(action.courses).forEach((key) => {
      newState = newState.push([key, action.courses[key].name])
    })
    return newState
  },

  [types.DOWNLOAD_REMOTE_COURSE](state, action) {
    let courseId = action.course.id
    let courseName = action.course.name
    let lessons = action.course.lessons
    Storage.saveCourse(courseId, courseName, lessons)
    const newState = state.push([action.course.id, action.course.name])
    return newState
  }
})
