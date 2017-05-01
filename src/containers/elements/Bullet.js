import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { View, Text } from 'native-base'

export default class Bullet extends Component {

  getTextContainerStyle() {
    return {
      marginBottom: 20,
      backgroundColor: 'rgba(0,0,0,0)'
    }
  }

  getTextStyle() {
    return {
      justifyContent: 'center',
      fontSize: 20,
      color: 'white'
    } 
  }

  getCircleStyle() {
    return {
      width: 10,
      height: 10,
      borderRadius: 10/2,
      backgroundColor: 'white'
    } 
  }

  render() {
    return (
      <View style={this.getTextContainerStyle()}>
        <View style={this.getCircleStyle()}></View>
        <Text style={this.getTextStyle()}>
          {this.props.children}
        </Text>
      </View>
    ) 
  }
}
