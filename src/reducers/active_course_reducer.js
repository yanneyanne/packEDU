import Storage from '../lib/storage'
import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map } from 'immutable'

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

  [types.RENDER_SLIDE](state, action) {
    let newState = state.set('currentSlideMaterial', action.slide)
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

  [types.SAVE_CURRENT_SLIDE_POS](state, action) {
    Storage.saveSlidePos(action.courseId, action.lessonName, action.currentSlidePos)
    return state
  }
})

