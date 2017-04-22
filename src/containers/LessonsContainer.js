import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { Content, Button, Text } from 'native-base'
import { Bar } from 'react-native-progress'
import Storage from '../lib/storage.js'
import Alignment from './AlignmentContainer'
import ReactNative from 'react-native'
import styles from '../assets/styles/lessons_styles'
const {
  View
} = ReactNative

class Lessons extends Component {

  getLessons() {
    return this.props.lessons || []
  }

  getCourseId() {
    return this.props.courseId 
  }

  startLesson(courseId, lesson) {
    this.props.setActiveLesson(courseId, lesson)
    Actions.slide()
  }

  render() {
    return (
      <View style={styles.content}>
        {this.getLessons().map((lesson) => {
          return (
            <View key={lesson.get('name')} style={styles.lessonButton}>
              <Button onPress = {() => this.startLesson(this.getCourseId(), lesson.get('name'))}>
                <Text>
                  {lesson.get('name')}
                </Text>
              </Button>
              <Bar style={styles.progress} progress={lesson.get('progress')}/>
            </View>
          )
        })}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    courseId: state.activeCourse.get('id'),
    lessons: state.activeCourse.get('lessons')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Lessons)
