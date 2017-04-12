import * as types from './types'
import Storage from '../lib/storage.js'
import SCompile from '../lib/slideCompile/SCompile'

export function setActiveCourse(courseId) {
  return (dispatch, getState) => {
    return Storage.getCourse(courseId).then( (courseObj) => {
      let lessons = []
      courseObj.material.forEach((lesson) =>
        lessons.push(lesson[0])
      )
      dispatch(dispatchSetActiveCourse(courseId, lessons))
    })
  }
}

function dispatchSetActiveCourse(courseId, lessons) {
  return {
    type: types.SET_ACTIVE_COURSE,
    courseId,
    lessons
  }
}

export function setActiveLesson(courseId, lessonName) {
  return (dispatch, getState) => {
    return Storage.getCourse(courseId).then( (courseObj) => {
      let lessonMaterial
      courseObj.material.forEach((lesson) => {
        if(lesson[0]===lessonName) {
          lessonMaterial = lesson[1]
        }
      })
      let currentSlidePos = courseObj.currentSlidePos
      if (typeof courseObj.currentSlidePos == 'undefined')
        currentSlidePos = 0
      dispatch(dispatchSetActiveLesson(currentSlidePos, lessonMaterial))
    })
  }
}

function dispatchSetActiveLesson(currentSlidePos, lessonMaterial) {
  return {
    type: types.SET_ACTIVE_LESSON,
    currentSlidePos,
    lessonMaterial
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
