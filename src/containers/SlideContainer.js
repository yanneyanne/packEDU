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
  componentDidMount() {
    this.props.renderSlideAt(0) 
  } 

  render() {
    return(
      <View style={{marginTop: 80}}>
        <Text>
          {this.props.material}
        </Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    showingSlideAt: state.activeCourse.get('currentSlideAt'),
    material: state.activeCourse.get('material')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Slide)
