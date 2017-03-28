import * as types from './types'
import Api from '../lib/api/api'

export function loadLocalCourses() {
  console.log("Loading local courses!")
  return {
    type: types.LOAD_LOCAL_COURSES
  }
}

export function downloadRemoteCourse(courseId) {
  return (dispatch, getState) => {
    console.log("Download action in course_actions: " + courseId) 
    const route = '/courseMaterial/' + courseId
    return Api.get(route).then((resp) => {
      dispatch(addDownloadedCourse({ course: resp })) 
    }).catch( (err) => { console.log(err)})
  }
}

export function addDownloadedCourse({ course }) {
  console.log("Download complete in course_actions")
  console.log(course)
  return {
    type: types.DOWNLOAD_REMOTE_COURSE,
    course
  }
}
  
