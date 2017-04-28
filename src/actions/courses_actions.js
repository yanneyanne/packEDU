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
    const route = '/course/material/' + courseId
    return Api.get(route).then((resp) => {
      return retrieveEvaluators(resp.lessons).then(() =>{
        dispatch(dispatchDownloadRemoteCourse({
          course: resp 
        }))
      })
    }).catch( (err) => { console.log(err) })
  }
}

function dispatchDownloadRemoteCourse({ course }) {
  return {
    type: types.DOWNLOAD_REMOTE_COURSE,
    course
  }
}

async function retrieveEvaluators(lessons) {
  let ids = identifyEvaluators(lessons)
  const neededEvaluators = await Storage.evaluatorsToDownload(ids)
  downloadNeededEvaluators(neededEvaluators)
}

async function downloadNeededEvaluators(needed) {
  if (!needed) return
  const route = '/course/getEvaluator/'
  needed.forEach((id) => {
    Api.get(route + id).then((resp) => {
      Storage.saveEvaluator(resp.id, resp.script) 
    })
  }) 
}

function identifyEvaluators(lessons) {
  //Loop through the material for each lesson looking for evaluators
  let evaluators = []
  let searchTerm = "evaluator"
  let alphanumeric = /\w+/
  let idx = 0
  lessons.forEach((lesson) => {
    while (idx != -1) {
      idx = lesson.material.indexOf(searchTerm, idx)
      if (idx != -1) {
        idx += searchTerm.length
        while (!alphanumeric.test(lesson.material.charAt(idx)) && idx < lesson.material.length) {
          idx++
        }
        let keyEnd = idx+1
        while (alphanumeric.test(lesson.material.charAt(keyEnd)) && keyEnd < lesson.material.length) {
          keyEnd++
        }
        evaluators.push(lesson.material.slice(idx, keyEnd))
      }
    }
  })
  return evaluators
}
