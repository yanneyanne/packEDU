import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Content, Text, Button } from 'native-base'
import Alignment from './AlignmentContainer'
import * as language from '../assets/styles/language_strings'

class Settings extends Component {

  toggleTextAlignment() {
    this.props.toggleTextAlignment()
    this.props.toggleLanguage()
  }

  render() {
    return (
      <Container marginTop={80}>
        <Content>
          <Button full onPress ={ () => this.toggleTextAlignment() }>
            <Text>
              {this.props.getLanguage.change_lang}
            </Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    settingsAlignRight : state.settings ? state.settings.get('alignment') : false,
    getLanguage : state.settings.get('english') ? language.arabic : language.eng
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
