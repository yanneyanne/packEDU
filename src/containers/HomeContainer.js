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
import { fetchBackground } from '../lib/backgroundFetch'

class Home extends Component {
  componentDidMount() {
    console.log("Mounting home") 
    this.props.loadLastSession()
  }
  render() {
    fetchBackground()
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
    lastSession: state.activeCourse.get('lastSession') || Map()
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
