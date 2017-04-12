import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map, List, fromJS } from 'immutable'
import Storage from '../lib/storage.js'

export const courses = createReducer(List(), {
  [types.LOAD_LOCAL_COURSES] (state, action) {
    let newCourses = List()
    Object.keys(action.courses).forEach((key) => {
      newCourses = newCourses.push([key, action.courses[key].name])
    })
    return newCourses
  },

  [types.DOWNLOAD_REMOTE_COURSE](state, action) {
    let courseId = action.course.id
    let courseName = action.course.name
    let courseMaterial = action.course.material
    Storage.saveCourse(courseId, courseName, courseMaterial)
    const newCourses = state.push([action.course.id, action.course.name])
    return newCourses
  }
})
