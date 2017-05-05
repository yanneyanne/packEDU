import * as types from './types'
import Storage from '../lib/storage.js'
import SCompile from '../lib/slideCompile/SCompile'
import { Map, List } from 'immutable'

export function setActiveCourse(courseId) {
  return (dispatch, getState) => {
    return Storage.getCourse(courseId).then( (courseObj) => {
      let lessons = List()
      courseObj.lessons.forEach((lesson) => {
        let lessonPos = lesson.savedPos || 0
        let progress = lessonPos / lesson.material.length
        lessons = lessons.push(Map({
          "name": lesson.name,
          "progress": progress
        }))
      })
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

export function saveLastSession(courseId, lessonName) {
  return (dispatch, getState) => {
    return Storage.saveLastSession(courseId, lessonName).then(() => {
      dispatch(setLastSession(courseId, lessonName))
    })
  }
}

export function loadLastSession() {
  return (dispatch, getState) => {
    return Storage.loadLastSession().then((session) => {
      let courseId
      let lessonName
      try {
        courseId = session.courseId
        lessonName = session.lessonName
      } catch(e) {
        console.log(e)
      }
      console.log("This course info in the actions: ")
      console.log(courseId)
      console.log(lessonName)
      dispatch(setLastSession(courseId, lessonName))
    })
  }
}

function setLastSession(courseId, lessonName) {
  return {
    type: types.SET_LAST_SESSION,
    courseId,
    lessonName
  }
}

export function removeLastSession() {
  return (dispatch, getState) => {
    return Storage.removeLastSession().then(() => {
      dispatch(setLastSession(null, null))
    })
  }
}

export function saveSlidePos(courseId, lessonName, currentSlidePos, lessonLength) {
  return {
    type: types.SAVE_CURRENT_SLIDE_POS,
    courseId,
    lessonName,
    currentSlidePos,
    lessonLength
  }
}
