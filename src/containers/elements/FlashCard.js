import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { View } from 'native-base'
import Text from './Text.js'
var TouchableWithoutFeedback = require('TouchableWithoutFeedback')

class FlashCard extends Component {
  constructor(){
    super()
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
    return(
      <TouchableWithoutFeedback onPress={this.showAnswer}>
        <View style={{alignSelf: 'center'}}>
          <Text style={{alignSelf: 'center'}}>{this.props.word}</Text>

          <Text style={{alignSelf: 'center'}}> {this.state.pressed ? this.props.answer : ''} </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

}

function mapStateToProps(state) {
  let currentSlidePos = state.activeCourse.get('currentSlidePos')
  return {
    currentSlidePos: currentSlidePos
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashCard)
