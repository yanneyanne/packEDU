import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative, { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as language from '../assets/styles/language_strings'
import { Button, Text } from 'native-base'
import styles from '../assets/styles/profile_styles'
import { StyleSheet } from 'react-native'

class Profile extends Component {

  render() {
    return (
     <View style={StyleSheet.flatten(styles.content)}>
        <Button full onPress = {() => Actions.settings()}>
          <Text>
            {this.props.getLanguage.settings}
          </Text>
        </Button>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    getLanguage : state.settings.get('english') ? language.arabic : language.eng
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
