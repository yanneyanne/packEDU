import * as RemoteCoursesActions from './remote_courses_actions'
import * as CoursesActions from './courses_actions'
import * as ActiveCourseActions from './active_course_actions'
import * as SettingsActions from './settings_actions'

export const ActionCreators = Object.assign({},
  CoursesActions,
  RemoteCoursesActions,
  ActiveCourseActions,
  SettingsActions
)

