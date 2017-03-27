import * as types from './types'

export function loadLocalCourses() {
  console.log("Loading local courses!")
  return {
    type: types.LOAD_LOCAL_COURSES
  }
}
