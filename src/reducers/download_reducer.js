import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map, List, fromJS } from 'immutable'

export const download = createReducer(Map(), {
  [types.QUEUE_BACKGROUND_DOWNLOAD](state, action) {
    let queue = []
    if (state.get('downloadQueue') != undefined) {
      queue = state.get('downloadQueue')
    }
    queue.push(action.courseId)
    let newState = state.set('downloadQueue', queue)
    return newState
  },

  [types.REMOVE_BACKGROUND_QUEUE](state, action) {
    let oldQueue = state.get('downloadQueue')
    let newQueue = []
    oldQueue.forEach((queueItem) => { 
      if (queueItem != action.courseId) {
        newQueue.push(queueItem)
      }})
    return state.set('downloadQueue', newQueue)
  }
})		
