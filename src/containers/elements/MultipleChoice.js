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

  render() {
    // The choices, evaluator and key are currently being passed in as props
    // Is it a better idea to put them in the state?
    return (
      <View>
        {this.props.choices.map((choice) =>
            <Button key={choice} onPress={() => this.answer(choice)}>
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
