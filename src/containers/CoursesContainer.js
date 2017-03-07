import React, { Component } from 'react'
import Api from '..'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'

const {
  View,
  Text,
  TouchableHighlight,
  ScrollView
} = ReactNative

class Courses extends Component {
  componentDidMount() {
    console.log("We loadin up dat course view")
    this.props.fetchCourses()
  }

  render() {
    return (
      <View>
        <View>
          <Text style={{marginTop: 100}}>
            Your courses:
          </Text>
        </View> 
        <ScrollView>
        </ScrollView>
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
