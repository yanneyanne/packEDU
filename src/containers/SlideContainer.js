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
import * as language from '../assets/styles/language_strings'
import NextPrevButtons from './NextPrevButtonsContainer'
import styles from '../assets/styles/slide_styles'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet, Dimensions } from 'react-native'

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
    let {height, width} = Dimensions.get('window')
    return(
      <LinearGradient colors={['#f4a791', '#f3818a']} style={styles.content}>
        <Bar progress={this.getProgress()}
          width={width} borderRadius={0} style={styles.progress}/>
        <View style={StyleSheet.flatten(styles.slideElements)}>
          { this.getSlideMaterial().map(elt => {
            return elt
          })}
        </View>
        <View style={styles.footer}>
          <NextPrevButtons />
        </View>
      </LinearGradient>
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
