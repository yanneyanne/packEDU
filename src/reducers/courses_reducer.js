import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { List } from 'immutable'

export const courseList = createReducer(List{}, {
  [types.GET_COURSES](state, action) {
      
    return state 
  }
})
