import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import {View, Text, Button} from 'native-base'

class MultipleChoice extends Component {

  answer(ans) {
    this.props.validateAnswer(2, ans)
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
    validator: state.activeCourse.get('validator') 
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice)
