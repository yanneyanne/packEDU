import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Content, Text } from 'native-base'
import Courses from './CoursesContainer.js'
import styles from '../assets/styles/home_styles'

class Home extends Component {
  render() {
    return (
      <Courses/>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
