import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { View } from 'react-native'
import { Container, Content, Button, Text } from 'native-base'
import SlideText from './elements/Text'
import BigSlideText from './elements/BigText'
import { Bar , Circle} from 'react-native-progress'
import SCompile from '../lib/slideCompile/SCompile'
import Alignment from './AlignmentContainer'
import * as language from '../assets/styles/language_strings'
import styles from '../assets/styles/slide_styles'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet, Dimensions } from 'react-native'

class FinishedLesson extends Component {
  
  results() {
    let correctAnswers = 0
    let allAnswers = 0
    if (this.props.getResult != false) {
      for (let i = 0; i <= this.props.currentSlidePos; i++) {
        let tempMap = this.props.getResult.get(i)
        if (tempMap != undefined) {
          allAnswers++
          if (tempMap.get("isCorrect") === true) {
            correctAnswers++
          }
        }
      }
    }
    return [allAnswers, correctAnswers]
  }

  render() {
    let {height, width} = Dimensions.get('window')
    let flexDir = this.props.alignRight ? 'row' : 'row-reverse'
    let answers = this.results()
    let percentageAnswers = 1
    if (answers[0] > 0 ) {
      percentageAnswers = answers[1] / answers[0]
    } else {
      answers[0] = 1
      answers[1] = 1
    }

    return (
      <LinearGradient colors={['#f4a791', '#f3818a']} style={styles.content}>
        <Bar progress={1} borderWidth={0} color={'rgba(255,255,255,1)'}
          width={width} borderRadius={0} style={styles.progress}/>
        <View style={StyleSheet.flatten(styles.slideElements)}>
          <SlideText>
            Congratulations! You just completed 
          </SlideText>
          <BigSlideText>
            {this.props.activeLesson}
          </BigSlideText>
          <Circle borderWidth = {0.5} size = {width/2} progress = {percentageAnswers} color={'rgba(255,255,255,1)'} style = {styles.progress} marginBottom={20}/>
          <BigSlideText>
            {answers[1]} / {answers[0]}
          </BigSlideText>
          <SlideText>
            Correct answers!
          </SlideText>
        </View>
        <View style={styles.footer}>
          <View style = {StyleSheet.flatten([styles.nextPrevButtonsContainer], {flexDirection: flexDir})}>
            <Button full bordered key={'done'} style={StyleSheet.flatten(styles.nextPrevButton)}
              onPress={() => Actions.lessons()}>
              <Text style={StyleSheet.flatten(styles.nextPrevButtonText)}>
                Choose another lesson
              </Text>
            </Button>
          </View>
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
    alignRight: state.settings ? state.settings.get('alignment') : false,
    getResult: state.activeCourse.get('interactions') ? state.activeCourse.get('interactions') : false
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishedLesson)
