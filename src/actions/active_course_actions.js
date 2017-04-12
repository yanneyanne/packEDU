import * as types from './types'
import Storage from '../lib/storage.js'
import SCompile from '../lib/slideCompile/SCompile'

export function setActiveCourse(courseId) {
  return (dispatch, getState) => {
    return Storage.getCourse(courseId).then( (courseObj) => {
      let lessons = []
      courseObj.material.forEach((lesson) =>
        lessons.push(Object.keys(lesson)[0])
      )
      dispatch(dispatchSetActiveCourse(lessons))
    })
  }
}

function dispatchSetActiveCourse(lessons) {
  return {
    type: types.SET_ACTIVE_COURSE,
    lessons
  }
}

export function setActiveLesson(courseId) {
  return (dispatch, getState) => {
    return Storage.getCourse(courseId).then( (courseObj) => {
      if (typeof courseObj.currentSlidePos == 'undefined')
        courseObj.currentSlidePos = 0
      dispatch(dispatchSetActiveCourse(courseObj))
    })
  }
}

function dispatchSetActiveLesson(course) {
  return {
    type: types.SET_ACTIVE_LESSON,
    course
  }
}

export function renderSlideAt(pos, material) {
  let slide = SCompile.getSlide(pos, material)
  return {
    type: types.RENDER_SLIDE,
    slide: slide
  }
}

export function nextSlide(pos, material) {
  let slidePos = SCompile.getNextSlidePosition(pos, material)
  return {
    type: types.SET_CURRENT_SLIDE_POS,
    slidePos
  }
}

export function previousSlide(pos, material) {
  let slidePos = SCompile.getPreviousSlidePosition(pos, material)
  return {
    type: types.SET_CURRENT_SLIDE_POS,
    slidePos
  }
}

export function evaluateAnswer(choice, validatorId, answer) {
  return {
    type: types.VALIDATE_QUIZ,
    choice: choice,
    answer: answer,
    evaluatorId: validatorId
  }
}
