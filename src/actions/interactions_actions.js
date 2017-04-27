import * as types from './types'
import Storage from '../lib/storage.js'
import SCompile from '../lib/slideCompile/SCompile'
import { Map, List } from 'immutable'

export function addInteraction(currentSlidePos) {
  return {
    type: types.ADD_INTERACTION,
    currentSlidePos
  }
}

export function validateInteraction(currentSlidePos, input, validatorId, answer) {
  return (dispatch, getState) => {
    return Storage.evaluate(validatorId, input, answer).then((isCorrect) => {
      dispatch(dispatchValidateInteraction(currentSlidePos, isCorrect, input))
    })  
  }
}

function dispatchValidateInteraction(currentSlidePos, isCorrect, input) {
  return {
    type: types.VALIDATE_INTERACTION,
    currentSlidePos,
    isCorrect,
    input
  }
}
