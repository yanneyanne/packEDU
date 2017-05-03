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
    Storage.evaluate(action.evaluatorId, action.choice, action.answer)
    return state
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
  },

  [types.SET_LAST_SESSION](state, action) {
    let session
    if (!action.courseId || !action.lessonName) {
      session = Map()
    } else {
      session = Map({
        courseId: action.courseId,
        lessonName: action.lessonName
      })
    }
    let newState = state.set('lastSession', session)
    return newState
  },

  [types.ADD_INTERACTION](state, action) {
     if (state.has(action.currentSlidePos))
       return state
     return state.set(action.currentSlidePos, Map())
   },

  [types.VALIDATE_INTERACTION](state, action) {
    //This call to storage maybe should be in the actions
    let interactionState = state.get(action.currentSlidePos)
    let newInteractionState = interactionState.set('input', action.input)
    newInteractionState = newInteractionState.set('isCorrect', action.isCorrect)
    let newState = state.set(action.currentSlidePos, newInteractionState)
    return newState
  }
})
