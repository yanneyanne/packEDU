import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { Container, View, Content, Button, Text } from 'native-base'
import { Bar } from 'react-native-progress'
import Storage from '../lib/storage.js'

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
      <Content style={{marginTop: 65}}>
        {this.getLessons().map((lesson) => {
          return (
            // Lesson tuple on the form lesson[0]=lessonName lesson[1]=savedPosition
            <View key={lesson.name}>
              <Button onPress = {() => this.startLesson(this.getCourseId(), lesson.name)}>
                <Text>
                  {lesson.name}
                </Text>
              </Button>
              <Bar progress={lesson.progress}/>
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
    lessons: state.activeCourse.get('lessons')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Lessons)
