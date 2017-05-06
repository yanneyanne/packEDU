import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import BackgroundFetch from 'react-native-background-fetch'
import { networkStatus } from './networkStatus'

class iOSFetch extends Component {
  constructor(props) {
  super(props)
  }
  componentDidMount() {
    console.log("FETCH COURSES")
    BackgroundFetch.configure( {
      stopOnTerminate: false
    }, (() => {
      let downloads
      if (states.download.get('downloadQueue') != undefined) {
          this.props.downloadRemoteCourse(this.props.downloadQueue[0])
      }
      let network =  networkStatus()
      console.log("network is " + network)
      BackgroundFetch.finish();
      
    }), function(error) {
      console.log("[js] RNBackgroundFetch failed to start");
    });
  }
    render() {
      return 
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

export default connect(mapStateToProps, mapDispatchToProps)(iOSFetch)
