import * as types from './types'
import { AsyncStorage } from 'react-native'

export function setActiveCourse(courseId) {
  return (dispatch, getState) => {
    return AsyncStorage.getItem("courses").then((response) => {
      let courseObj = JSON.parse(response)[courseId]
      courseObj["id"]= courseId
      console.log(courseObj)
      dispatch(dispatchSetActiveCourse(courseObj))
    })
  } 
}

function dispatchSetActiveCourse(course) {
  return {
    type: types.SET_ACTIVE_COURSE,
    course
  }
}


