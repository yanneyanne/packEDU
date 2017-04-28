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
import { StyleSheet } from 'react-native'

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

  removeCourse(courseId) {
    this.props.removeLocalCourse(courseId)
    Actions.home()
  }


  render() {
    return (
      <View style={StyleSheet.flatten(styles.content)}>
        {this.getLessons().map((lesson) => {
          return (
            <View key={lesson.get('name')} style={styles.lessonButtonContainer}>
              <Button bordered style={StyleSheet.flatten(styles.lessonButton)}
                onPress = {() => this.startLesson(this.getCourseId(), lesson.get('name'))}>
                <Text>
                  {lesson.get('name')}
                </Text>
              </Button>
              <Bar style={styles.progress} height={3} borderRadius={0} borderWidth={0} 
                progress={lesson.get('progress')}/>
            </View>
          )
        })}
        <View style = {styles.removeCourseContainer}>
          <Button large block danger style = {(styles.removeCourseButton)} onPress = {() => this.removeCourse(this.getCourseId())}>
            <Text>
              Delete this course
            </Text>
          </Button>
        </View>
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
