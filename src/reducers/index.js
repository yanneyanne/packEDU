import { combineReducers } from 'redux'
import * as testReducer from './test_reducer'

export default combineReducers(Object.assign(
	testReducer
))
