import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map, List } from 'immutable'

export const courses = createReducer(Map(), {
  [types.LOAD_LOCAL_COURSES] (state, action) {
    storage.load({
      key: 'courses'
    }).then(ret => {
      console.log("Loading local courses in reducer:")
      console.log(ret)
    }).catch( (err) => {console.log(err)})
    return state
  },

  [types.DOWNLOAD_REMOTE_COURSE](state, action) {
    storage.setItem("courses", JSON.stringify({ //Storage requires a string
        "id": action.course.id,
        "rawData": action.course
    })).catch( (err) => {console.log(err)})
    let courses = state
    const newCourses = state.set(action.course.id, action.course.name)
    return newCourses
  }
})
