import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Actions } from 'react-native-router-flux'

import { Container, Content, Button, Text } from 'native-base'
import styles from '../assets/styles/home_styles'
import Courses from './CoursesContainer.js'
import RemoteCourses from './RemoteCoursesContainer.js'

class Profile extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Button style={{marginTop: 80}}>
            <Text> Settings </Text>
          </Button>
        </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
