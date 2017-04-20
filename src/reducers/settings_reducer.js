import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map, List, fromJS } from 'immutable'

export const settings = createReducer(Map(), {
  [types.TOGGLE_TEXT_ALIGNMENT](state, action) {
    newState = state.set('alignment', state.get('alignment'))
    return newState
  },

  [types.SET_CONNECTION_ERROR](state, action) {
    console.log("Connection error acknowledged in settings reducer")
    return state.set('online', false)
  },

  [types.NO_CONNECTION_ERROR](state, action) {
    console.log("Settings reducer has removed connection error!") 
    return state.set('online', true)
  }
})

