import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Actions } from 'react-native-router-flux'
const {
  View,
  TouchableHighlight
} = ReactNative

import { Container, Content, Footer, FooterTab, Button, Icon, Badge, Text } from 'native-base'
import styles from '../assets/styles/home_styles'
import Courses from './CoursesContainer.js'
import RemoteCourses from './RemoteCoursesContainer.js'

class Home extends Component {
  render() {
    return (
      <Container style={{marginTop: 63}}>
        <View style={styles.displayContainer}>
          <Courses/>
        </View>
      </Container>
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
