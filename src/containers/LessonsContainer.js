import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { Container, View, Content, Button, Text } from 'native-base'
import { Bar } from 'react-native-progress'

class Lessons extends Component {

  getLessons() {
    return this.props.lessons || [] 
  }

  getCourseId() {
    return this.props.courseId 
  }

  getProgress(lesson) {
    return 0.5 
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
            <View key={lesson}>
              <Button onPress = {() => this.startLesson(this.getCourseId(), lesson)}>
                <Text>
                  {lesson}
                </Text>
              </Button>
              <Bar progress={this.getProgress(lesson)}/>
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
