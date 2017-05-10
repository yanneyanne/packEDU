import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { DeviceEventEmitter, NativeAppEventEmitter, Platform } from 'react-native'
import BackgroundTimer from 'react-native-background-timer'
import ReactNative from 'react-native'
import { Map } from 'immutable'
import { Content, Text, Button } from 'native-base'
import Alignment from './AlignmentContainer'
import { networkStatus } from '../lib/networkStatus'
import { StyleSheet } from 'react-native'
import styles from '../assets/styles/courses_styles'

const {
  View
} = ReactNative

const EventEmitter = Platform.select({
    ios: () => NativeAppEventEmitter,
    android: () => DeviceEventEmitter,
  })()

const listening = false

class RemoteCourses extends Component {

//***********************************************//
//The following 5 functions should probably be moved
  startBackgroundListener() {
    listening = true
    timer = BackgroundTimer.setInterval(async () => {
      if (this.props.downloadQueue.length === 0 ) {
        this.stopBackgroundTimer()
        listening = false
        console.log("Stopped")
      } else {
        this.downloadCourse(this.props.downloadQueue[0])
        if(this.getLocalCourses().has(this.props.downloadQueue[0])){
          this.props.removeDownloadQueue(this.props.downloadQueue[0])
        }
      }
    }, 1000 * 10 * 1) //Check once every half-hour
  }

  stopBackgroundTimer() {
    BackgroundTimer.clearInterval(timer)
  }

  getStoredOfflineCourses() {
    return this.props.storedCourses.filterNot(course => {
      return this.getLocalCourses().has(course.get('id'))
    })
  }

  //Download a course from the queue
  downloadCourse(courseId) {
    this.props.downloadRemoteCourse(courseId)
  }

  // Add a course to the queue to be downloaded
  addDownloadQueue(courseId) {
    if (!(this.props.downloadQueue.includes(courseId))) {
      this.props.addDownloadQueue(courseId)
      if (listening === false) {
        this.startBackgroundListener()
      }
    }
  }

//***********************************************//

  componentDidMount() {
    this.props.fetchRemoteCourses()
    this.props.loadOfflineCourses()
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
     <View style={StyleSheet.flatten(styles.content)}>
        {this.props.online ?
          <Text >
            Download more courses:
          </Text>
          :
          <Text >
            Queue courses for downloading
          </Text>
        }
        {this.props.online ?
          this.getRemoteCourses().map(course => {
            return (
              <View style={{marginTop: 10}} key={course.get('id')}>
                <Button bordered style={StyleSheet.flatten(styles.courseButton)} onPress = {() => {this.downloadCourse(course.get('id'))}}>
                  <Text>
                    {course.get('name')}
                  </Text>
                </Button>
              </View>
            )
          })
          :
          this.getStoredOfflineCourses().map(course => {
            return (
              <View style = {{marginTop: 10}} key={course.get('id')}>
                <Button bordered style={StyleSheet.flatten(styles.courseButton)} onPress = {() => {this.addDownloadQueue(course.get('id'))}}>
                  <Text>
                    {course.get('name')}
                  </Text>
                </Button>
              </View>
            )
          })
        }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    localCourses: state.courses,
    remoteCourses: state.remoteCourses,
    storedCourses: state.storedCourses,
    online: state.settings.get('online'),
    downloadQueue: state.download.get('downloadQueue') || []
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteCourses)
