import * as types from './types'
import Api from '../lib/api/api'
import { AsyncStorage } from 'react-native'
import Storage from '../lib/storage.js'

export function loadLocalCourses() {
  return (dispatch, getState) => {
    console.log("Loading local courses in actions")
    return Storage.getCourses().then( localCourses => {
      dispatch(dispatchAddLocalCourses({
        courses: localCourses
      }))
    })
  }
}

function dispatchAddLocalCourses({ courses }) {
  return {
    type: types.LOAD_LOCAL_COURSES,
    courses
  }
}

export function downloadRemoteCourse(courseId) {
  return (dispatch, getState) => {
    const route = '/courseMaterial/' + courseId
    return Api.get(route).then((resp) => {
      dispatch(dispatchDownloadRemoteCourse({
        course: resp
      }))
    }).catch( (err) => { console.log(err) })
  }
}

function dispatchDownloadRemoteCourse({ course }) {
  return {
    type: types.DOWNLOAD_REMOTE_COURSE,
    course
  }
}
