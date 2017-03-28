import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map, List } from 'immutable'

export const courses = createReducer(List(), {
  [types.LOAD_LOCAL_COURSES] (state, action) {
    //storage.load({
    //  key: "58c152c4e65a3494544dc833"
    //}).then(ret => {
    //  console.log("Loading local course in reducer:")
    //  console.log(ret)
    //})
    return state
  },
  [types.DOWNLOAD_REMOTE_COURSE](state, action) {
    console.log("Firing in local course reducer") 
    storage.save({
      key: action.course.id,
      rawData: {
        courseMaterial: action.course.material 
      }
    })

    let courses = state
    const newCourses = courses.push(action.course.id)
    return newCourses
  }
})
