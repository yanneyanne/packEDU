import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { View, Text, Button} from 'native-base'
import Interaction from './Interaction.js'

class MultipleChoice extends Interaction {

  getBaseChoiceStyle() {
    return {
      alignSelf: 'center',
      margin: 5,
      borderRadius: 0,
    } 
  }

  getStandardChoiceStyle() {
    let style = {
      borderColor: 'white'
    }
    return Object.assign(style, this.getBaseChoiceStyle())
  }

  getIncorrectChoiceStyle() {
    let style = {
      borderColor: 'red',
      backgroundColor: 'red'
    }
    return Object.assign(style, this.getBaseChoiceStyle())
  }

  getCorrectChoiceStyle() {
    let style = {
      borderColor: 'green',
      backgroundColor: 'green'
    }
    return Object.assign(style, this.getBaseChoiceStyle())
  }

  getChoiceTextStyle() {
    return {
      backgroundColor: 'rgba(0,0,0,0)',
      color: 'white' 
    }
  }

  render() {
    // The choices, evaluator and key are currently being passed in as props
    // Is it a better idea to put them in the redux state?
    return (
      <View style={{alignSelf: 'center'}}>
        {this.props.choices.map((choice) => {
          let style = this.props.isCorrect ? this.getCorrectChoiceStyle() : this.getIncorrectChoiceStyle()
          let choiceStyle = this.props.input === choice ?  style : this.getStandardChoiceStyle()
          return (
            <Button bordered disabled={this.isAnswered()} key={choice} style={choiceStyle} onPress={() => this.answer(choice)}>
              <Text style={this.getChoiceTextStyle()}>
                {choice}
              </Text>
            </Button>
          )
        })}
      </View>
    )
  }
}

function mapStateToProps(state) {
  let currentSlidePos = state.activeCourse.get('currentSlidePos')
  return {
    currentSlidePos: currentSlidePos,
    isCorrect: state.activeCourse.getIn(['interactions', currentSlidePos, 'isCorrect'], undefined),
    input: state.activeCourse.getIn(['interactions', currentSlidePos, 'input'], undefined)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice)
