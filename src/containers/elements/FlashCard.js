import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { Container, View, Button, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import styles from '../../assets/styles/flashcard_styles'
var TouchableWithoutFeedback = require('TouchableWithoutFeedback')

class FlashCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      pressed: false
    }
    this.showAnswer = this.showAnswer.bind(this)
  }
  showAnswer(){
    this.setState({
      pressed: !this.state.pressed
    })
  }

  render(){
    let flexDir = this.props.alignRight ? 'row' : 'row-reverse'
    console.log(this.props.alignRight)
    return(

      <TouchableWithoutFeedback onPress={this.showAnswer}>
        <View style={StyleSheet.flatten(styles.flashCardContainer)}>
          <View style={StyleSheet.flatten(styles.flashCardWords)}>
            <Text style={StyleSheet.flatten(styles.flashCardText)}>{this.props.word}</Text>
            <Text style={StyleSheet.flatten(styles.flashCardAnswerText)}> {this.state.pressed ? this.props.answer : ''} </Text>
          </View>

          <View style={StyleSheet.flatten(styles.flashCardControl)}>
            <Text style={StyleSheet.flatten(styles.flashCardText)}>DID YOU GET IT?</Text>
            <View style={{flexDirection: flexDir}}>
              <Button bordered small style={StyleSheet.flatten(styles.flashCardButtons)}>
                <Text style={StyleSheet.flatten(styles.flashCardText)}>
                  YES
                </Text>
              </Button>
              <Button bordered small style={StyleSheet.flatten(styles.flashCardButtons)}>
                <Text style={StyleSheet.flatten(styles.flashCardText)}>
                  NO
                </Text>
              </Button>
            </View>
          </View>

        </View>
      </TouchableWithoutFeedback>

    )
  }

}

function mapStateToProps(state) {
  let currentSlidePos = state.activeCourse.get('currentSlidePos')
  //console.log(state.settings)
  return {
    currentSlidePos: currentSlidePos,
    alignRight: state.settings ? state.settings.get('alignment') : false
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashCard)
