import { combineReducers } from 'redux'
import * as coursesReducer from './courses_reducer'
import * as routeReducer from './routes'

export default combineReducers(Object.assign(
  routeReducer,
  coursesReducer
))
