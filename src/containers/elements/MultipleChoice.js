import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { View, Text, Button} from 'native-base'

class MultipleChoice extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      answered: false,
      input: undefined
    }
  }

  componentDidMount() {
    this.props.addInteraction() 
  }

  answer(input) {
    let evaluator = this.props.evaluator
    let ansKey = this.props.answer
    console.log("Sending evaluation from mutiple choice")
    this.state.answered = true
    this.state.input = input
    this.props.evaluateAnswer(input, evaluator, ansKey)
    console.log(this.state.answered)
    console.log(this.state.input)
  }

  getBaseChoiceStyle() {
    return {
      alignSelf: 'center',
      margin: 5,
      borderRadius: 0,
      borderColor: 'white'
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
      color: 'white' 
    }
  }

  render() {
    // The choices, evaluator and key are currently being passed in as props
    // Is it a better idea to put them in the redux state?
    return (
      <View style={{alignSelf: 'center'}}>
        {this.props.choices.map((choice) =>
            <Button bordered key={choice} style={this.getStandardChoiceStyle()} onPress={() => this.answer(choice)}>
              <Text style={this.getChoiceTextStyle()}>
                {choice}
              </Text>
            </Button>
        )}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice)
