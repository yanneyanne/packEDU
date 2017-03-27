import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map } from 'immutable'

export const remoteCourses = createReducer(Map(), {
  [types.GET_REMOTE_COURSES](state, action) {
    let newRemoteCourses = Map()
    action.courses.forEach((course) => {
      newRemoteCourses = newRemoteCourses.set(course.id, course.name)
    })
    return newRemoteCourses
  },
  [types.DOWNLOAD_REMOTE_COURSE](state, action) {
    console.log("Firing in reducer")
    console.log("Storing")
    storage.save({
      key: 'loginState',   // Note: Do not use underscore("_") in key!
      rawData: { 
        from: 'some other site',
        userid: 'some userid',
        token: 'some token'
      }
    });
    storage.load({
      key: 'loginState',
    }).then(ret => {
      // found data go to then()
      console.log("In storage callback!")
      console.log(ret.userid);})
    return state 
  }
})

