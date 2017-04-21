import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Content, Text, Button } from 'native-base'
import styles from '../assets/styles/container_styles'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'

class NextPrevButtons extends Component {

  render() {
    let flexDir = this.props.alignRight ? 'row' : 'row-reverse'
    return (
      <View style={StyleSheet.flatten([styles.nextPrev])}>
        <Button key={'next'} full onPress = {() => this.props.nextSlide(
            this.props.currentSlidePos, this.props.lessonMaterial)}>
          <Text>
            Next
          </Text>
        </Button>
        <Button key={'prev'} full onPress = {() => this.props.previousSlide(
            this.props.currentSlidePos, this.props.lessonMaterial)} >
          <Text>
            Previous
          </Text>
        </Button>
      </View>
    ) 
  }
}

function mapStateToProps(state) {
  return {
    currentSlidePos: state.activeCourse.get('currentSlidePos'),
    lessonMaterial: state.activeCourse.get('lessonMaterial'),
    alignRight: state.settings ? state.settings.get('alignment') : false
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NextPrevButtons)
