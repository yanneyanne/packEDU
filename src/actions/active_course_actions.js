import * as types from './types'

export function setActiveCourse(courseId) {
  console.log("In active course actions")
  return {
    type: types.SET_ACTIVE_COURSE,
    courseId
  }
}



