import * as types from './types'
import Api from '../lib/api/api'
import Storage from '../lib/storage'

export function fetchRemoteCourses() {
  console.log("Fetching remote courses...")
  return (dispatch, getState) => {
    const route = '/course/names'
    return Api.get(route).then((resp) => {
      dispatch(setRemoteCourses({ courses: resp }))
      dispatch(setStoredRemoteCourses({ courses: resp}))
      dispatch((removeConnectionError()))
    }).catch( (err) => { 
      console.log(err)
      if (err instanceof TypeError)
        dispatch(setConnectionError())
    })
  }
}

export function addDownloadQueue ( courseId ) {
  return {
    type: types.QUEUE_BACKGROUND_DOWNLOAD,
    courseId
  }
}

export function removeDownloadQueue ( courseId ) {
  return {
    type: types.REMOVE_BACKGROUND_QUEUE,
    courseId
  }
}

function setRemoteCourses({ courses }) {
  return {
    type: types.GET_REMOTE_COURSES,
    courses
  }
}

function setStoredRemoteCourses( { courses }) {
  return {
    type: types.SET_STORED_REMOTE_COURSES,
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
