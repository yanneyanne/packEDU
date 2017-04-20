import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { View, Text, Button, Footer } from 'native-base'
import styles from '../assets/styles/container_styles'

class NextPrevButtons extends Component {

  render() {
    return (
      <Footer>
        <Button key={'prev'} onPress = {() => this.props.previousSlide(
            this.props.currentSlidePos, this.props.lessonMaterial)} >
          <Text>
            Previous
          </Text>
        </Button>
        <Button key={'next'} onPress = {() => this.props.nextSlide(
            this.props.currentSlidePos, this.props.lessonMaterial)}>
          <Text>
            Next
          </Text>
        </Button>
      </Footer>
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
