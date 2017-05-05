import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { DeviceEventEmitter, NativeAppEventEmitter, Platform, ReactNative } from 'react-native'
import BackgroundTimer from 'react-native-background-timer'
import { Map } from 'immutable'
import { Content, View, Text, Button } from 'native-base'
import Alignment from './AlignmentContainer'
import { networkStatus } from '../lib/networkStatus'

const EventEmitter = Platform.select({
    ios: () => NativeAppEventEmitter,
    android: () => DeviceEventEmitter,
  })()

class RemoteCourses extends Component {

//***********************************************//
//The following 5 functions should probably be moved

  startBackgroundListener() {
    timer = BackgroundTimer.setInterval(async () => {
      if (this.props.downloadQueue.length === 0 ) {
        console.log("STOPPING TIMER")
        this.stopBackgroundTimer()
      } else {
        let network_status = await networkStatus()
        console.log(network_status)
        if (network_status === 'WIFI') {
        this.downloadCourse(this.props.downloadQueue[0])
        }
      }
    }, 1100)
  }

  stopBackgroundTimer() {
    BackgroundTimer.clearInterval(timer)
  }

  getStoredCourses() {
    return this.props.storedCourses || []
  }

  //Download a course from the queue
  downloadCourse(courseId) {
    this.props.downloadRemoteCourse(courseId)
    if (this.props.downloadQueue.includes(courseId)) {
      this.props.removeDownloadQueue(courseId)
    }
  }

  // Add a course to the queue to be downloaded
  addDownloadQueue(courseId) {
    this.props.addDownloadQueue(courseId)
  }

//***********************************************//

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

  render() {
    return (
      <Content>
        <Alignment>

          <Button style ={{marginTop: 65}} full onPress = {() => {this.startBackgroundListener()}}>
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
            this.getStoredCourses().map(course => {
              return (
                <View style = {{marginTop: 10}} key={course.get('id')}>
                  <Button onPress = {() => {this.addDownloadQueue(course.get('id'))}}>
                    <Text>
                      {course.get('name')}
                    </Text>
                  </Button>
                  <Text>
                    OFFLINE
                  </Text>
                </View>
              )
            })
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
    storedCourses: state.storedCourses,
    online: state.settings.get('online'),
    downloadQueue: state.download.get('downloadQueue') ? state.download.get('downloadQueue') : false
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteCourses)
