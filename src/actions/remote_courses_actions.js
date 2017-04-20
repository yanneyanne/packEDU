import * as types from './types'
import Api from '../lib/api/api'

export function fetchRemoteCourses() {
  console.log("Fetching remote courses...")
  return (dispatch, getState) => {
    const route = '/courseNames'
    return Api.get(route).then((resp) => {
      dispatch(setRemoteCourses({ courses: resp }))
      dispatch((removeConnectionError()))
    }).catch( (err) => { 
      console.log(err)
      if (err instanceof TypeError)
        dispatch(setConnectionError())
    })
  }
}

function setRemoteCourses({ courses }) {
  return {
    type: types.GET_REMOTE_COURSES,
    courses
  }
}

function setConnectionError() {
  return {
    type: types.SET_CONNECTION_ERROR
  }
}

function removeConnectionError() {
  return {
    type: types.NO_CONNECTION_ERROR 
  }
}
