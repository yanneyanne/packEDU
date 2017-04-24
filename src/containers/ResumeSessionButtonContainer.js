import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Content, Text, Button } from 'native-base'


class ResumeSessionButtonContainer extends Component {

  render() {
    return(
      <Button full danger onPress={this.props.onPress}>
        <Text>
          Resume last session
        </Text>
      </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResumeSessionButtonContainer)
