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
            return (
              <View style={{marginTop: 10}} key={course.get('id')}>
                <Button onPress = {() => {this.downloadCourse(course.get('id'))}}>
                  <Text>
                    {course.get('name')}
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
