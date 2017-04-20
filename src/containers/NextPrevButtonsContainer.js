import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { View, Text, Button } from 'native-base'

class NextPrevButtons extends Component {

  constructor(props) {
    super(props) 
    this.prevButton =
      <Button key={'prev'} onPress = {() => this.props.previousSlide(
          this.props.currentSlidePos, this.props.lessonMaterial)} >
        <Text>
          Previous
        </Text>
      </Button>
 
    this.nextButton =
      <Button key={'next'} onPress = {() => this.props.nextSlide(
          this.props.currentSlidePos, this.props.lessonMaterial)}>
        <Text>
          Next
        </Text>
      </Button>
 
  }
  render() {
    return (
      <View>
        {this.prevButton}
        {this.nextButton}
      </View>
    ) 
  }
}

function mapStateToProps(state) {
  return {
    currentSlidePos: state.activeCourse.get('currentSlidePos'),
    lessonMaterial: state.activeCourse.get('lessonMaterial')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NextPrevButtons)
