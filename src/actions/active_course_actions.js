import * as types from './types'
import Storage from '../lib/storage.js'
import Parser from '../lib/slideCompile/materialParser'

export function setActiveCourse(courseId) {
  return (dispatch, getState) => {
    return Storage.getCourse(courseId).then( (courseObj) => {
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

export function nextSlide(pos, material) {
  let slidePos = Parser.getNextSlidePosition(pos, material)
  return {
    type: types.SET_CURRENT_SLIDE_POS,
    slidePos
  }
}

export function previousSlide(pos, material) {
  let slidePos = Parser.getPreviousSlidePosition(pos, material)
  return {
    type: types.SET_CURRENT_SLIDE_POS,
    slidePos
  }
}
