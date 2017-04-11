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
      return retrieveEvaluators(resp.material).then(() =>{
        dispatch(dispatchDownloadRemoteCourse({
          course: resp 
        }))
      })
    }).catch( (err) => { console.log(err) })
  }
}

async function retrieveEvaluators(material) {
  let ids = identifyEvaluators(material)
  const neededEvaluators = await Storage.evaluatorsToDownload(ids)
  console.log("The needed evaluators are")
  console.log(neededEvaluators)
  downloadNeededEvaluators(neededEvaluators)
  return 
}

async function downloadNeededEvaluators(needed) {
  const route = '/getEvaluator/'
  needed.forEach((id) => {
    Api.get(route + id).then((resp) => {
      Storage.saveEvaluator(resp.id, resp.script) 
    })
  }) 
}

function identifyEvaluators(material) {
  //Loop through the material looking for evaluators
  let evaluators = []
  let searchTerm = "evaluator"
  let alphanumeric = /\w+/
  let idx = 0
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
  return evaluators
}

function dispatchDownloadRemoteCourse({ course }) {
  return {
    type: types.DOWNLOAD_REMOTE_COURSE,
    course
  }
}
