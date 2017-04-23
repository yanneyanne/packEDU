import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { View, Text } from 'native-base'

export default class SlideText extends Component {

  getTextStyle() {
    return {
      marginBottom: 40
    }
  }

  render() {
    return (
      <View style={this.getTextStyle()}>
        <Text>
          {this.props.children}
        </Text>
      </View>
    ) 
  }
}
