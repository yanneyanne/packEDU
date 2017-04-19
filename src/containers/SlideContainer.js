import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { Container, Text, Button } from 'native-base'
import { Bar } from 'react-native-progress'
import SCompile from '../lib/slideCompile/SCompile'

class Slide extends Component {

  componentWillUnmount() {
    this.props.saveSlidePos(this.props.courseId, 
        this.props.activeLesson, 
        this.props.currentSlidePos,
        this.props.lessonMaterial.length)
  }

  getSlideMaterial() {
    if(this.props.lessonMaterial)
      return SCompile.getSlide(this.props.currentSlidePos, this.props.lessonMaterial)
    else 
      return []
  }

  getProgress() {
    if (this.props.lessonMaterial)
      return this.props.currentSlidePos / this.props.lessonMaterial.length 
    else
      return 0
  }

  render() {
    return(
      <Container style={{marginTop: 80}}>
        { this.getSlideMaterial().map(elt => {
          return elt
        })}
        <Button onPress = {() => this.props.previousSlide(
            this.props.currentSlidePos, this.props.lessonMaterial)}>
          <Text>
            Previous
          </Text>
        </Button>
        <Button onPress = {() => this.props.nextSlide(
            this.props.currentSlidePos, this.props.lessonMaterial)}>
          <Text>
            Next
          </Text>
        </Button>
        <Bar progress={this.getProgress()} width={200}/>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    courseId: state.activeCourse.get('id'),
    activeLesson: state.activeCourse.get('activeLesson'),
    currentSlidePos: state.activeCourse.get('currentSlidePos'),
    lessonMaterial: state.activeCourse.get('lessonMaterial')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Slide)
