import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { Container, View, Content, Button, Text } from 'native-base'
import { Bar } from 'react-native-progress'
import Storage from '../lib/storage.js'
import Alignment from './AlignmentContainer'

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
        <Alignment>
          {this.getLessons().map((lesson) => {
            return (
              <View key={lesson.get('name')}>
                <Button onPress = {() => this.startLesson(this.getCourseId(), lesson.get('name'))}>
                  <Text>
                    {lesson.get('name')}
                  </Text>
                </Button>
                <Bar progress={lesson.get('progress')}/>
              </View>
            )
          })}
        </Alignment>
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
