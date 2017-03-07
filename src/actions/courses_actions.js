import * as types from './types'
import Api from '../lib/api/api'

export function fetchCourses() {
  return (dispatch, getState) => {
    const route = '/courseNames'
    return Api.get(route).then((resp) => {
      console.log(resp)
    }).catch( (err) => { console.log(err)})
  }
}
