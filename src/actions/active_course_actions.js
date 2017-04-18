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
      // If no saved slide position exists set to 0, otherwise set to the saved position
      if (typeof courseObj === 'undefined' ||
          typeof courseObj[lessonName] === 'undefined')
        currentSlidePos = 0
      else 
        currentSlidePos = courseObj[lessonName]
      dispatch(dispatchSetActiveLesson(lessonName, currentSlidePos, lessonMaterial))
    })
  }
}

function dispatchSetActiveLesson(lessonName, currentSlidePos, lessonMaterial) {
  return {
    type: types.SET_ACTIVE_LESSON,
    lessonName,
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

export function saveSlidePos(courseId, lessonName, pos) {
  return {
    type: types.SAVE_CURRENT_SLIDE_POS,
    courseId,
    lessonName,
    currentSlidePos: pos
  }
}
