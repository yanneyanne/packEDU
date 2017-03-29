import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map, List } from 'immutable'
import { AsyncStorage } from 'react-native'

export const courses = createReducer(Map(), {
  [types.LOAD_LOCAL_COURSES] (state, action) {
    AsyncStorage.getItem("courses").then(ret => {
      console.log("Loading local courses in reducer:")
      console.log(ret)
    }).catch( (err) => {console.log(err)})
    return state
  },

  [types.DOWNLOAD_REMOTE_COURSE](state, action) {
    let courseId = action.course.id
    let courseName = action.course.name
    let courseMaterial = action.course.material
   // AsyncStorage.removeItem("courses")
    let courseObj = {}
    courseObj[courseId] = {
      name: courseName,
      material: courseMaterial
    }
    AsyncStorage.mergeItem("courses", JSON.stringify(courseObj)
    ).catch( (err) => {console.log(err)})
    let courses = state
    const newCourses = state.set(action.course.id, action.course.name)
    return newCourses
  }
})
