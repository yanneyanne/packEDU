import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { View, Text, Button} from 'native-base'

class MultipleChoice extends Component {

  componentDidMount() {
    console.log("Mounting multiple choice")
    this.props.addInteraction(this.props.currentSlidePos) 
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.currentSlidePos !== this.props.currentSlidePos)
      this.props.addInteraction(this.props.currentSlidePos)
  }

  answer(input) {
    let evaluator = this.props.evaluator
    let ansKey = this.props.answer
    let currentSlidePos = this.props.currentSlidePos
    this.props.validateInteraction(currentSlidePos, input, evaluator, ansKey)
  }

  isAnswered() {
    return typeof this.props.input !== 'undefined'
  }

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
    isCorrect: state.interactions.getIn([currentSlidePos, 'isCorrect'], undefined),
    input: state.interactions.getIn([currentSlidePos, 'input'], undefined)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice)
