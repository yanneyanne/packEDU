import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Content, Text } from 'native-base'
import styles from '../assets/styles/home_styles'
import Courses from './CoursesContainer.js'
import RemoteCourses from './RemoteCoursesContainer.js'
import Alignment from './AlignmentContainer'

class Achievements extends Component {

  render() {
    return (
      <Container marginTop={80}>
        <Content>
          <Alignment>
            <Text>
              My Achievements
            </Text>
          </Alignment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Achievements)
