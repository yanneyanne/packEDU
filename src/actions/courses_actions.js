import * as types from './types'
import Api from '../lib/api/api'

export function fetchRemoteCourses() {
  return (dispatch, getState) => {
    const route = '/courseNames'
    return Api.get(route).then((resp) => {
      dispatch(setRemoteCourses({ courses: resp }))
    }).catch( (err) => { console.log(err)})
  }
}

export function setRemoteCourses({ courses }) {
  return {
    type: types.GET_REMOTE_COURSES,
    courses
  }
}
