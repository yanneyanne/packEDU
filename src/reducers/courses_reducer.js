import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { List, Map } from 'immutable'

export const courseList = createReducer({}, {
  [types.GET_REMOTE_COURSES](state, action) {
    console.log("In the course reducer")
    // const remoteCourses = state.getIn(['remoteCourses'], Map())
    // let newRemoteCourses = {}
    // action.courses.forEach((course) => {
    //   remoteCourses[course.id] = Object.assign({}, course, { id });
    // })
    // let newState = state.setIn(['remoteCourses'], Map(remoteCourses))
    // return newState
    return state
  }
})
