import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Actions } from 'react-native-router-flux'
const {
  View,
  Text,
  TouchableHighlight
} = ReactNative
import styles from '../assets/styles/home_styles'
import RemoteCourses from './RemoteCoursesContainer.js'

class Home extends Component {
  incrementCounter() {
    this.props.incrementCounter()
  }
  render() {
    return (
      <View style={styles.displayContainer}>
        <Text style={{marginTop: 80}}>
          Welcome to APP! 
        </Text>
        <RemoteCourses/>
      </View>
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
