import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import {View, Text, Button} from 'native-base'

class MultipleChoice extends Component {

  answer(choice) {
    let evaluator = 3
    let ansKey = 5
    this.props.evaluateAnswer(choice, evaluator, ansKey)
  }

  render() {
    // The choices are currently being passed in as props
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
    evaluator: state.activeCourse.get('evaluator') 
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice)
