import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { Container, View, Content, Button, Text } from 'native-base'
import { Bar } from 'react-native-progress'
import Storage from '../lib/storage.js'

class Lessons extends Component {

  getLessonNames() {
    return this.props.lessonNames || []
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
      <Content style={{marginTop: 65}}>
        {this.getLessonNames().map((lesson) => {
          return (
            // Lesson tuple on the form lesson[0]=lessonName lesson[1]=savedPosition
            <View key={lesson}>
              <Button onPress = {() => this.startLesson(this.getCourseId(), lesson)}>
                <Text>
                  {lesson}
                </Text>
              </Button>
              {/*<Bar progress={this.getProgress(lesson[1])}/>*/}
            </View>
          )
        })}
      </Content>
    )
  }
}

function mapStateToProps(state) {
  return {
    courseId: state.activeCourse.get('id'),
    lessonNames: state.activeCourse.get('lessonNames')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Lessons)
