import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative, {View} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Text, Button } from 'native-base'
import Alignment from './AlignmentContainer'
import * as language from '../assets/styles/language_strings'
import styles from '../assets/styles/profile_styles'
import { StyleSheet } from 'react-native'

class Settings extends Component {

  toggleTextAlignment() {
    this.props.toggleTextAlignment()
    this.props.toggleLanguage()
  }

  render() {
    return (
      <View style={StyleSheet.flatten(styles.content)}>
        <Button full onPress ={ () => this.toggleTextAlignment() }>
          <Text>
            {this.props.getLanguage.change_lang}
          </Text>
        </Button>
      </View>
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
