import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map, List } from 'immutable'
import { AsyncStorage } from 'react-native'

export const courses = createReducer(Map(), {
  [types.LOAD_LOCAL_COURSES] (state, action) {
    console.log("Action in courses reducer:")
    console.log(action.courses)
    return state
    //AsyncStorage.getItem("courses").then(ret => {
    //  let newCourses = state
    //  const localCourses = JSON.parse(ret)
    //  Object.keys(localCourses).forEach((id) => {
    //    newCourses = newCourses.set(id, localCourses[id].name)
    //  })
    //  return newCourses
    //}).catch( (err) => {console.log(err)})
    //return state
  },

  [types.DOWNLOAD_REMOTE_COURSE](state, action) {
    let courseId = action.course.id
    let courseName = action.course.name
    let courseMaterial = action.course.material
    let courseObj = {}
    courseObj[courseId] = {
      "name": courseName,
      "material": courseMaterial
    }
    AsyncStorage.mergeItem("courses", JSON.stringify(courseObj)
    ).catch( (err) => {console.log(err)})
    const newCourses = state.set(action.course.id, action.course.name)
    return newCourses
  }
})
