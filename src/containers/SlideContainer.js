import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { View } from 'react-native'
import { Container, Content, Text, Button } from 'native-base'
import { Bar } from 'react-native-progress'
import SCompile from '../lib/slideCompile/SCompile'
import Alignment from './AlignmentContainer'
import NextPrevButtons from './NextPrevButtonsContainer'
import styles from '../assets/styles/slide_styles'
import { StyleSheet } from 'react-native'

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
      <View style={StyleSheet.flatten(styles.slideContent)}>
        { this.getSlideMaterial().map(elt => {
          return elt
        })}
        <View style={styles.slideFooter}>
          <Bar progress={this.getProgress()} width={300} style={StyleSheet.flatten(styles.progress)}/>
          <NextPrevButtons />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    courseId: state.activeCourse.get('id'),
    activeLesson: state.activeCourse.get('activeLesson'),
    currentSlidePos: state.activeCourse.get('currentSlidePos'),
    lessonMaterial: state.activeCourse.get('lessonMaterial'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Slide)
