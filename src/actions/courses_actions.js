import * as types from './types'
import Api from '../lib/api/api'

export function fetchRemoteCourses() {
  console.log("Fetching remote courses...")
  return (dispatch, getState) => {
    const route = '/courseNames'
    return Api.get(route).then((resp) => {
      dispatch(setRemoteCourses({ courses: resp }))
    }).catch( (err) => { console.log(err)})
  }
}

export function setRemoteCourses({ courses }) {
  return {
    type: types.GET_REMOTE_COURSES,
    courses
  }
}

export function downloadRemoteCourse(courseId) {
  return (dispatch, getState) => {
    console.log("Dispatching download action for course: " + courseId) 
    const route = '/courseMaterial/' + courseId
    return Api.get(route).then((resp) => {
      dispatch(addDownloadedCourse({ course: resp }))
    }).catch( (err) => { console.log(err)})
  }
}

export function addDownloadedCourse({ course }) {
  console.log("Download complete")
  console.log(course)
  return {
    type: types.DOWNLOAD_REMOTE_COURSE,
    course
  }
}
