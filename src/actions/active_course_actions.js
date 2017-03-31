import * as types from './types'
import { AsyncStorage } from 'react-native'

export function setActiveCourse(courseId) {
  return (dispatch, getState) => {
    return AsyncStorage.getItem("courses").then((response) => {
      let courseObj = JSON.parse(response)[courseId]
      courseObj.id= courseId
      if (typeof courseObj.currentSlideAt == 'undefined')
        courseObj.currentSlideAt = 0
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

export function renderSlideAt(slideAt) {
  console.log("Rendering slide at")
  console.log(slideAt)
  return {
    type: types.RENDER_SLIDE 
  }
}

