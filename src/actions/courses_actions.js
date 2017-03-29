import * as types from './types'
import Api from '../lib/api/api'
import { AsyncStorage } from 'react-native'

export function loadLocalCourses() {
  return (dispatch, getState) => {
    console.log("Loading local courses in actions")
    return AsyncStorage.getItem("courses").then((response) => {
      const localCourses = JSON.parse(response) 
      dispatch(addLocalCourses({
        courses: localCourses
      }))
    }).catch( (err) => { console.log(err) })
  }
}

export function addLocalCourses({ courses }) {
  return {
    type: types.LOAD_LOCAL_COURSES, 
    courses
  }
}

export function downloadRemoteCourse(courseId) {
  return (dispatch, getState) => {
    const route = '/courseMaterial/' + courseId
    return Api.get(route).then((resp) => {
      dispatch(addDownloadedCourse({ 
        course: resp 
      })) 
    }).catch( (err) => { console.log(err) })
  }
}

export function addDownloadedCourse({ course }) {
  return {
    type: types.DOWNLOAD_REMOTE_COURSE,
    course
  }
}
  
