import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
const {
  View,
  Text,
  TouchableHighlight
} = ReactNative

class Courses extends Component {
  render() {
    return (
      <View>
        <Text style={{marginTop: 100}}>
          In the course list
        </Text>
      </View>
    )	
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
