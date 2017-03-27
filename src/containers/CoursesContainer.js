import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Map } from 'immutable'

const {
  View,
  Text,
  TouchableHighlight,
  Scrollview
} = ReactNative

class Courses extends Component {
  componentDidMount() {
    console.log("Courses are mounting")
    this.props.loadLocalCourses() 
  }

  render() {
    return (
      <View>
        <Text>
          This is the local course view
        </Text>
      </View>
    ) 
  }
}

function mapStateToProps(state) {
  return {
  
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
