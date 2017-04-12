import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Content, Text, Button } from 'native-base'
import Alignment from './AlignmentContainer'

class Settings extends Component {

  toggleTextAlignment() {
    this.props.toggleTextAlignment()
  }

  render() {
    return (
      <Container marginTop={80}>
        <Content>
          <Button full onPress ={ () => this.toggleTextAlignment() }>
            {this.props.settingsAlignRight ? 
              <Text>
                Switch to left alignment
              </Text>
              :
              <Text>
                Switch to right alignment
              </Text> 
            }
          </Button>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    settingsAlignRight : state.settings ? state.settings.get('alignment') : false
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
