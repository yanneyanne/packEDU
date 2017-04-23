import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Content, Text } from 'native-base'
import Alignment from './AlignmentContainer'

class Achievements extends Component {

  render() {
    return (
      <Content>
        <Alignment>
          <Text>
            My Achievements
          </Text>
        </Alignment>
      </Content>
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
