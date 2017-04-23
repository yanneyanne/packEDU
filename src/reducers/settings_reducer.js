import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map, List, fromJS } from 'immutable'

export const settings = createReducer(Map(), {
  [types.TOGGLE_TEXT_ALIGNMENT](state, action) {
    let newState = Map()
    let current = state.get('alignment')
    newState = state.set('alignment', !current)
    return newState 
  }
})

