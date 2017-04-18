import * as types from './types'
import Storage from '../lib/storage.js'
import SCompile from '../lib/slideCompile/SCompile'

export function setActiveCourse(courseId) {
  return (dispatch, getState) => {
    return Storage.getCourse(courseId).then( (courseObj) => {
      let lessonNames = []
      courseObj.lessons.forEach((lesson) => {
        lessonNames.push(lesson.name)
      })
      dispatch(dispatchSetActiveCourse(courseId, lessonNames))
    })
  }
}

function dispatchSetActiveCourse(courseId, lessonNames) {
  return {
    type: types.SET_ACTIVE_COURSE,
    courseId,
    lessonNames
  }
}

export function setActiveLesson(courseId, lessonName) {
  return (dispatch, getState) => {
    return Storage.getCourse(courseId).then((courseObj) => {
      let activeLesson
      courseObj.lessons.forEach((lesson) => {
        if(lesson.name===lessonName) {
          activeLesson = lesson
        }
      })
      let lessonMaterial = activeLesson.material
      let currentSlidePos
      // If no saved slide position exists, set current position to 0. Otherwise set to the saved position
      if ( typeof activeLesson.savedPos === 'undefined')
        currentSlidePos = 0
      else
        currentSlidePos = activeLesson.savedPos
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
