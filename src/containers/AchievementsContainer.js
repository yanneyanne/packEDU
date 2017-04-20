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
import * as language from '../assets/styles/language_strings'

class Achievements extends Component {

  render() {
    return (
      <Container marginTop={80}>
        <Content>
          <Alignment>
            <Text>
              {this.props.getLanguage.achievements}
            </Text>
          </Alignment>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    settingsAlignRight: state.settings ? state.settings.get('alignment')
    : false,
    getLanguage: state.settings.get('english') ? language.arabic : language.eng
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Achievements)
