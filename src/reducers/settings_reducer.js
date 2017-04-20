import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map, List, fromJS } from 'immutable'

export const settings = createReducer(Map(), {
  [types.TOGGLE_TEXT_ALIGNMENT](state, action) {
    let newState = Map()
    let current = state.get('alignment')
    newState = state.set('alignment', !current)
    return newState
  },

  [types.SET_CONNECTION_ERROR](state, action) {
    console.log("Connection error acknowledged in settings reducer")
    return state
  },

  [types.REMOVE_CONNECTION_ERROR](state, action) {
    console.log("Settings reducer has removed connection error!") 
    return state
  }
})

