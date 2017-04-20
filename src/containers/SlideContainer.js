import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { Container, Text, Button, Content, View } from 'native-base'
import { Bar } from 'react-native-progress'
import SCompile from '../lib/slideCompile/SCompile'
import Alignment from './AlignmentContainer'

class Slide extends Component {
  constructor(props) {
    super(props)
      this.buttonNext =
        <Button key={'next'} onPress = {() => this.props.previousSlide(
            this.props.currentSlidePos, this.props.lessonMaterial)} >
          <Text>
            Previous
          </Text>
        </Button>
      
      this.buttonPrev =
        <Button key={'prev'} onPress = {() => this.props.nextSlide(
            this.props.currentSlidePos, this.props.lessonMaterial)}>
          <Text>
            Next
          </Text>
        </Button>
}

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
        <Content>
          <Alignment>
            { this.getSlideMaterial().map(elt => {
              return elt
            })}
          </Alignment>
          <Bar progress={this.getProgress()} width={200}/>
          {this.props.settingsAlignRight ? 
            <View>
              {this.buttonNext}
              {this.buttonPrev}
            </View>
            :
            <View>
              {this.buttonPrev}
              {this.buttonNext}
            </View>
          }
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    courseId: state.activeCourse.get('id'),
    activeLesson: state.activeCourse.get('activeLesson'),
    currentSlidePos: state.activeCourse.get('currentSlidePos'),
    lessonMaterial: state.activeCourse.get('lessonMaterial'),
    settingsAlignRight: state.settings ? state.settings.get('alignment') : false 
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Slide)
