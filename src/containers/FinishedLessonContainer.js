import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { View } from 'react-native'
import { Container, Content, Button } from 'native-base'
import Text from './elements/Text'
import { Bar , Circle} from 'react-native-progress'
import SCompile from '../lib/slideCompile/SCompile'
import Alignment from './AlignmentContainer'
import * as language from '../assets/styles/language_strings'
import styles from '../assets/styles/slide_styles'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet, Dimensions } from 'react-native'

class FinishedLesson extends Component {
 
  quizResult() {
    let correctAnswers = 0
    let totalAnswers = 0
    for (let i = 0; i <= this.props.currentSlidePos; i++) {
      let temp = this.props.getResult.get(i)
      if (temp != undefined) {
        if (temp.get("isCorrect") === true) {
          correctAnswers++
          totalAnswers++
        } else {
          totalAnswers++
        }
      }
    }
    return [totalAnswers, correctAnswers]
  }


  render() {
    let {height, width} = Dimensions.get('window')
    let flexDir = this.props.alignRight ? 'row' : 'row-reverse'
    let result = this.quizResult()
    let percentageResult = result[1] / result[0]
    return (
      <LinearGradient colors={['#f4a791', '#f3818a']} style={styles.content}>

        <Bar progress={1} borderWidth={0} color={'rgba(255,255,255,1)'}
          width={width} borderRadius={0} style={styles.progress}/>

        <View style={StyleSheet.flatten(styles.slideElements)}>
          <Text>
            Congratulations! You just completed {this.props.activeLesson}
          </Text>
          <Circle progress = {percentageResult} color={'rgba(255,255,255,1)'} style = {styles.progress}/>
          <Text>
          {result[1]} / {result[0]}
          </Text>
          <Text>
          Correct answers!
          </Text>
        </View>
        
        <View style={styles.footer}>

          <View style = {StyleSheet.flatten([styles.nextPrevButtonsContainer], {flexDirection: flexDir})}>

            <Button full bordered key={'done'} style={StyleSheet.flatten(styles.nextPrevButton)}
              onPress={() => console.log("FINNISHED NOW RETURN")}>

              <Text style={StyleSheet.flatten(styles.nextPrevButtonText)}>
                Pick another lesson
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
    getResult: state.activeCourse.get('interactions') ? state.activeCourse.get('interactions') : 0
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishedLesson)
