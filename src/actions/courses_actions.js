import * as types from './types'
import Api from '../lib/api/api'
import { AsyncStorage } from 'react-native'
import Storage from '../lib/storage.js'

export function loadLocalCourses() {
  return (dispatch, getState) => {
    console.log("Loading local courses in actions")
    return Storage.getCourses().then( localCourses => {
      dispatch(dispatchAddLocalCourses({
        courses: localCourses
      }))
    })
  }
}

function dispatchAddLocalCourses({ courses }) {
  return {
    type: types.LOAD_LOCAL_COURSES,
    courses
  }
}

export function downloadRemoteCourse(courseId) {
  return (dispatch, getState) => {
    const route = '/courseMaterial/' + courseId
    return Api.get(route).then((resp) => {
      retrieveEvaluators(resp.material)
      while(true){}
      dispatch(dispatchDownloadRemoteCourse({
        course: resp
      }))
    }).catch( (err) => { console.log(err) })
  }
}

function retrieveEvaluators(material) {
  let ids = identifyEvaluators(material)
}

function identifyEvaluators(material) {
  //Loop through the material looking for evaluators
  let idx = 0
  let evaluators = []
  let searchTerm = "evaluator"
  let alphanumeric = /\w+/
  while (idx != -1) {
    idx = material.indexOf(searchTerm, idx)
    if (idx != -1) {
      idx += searchTerm.length
      while (!alphanumeric.test(material.charAt(idx)) && idx < material.length) {
        idx++
      }
      let keyEnd = idx+1
      while (alphanumeric.test(material.charAt(keyEnd)) && keyEnd < material.length) {
        keyEnd++
      }
      evaluators.push(material.slice(idx, keyEnd))
    }
  }
  console.log("These are the evaluators")
  console.log(evaluators)
}

function dispatchDownloadRemoteCourse({ course }) {
  return {
    type: types.DOWNLOAD_REMOTE_COURSE,
    course
  }
}
