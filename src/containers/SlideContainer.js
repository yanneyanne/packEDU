import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import ReactNative from 'react-native'

const {
  View,
  Text,
  TouchableHighlight
} = ReactNative

class Slide extends Component {
  render() {
    return(
      <View style={{marginTop: 80}}>
        <Text>
          {this.props.activeCourseMaterial}
        </Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeCourseMaterial: state.activeCourse.get('material')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Slide)
