import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { View, Container, Text, Button, ProgressBar } from 'native-base'

class Slide extends Component {

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentSlidePos !== this.props.currentSlidePos) {
      this.props.renderSlideAt(this.props.currentSlidePos, this.props.material)
    }
  }

  componentWillUnmount() {
    this.props.saveSlidePos(this.props.courseId, 
        this.props.lessonName, 
        this.props.currentSlidePos)
  }

  getSlideMaterial() {
    return this.props.currentSlideMaterial || [] 
  }

  getProgress() {
    //if (this.props.material)
    //  return this.props.currentSlidePos / this.props.material.length 
    //else
    //  return 0
    return "50"
  }

  render() {
    return(
      <Container style={{marginTop: 80}}>
        { this.getSlideMaterial().map(elt => {
          return elt
        })}
        <Button onPress = {() => this.props.previousSlide(
            this.props.currentSlidePos, this.props.material)}>
          <Text>
            Previous
          </Text>
        </Button>
        <Button onPress = {() => this.props.nextSlide(
            this.props.currentSlidePos, this.props.material)}>
          <Text>
            Next
          </Text>
        </Button>
        {/*<ProgressBar />*/}
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    courseId: state.activeCourse.get('id'),
    lessonName: state.activeCourse.get('lessonName'),
    currentSlidePos: state.activeCourse.get('currentSlidePos'),
    currentSlideMaterial: state.activeCourse.get('currentSlideMaterial'),
    material: state.activeCourse.get('material')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Slide)
