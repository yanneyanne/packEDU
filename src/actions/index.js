import * as RemoteCoursesActions from './remote_courses_actions'
import * as CoursesActions from './courses_actions'

export const ActionCreators = Object.assign({},
  CoursesActions,
  RemoteCoursesActions
)

