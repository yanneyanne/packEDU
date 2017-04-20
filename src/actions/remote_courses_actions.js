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
  console.log("There was a connection error!")
  return {
    type: types.SET_CONNECTION_ERROR
  }
}

function removeConnectionError() {
  console.log("No connection error!")
  return {
    type: types.REMOVE_CONNECTION_ERROR 
  }
}
