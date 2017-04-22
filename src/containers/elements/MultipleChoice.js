import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import {View, Text, Button} from 'native-base'

class MultipleChoice extends Component {

  answer(choice) {
    let evaluator = this.props.evaluator
    let ansKey = this.props.answer
    this.props.evaluateAnswer(choice, evaluator, ansKey)
  }

  getChoiceStyle() {
    return {
      alignSelf: 'center',
      margin: 5
    } 
  }

  render() {
    // The choices, evaluator and key are currently being passed in as props
    // Is it a better idea to put them in the state?
    return (
      <View style={{alignSelf: 'center'}}>
        {this.props.choices.map((choice) =>
            <Button key={choice} style={this.getChoiceStyle()} onPress={() => this.answer(choice)}>
              <Text>
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
