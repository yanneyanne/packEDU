import * as types from './types'
import Storage from '../lib/storage.js'
import SCompile from '../lib/slideCompile/SCompile'
import { Map, List } from 'immutable'

export function addInteraction() {
  return {
    type: types.ADD_INTERACTION  
  }
}

export function validateInteraction(input, validatorId, answer) {
  return (dispatch, getState) => {
    return Storage.evaluate(validatorId, input, answer).then((isCorrect) => {
      dispatch(dispatchValidateInteraction(isCorrect, input)) 
    })  
  }
}

function dispatchValidateInteraction(isCorrect, input) {
  return {
    type: types.VALIDATE_INTERACTION,
    isCorrect,
    input
  }
}
