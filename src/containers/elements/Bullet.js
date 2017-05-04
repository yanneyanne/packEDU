import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { View, Text } from 'native-base'

export default class Bullet extends Component {

  getTextContainerStyle() {
    return {
      marginBottom: 20,
      backgroundColor: 'rgba(0,0,0,0)',
      flexDirection: 'row'
    }
  }

  getTextStyle() {
    return {
      justifyContent: 'center',
      fontSize: 20,
      color: 'white'
    } 
  }

  render() {
    return (
      <View style={this.getTextContainerStyle()}>
        <Text style={this.getTextStyle()}>
          {`\u2022`} {this.props.children}
        </Text>
      </View>
    ) 
  }
}
