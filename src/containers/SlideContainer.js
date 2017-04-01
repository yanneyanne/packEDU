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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentSlidePos != this.props.currentSlidePos) {
      this.props.renderSlideAt(this.props.currentSlidePos, this.props.material)
    }
  }

  render() {
    return(
      <View style={{marginTop: 80}}>
        <Text>
          {this.props.currentSlideMaterial}
        </Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentSlidePos: state.activeCourse.get('currentSlidePos'),
    currentSlideMaterial: state.activeCourse.get('currentSlideMaterial'),
    material: state.activeCourse.get('material')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Slide)
