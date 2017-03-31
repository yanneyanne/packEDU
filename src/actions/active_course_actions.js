import * as types from './types'
import { AsyncStorage } from 'react-native'

export function setActiveCourse(courseId) {
  return (dispatch, getState) => {
    return AsyncStorage.getItem("courses").then((response) => {
      let courseObj = JSON.parse(response)[courseId]
      courseObj.id= courseId
      if (typeof courseObj.currentSlidePos == 'undefined')
        courseObj.currentSlidePos = 0
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

export function renderSlideAt(pos) {
  console.log("In actions render slide at")
  console.log(pos)
  let dummyContent = "<TouchableHighlight>" + pos + "</TouchableHighlight>"
  return {
    type: types.RENDER_SLIDE,
    slideMaterial: dummyContent
  }
}
