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
import Storage from '../lib/storage'

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
      } else {
        let network_status = await networkStatus()
        if (network_status === 'WIFI'){ 
          this.downloadCourse(this.props.downloadQueue[0])
          this.props.removeDownloadQueue(this.props.downloadQueue[0])
        }
      }
    }, 1000 * 60 * 30) //Check once every half-hour
  }

  stopBackgroundTimer() {
    BackgroundTimer.clearInterval(timer)
  }

  async getStoredOfflineCourses() {
    let storedCourses = {} 
    await Storage.getOfflineCourses().then((courses) => {
    for (var id in courses) {
      storedCourses[id] = courses[id]
      
    }
    })
    return storedCourses
 //   this.props.loadOfflineCourses()
 //   return this.props.storedCourses.filterNot(course => {
 //     return this.getLocalCourses().has(course.get('id'))
 //   })
  }
 

  //Download a course from the queue
  downloadCourse(courseId) {
    this.props.downloadRemoteCourse(courseId)
  }

  // Add a course to the queue to be downloaded
  addDownloadQueue(courseId) {
    this.props.addDownloadQueue(courseId)
    if (listening === false) {
      this.startBackgroundListener()
    }
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
    (this.getStoredOfflineCourses()).then((course) => {
      for (var id in course) {
        console.log(id)
      }
    })
    return (
      <Content>
        <Alignment>
          {this.props.online ?
            <Text style={{marginTop:65}}>
              Download more courses:
            </Text>
            :
            <Text style={{marginTop:65}}>
              Queue courses for downloading
            </Text>
          }
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
              null
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
