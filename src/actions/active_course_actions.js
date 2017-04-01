import * as types from './types'
import { AsyncStorage } from 'react-native'
import Parser from '../lib/materialParser'

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

export function renderSlideAt(pos, material) {
  let slide = Parser.getSlide(pos, material)
  return {
    type: types.RENDER_SLIDE,
    slide: slide
  }
}
