import * as types from './types'
import Api from '../lib/api/api'

export function loadLocalCourses() {
  return {
    type: types.LOAD_LOCAL_COURSES
  }
}

export function downloadRemoteCourse(courseId) {
  return (dispatch, getState) => {
    const route = '/courseMaterial/' + courseId
    return Api.get(route).then((resp) => {
      dispatch(addDownloadedCourse({ 
        course: resp 
      })) 
    }).catch( (err) => { console.log(err)})
  }
}

export function addDownloadedCourse({ course }) {
  return {
    type: types.DOWNLOAD_REMOTE_COURSE,
    course
  }
}
  
