import { combineReducers } from 'redux'
import * as testReducer from './test_reducer'
import * as routeReducer from './routes'

export default combineReducers(Object.assign(
  testReducer,
  routeReducer
))
