import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { View } from 'react-native'
import { Container, Content, Button, Text} from 'native-base'
import SlideText from './elements/Text'
import Heading from './elements/Heading'
import { Bar , Circle} from 'react-native-progress'
import SCompile from '../lib/slideCompile/SCompile'
import Alignment from './AlignmentContainer'
import * as language from '../assets/styles/language_strings'
import styles from '../assets/styles/finishedLesson_styles'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet, Dimensions } from 'react-native'
import { Map } from 'immutable'

class FinishedLesson extends Component {

  results() {
    let correctAnswers = 0
    let allAnswers = 0
    this.props.interactions.keySeq().forEach((key) => {
      allAnswers++
      if ((this.props.interactions.get(key)).get("isCorrect") === true)
        correctAnswers++
    })
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
        <View style={StyleSheet.flatten(styles.finishedElements)}>
          <SlideText>
            Congratulations! You just completed
          </SlideText>
          <SlideText>
            {this.props.activeLesson}
          </SlideText>
          <Circle borderWidth = {0.5} size = {width/2} progress = {percentageAnswers} color={'rgba(255,255,255,1)'} marginBottom={20}/>
          <View style={StyleSheet.flatten(styles.resultsContainer)}>
            <Text style={StyleSheet.flatten(styles.resultsText)}>
              {answers[1]} / {answers[0]}
            </Text>
          </View>

          <SlideText>
            Correct answers!
          </SlideText>
        </View>
        <View style={styles.footer}>
          <View>
            <Button full bordered key={'done'} style={StyleSheet.flatten(styles.chooseNewLessonButton)}
              onPress={() => Actions.lessons()}>
              <Text style={StyleSheet.flatten(styles.finishedLessonButtonText)}>
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
    activeLesson: state.activeCourse.get('activeLesson'),
    alignRight: state.settings ? state.settings.get('alignment') : false,
    interactions: state.activeCourse.get('interactions') ? state.activeCourse.get('interactions') : Map()
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishedLesson)
