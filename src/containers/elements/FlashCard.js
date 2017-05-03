import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { Container, View, Button, Text } from 'native-base'
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
        <View style={{ justifyContent: 'center', marginBottom: 70, alignSelf: 'stretch', flex: 1, flexDirection: 'column' }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{backgroundColor: 'rgba(0,0,0,0)', color: 'white'}}>{this.props.word}</Text>
            <Text style={{backgroundColor: 'rgba(0,0,0,0)', color: 'white', fontWeight: 'bold', marginTop: 15}}> {this.state.pressed ? this.props.answer : ''} </Text>
          </View>

          <View style={{position: 'absolute', bottom: 5, left: 5, right: 5, alignItems: 'center'}}>
            <Text style={{alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0)', color: 'white'}}>DID YOU GET IT?</Text>
            <View style={{alignSelf: 'center', flexDirection: flexDir, padding: 10}}>
              <Button bordered small style={{borderColor: 'white', borderRadius: 0, marginLeft: 5, marginRight: 5}}>
                <Text style={{color: 'white'}}>
                  YES
                </Text>
              </Button>
              <Button bordered small style={{borderColor: 'white', borderRadius: 0, marginLeft: 5, marginRight: 5}}>
                <Text style={{color:'white'}}>
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
