import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { View, Text, Button} from 'native-base'

class MultipleChoice extends Component {

  componentDidMount() {
    console.log("Interaction component mounting")
    this.props.addInteraction() 
  }

  answer(choice) {
    let evaluator = this.props.evaluator
    let ansKey = this.props.answer
    this.props.evaluateAnswer(choice, evaluator, ansKey)
  }

  getChoiceStyle() {
    return {
      alignSelf: 'center',
      margin: 5,
      borderRadius: 0,
      borderColor: 'white'
    } 
  }

  getChoiceTextStyle() {
    return {
      color: 'white' 
    } 
  }

  render() {
    // The choices, evaluator and key are currently being passed in as props
    // Is it a better idea to put them in the state?
    return (
      <View style={{alignSelf: 'center'}}>
        {this.props.choices.map((choice) =>
            <Button bordered key={choice} style={this.getChoiceStyle()} onPress={() => this.answer(choice)}>
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
    interactionsLeft: state.activeCourse.get('interactionsLeft') || 0
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice)
