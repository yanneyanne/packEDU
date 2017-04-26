import Storage from '../lib/storage'
import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { List, Map } from 'immutable'

export const activeCourse = createReducer(Map(), {
  [types.SET_ACTIVE_COURSE](state, action) {
    let newState = state.set('lessons', action.lessons)
    newState = newState.set('id', action.courseId)
    return newState
  },

  [types.SET_ACTIVE_LESSON](state, action) {
    let newState = state.set('lessonMaterial', action.lessonMaterial)
    newState = newState.set('activeLesson', action.lessonName)
    newState = newState.set('currentSlidePos', action.currentSlidePos)
    return newState
  },

  [types.SET_CURRENT_SLIDE_POS](state, action) {
    let newState = state.set('currentSlidePos', action.slidePos) 
    return newState
  },

  [types.VALIDATE_QUIZ](state, action) {
    //This call to storage maybe should be in the actions
    let interactionsLeft = state.get('interactionsLeft')
    let newState = state.set('interactionsLeft', interactionsLeft - 1)
    if (action.isCorrect) {
      let correctAnswers = newState.get('correctAnswers', 0)
      newState = newState.set('correctAnswers', correctAnswers + 1)
    } else {
      let wrongAnswers = newState.get('wrongAnswers', 0)
      newState = newState.set('wrongAnswers', wrongAnswers + 1)
    }
    return newState
  },

  // Notify the state that there is an interaction that hasn't yet received input from the user
  [types.ADD_INTERACTION](state, action) {
    let interactionsLeft = state.get('interactionsLeft', 0)
    return state.set('interactionsLeft', interactionsLeft + 1)
  },

  // Persistently store the user's position in the lesson and add the new progress to lesson state
  [types.SAVE_CURRENT_SLIDE_POS](state, action) {
    Storage.saveSlidePos(action.courseId, action.lessonName, action.currentSlidePos)
    let updatedLessons = List()
    state.get('lessons').forEach((lesson) => {
      let newLesson = lesson
      if(newLesson.get('name') === action.lessonName)
        newLesson = newLesson.set('progress', action.currentSlidePos / action.lessonLength)
      updatedLessons = updatedLessons.push(newLesson)
    })
    let newState = state.set('lessons', updatedLessons)
    return newState
  }
})

