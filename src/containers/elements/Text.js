import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { View, Text } from 'native-base'
import {ScrollView} from 'react-native'

export default class SlideText extends Component {

  getTextContainerStyle() {
    return {
      marginBottom: 40,
      backgroundColor: 'rgba(0,0,0,0)'
    }
  }

  getTextStyle() {
    return {
      fontSize: 20,
      color: 'white'
    }
  }

  render() {
    return (
      <View style={this.getTextContainerStyle()}>
        <Text style={this.getTextStyle()}>
          {this.props.children}
        </Text>
      </View>
    )
  }
}
