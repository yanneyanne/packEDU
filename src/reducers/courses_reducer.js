import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { Map, List, fromJS } from 'immutable'
import { AsyncStorage } from 'react-native'

export const courses = createReducer(List(), {
  [types.LOAD_LOCAL_COURSES] (state, action) {
    let newCourses = List()
    Object.keys(action.courses).forEach((key) => {
      newCourses = newCourses.push([key, action.courses[key].name])
    })
    return newCourses
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
    const newCourses = state.push([action.course.id, action.course.name])
    return newCourses
  }
})
