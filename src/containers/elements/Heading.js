import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { View, Text } from 'native-base'

export default class Heading extends Component {

  getTextContainerStyle() {
    return {
      marginBottom: 40,
      backgroundColor: 'rgba(0,0,0,0)'
    }
  }

  getTextStyle() {
    return {
      justifyContent: 'center',
      fontSize: 30,
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
