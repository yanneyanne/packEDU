import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { View } from 'react-native'
import { Container, Content, Text, Button } from 'native-base'
import { Bar } from 'react-native-progress'
import SCompile from '../lib/slideCompile/SCompile'
import Alignment from './AlignmentContainer'
import * as language from '../assets/styles/language_strings'
import NextPrevButtons from './NextPrevButtonsContainer'
import styles from '../assets/styles/slide_styles'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet, Dimensions, ScrollView } from 'react-native'

class Slide extends Component {

  componentWillUnmount() {
   console.log("Unmounting the slide")
    this.props.saveSlidePos(this.props.courseId,
      this.props.activeLesson,
      this.props.currentSlidePos,
      this.props.lessonMaterial.length
    )
    this.props.saveLastSession(this.props.courseId, this.props.activeLesson)
  }

  getSlideMaterial() {
    return this.props.lessonMaterial ?
      SCompile.getSlide(this.props.currentSlidePos, this.props.lessonMaterial) : []
  }

  getProgress() {
    return this.props.lessonMaterial ?
      this.props.currentSlidePos / this.props.lessonMaterial.length : 0
  }

  render() {
    let {height, width} = Dimensions.get('window')
    return(
      <LinearGradient colors={['#f4a791', '#f3818a']} style={styles.content}>
        <Bar progress={this.getProgress()} borderWidth={0} color={'rgba(255,255,255,1)'}
          width={width} borderRadius={0} style={styles.progress}/>
        <View style={StyleSheet.flatten(styles.slideElements)}>
          <ScrollView style={{overflow: 'hidden'}}>
            <View>
              { this.getSlideMaterial().map(elt => {
                return elt
              })}
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <NextPrevButtons onFinnish={this.finishLesson}/>
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
