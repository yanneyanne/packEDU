import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Content, Text, Button } from 'native-base'
import { Map } from 'immutable'


class ResumeSessionButtonContainer extends Component {

  resumeSession(){
    console.log("Resuming session")
    this.props.setActiveCourse(this.props.lastSession.courseId)
    this.props.setActiveLesson(this.props.lastSession.lessonName)
    Actions.slide()
  }

  render() {
    return(
      <Button full danger onPress={() => this.resumeSession()}>
        <Text>
          Resume last session
        </Text>
      </Button>
    )
  }
}

function mapStateToProps(state) {
  return {
    lastSession: state.activeCourse.get('lastSession')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeSessionButtonContainer)
