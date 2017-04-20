import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Map } from 'immutable'
import { Content, Text, Button } from 'native-base'

const { View } = ReactNative


class RemoteCourses extends Component {
  componentDidMount() {
    this.props.fetchRemoteCourses()
  }

  getRemoteCourses() {
    return this.props.remoteCourses
  }

  downloadCourse(courseId) {
    this.props.downloadRemoteCourse(courseId)
  }
  
  render() {
    return (
      <Content>
        <Text style={{marginTop: 65}}>
          Download more Courses:
        </Text>
        {this.props.online ? 
          this.getRemoteCourses().map(course => {
            // Remote courses are an Immutable.Seq of pairs in the form [id, name]
            let courseId = course[0]
            let courseName = course[1]
            return (
              <View style={{marginTop: 10}} key={courseId}>
                <Button onPress = {() => {this.downloadCourse(courseId)}}>
                  <Text>
                    {courseName}
                  </Text>
                </Button>
              </View>
            )
          })
          :
          <Text>No connection</Text>
        }
      </Content>
    )	
  }
}

function mapStateToProps(state) {
  return {
    remoteCourses: state.remoteCourses,
    online: state.settings.get('online')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteCourses)
