import { combineReducers } from 'redux'
import * as remoteCoursesReducer from './remote_courses_reducer'
import * as routeReducer from './routes'

export default combineReducers(Object.assign(
  routeReducer,
  remoteCoursesReducer
))
