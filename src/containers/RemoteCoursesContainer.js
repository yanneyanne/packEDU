import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { DeviceEventEmitter, NativeAppEventEmitter, Platform, ReactNative } from 'react-native'
import BackgroundTimer from 'react-native-background-timer'
import { Map } from 'immutable'
import { Content, View, Text, Button } from 'native-base'
import Alignment from './AlignmentContainer'

const EventEmitter = Platform.select({
    ios: () => NativeAppEventEmitter,
    android: () => DeviceEventEmitter,
  })()

class RemoteCourses extends Component {

  startBackgroundTimer() {
    BackgroundTimer.start(1000)
  }
 
  startBackgroundListener() {
  let count = 0
  EventEmitter.addListener('backgroundTimer', () => {
    console.log(count)
      count++
  })
  }

  stopBackgroundTimer() {
    BackgroundTimer.stop()
  }

  componentDidMount() {
    this.props.fetchRemoteCourses()
  }

  getLocalCourses() {
    return this.props.localCourses || []
  }

  getRemoteCourses() {
    // Only return the courses which have not yet been downloaded
    return this.props.remoteCourses.filterNot(course => {
      return this.getLocalCourses().has(course.get('id')) 
    })
  }


  downloadCourse(courseId) {
    this.props.downloadRemoteCourse(courseId)
  }
  
  render() {
    this.startBackgroundListener()
    return (
      <Content>
        <Alignment>
        <Button style ={{marginTop: 65}} full onPress = {() => {this.startBackgroundTimer()}}>
          <Text> 
          START TIMER
          </Text>
        </Button>
        <Button style ={{marginTop: 65}} full onPress = {() => {this.stopBackgroundTimer()}}>
          <Text> 
          STOP TIMER
          </Text>
        </Button>

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
        </Alignment>
      </Content>
    )	
  }
}

function mapStateToProps(state) {
  return {
    localCourses: state.courses,
    remoteCourses: state.remoteCourses,
    online: state.settings.get('online')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteCourses)
