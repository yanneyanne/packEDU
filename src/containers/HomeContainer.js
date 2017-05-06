import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Content, Text } from 'native-base'
import Courses from './CoursesContainer.js'
import styles from '../assets/styles/home_styles'
import ResumeSessionButton from './ResumeSessionButtonContainer'
import { View } from 'native-base'
import { Map } from 'immutable'
import { StyleSheet } from 'react-native'
import  iOSFetch  from '../lib/backgroundFetch'
import BackgroundFetch from 'react-native-background-fetch'


  
class Home extends Component {


//  constructor(props) {
//    super(props)
//    this.downloadRemote = this.downloadRemote.bind(this)
//  }
//
//  downloadRemote(id) {
//    this.props.downloadRemoteCourse(id)
//  }
//
  componentDidMount() {
    console.log("Mounting home") 
    this.props.loadLastSession()
  BackgroundFetch.configure( {
    stopOnTerminate: false
  }, (() => {
    if (this.props.downloadQueue != []) {
    this.props.downloadRemoteCourse(this.props.downloadQueue[0])
    this.props.removeDownloadQueue(this.props.downloadQueue[0])
    }
    BackgroundFetch.finish();
   
  }), function(error) {
    console.log("[js] RNBackgroundFetch failed to start");
  })
}
  render() {
    {iOSFetch}
    return (
      <View style={StyleSheet.flatten(styles.content)}>
        <Courses />
        {this.props.lastSession.isEmpty() ?
            <View></View> 
            :
          <ResumeSessionButton style={styles.resumeButton}/>
        }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    localC : state.courses,
    lastSession: state.activeCourse.get('lastSession') || Map(),
    downloadQueue: state.download.get('downloadQueue') || [] 
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
