import React, { Component } from 'react'
import { connect } from 'react-redux'
import {View, Left, Right} from 'native-base'
import { ActionCreators } from '../actions'
import { bindActionCreators } from 'redux'
import { Map } from 'immutable'

class Alignment extends Component {

  render() {
    return (
      <View>
      {this.props.alignLeft ? 
        <Left>
          {this.props.children}
        </Left>
        :
        <Right>
          {this.props.children}
        </Right>}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
  alignLeft : state.settings ? state.settings.get('alignment') : false
}}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

 export default connect(mapStateToProps, mapDispatchToProps)(Alignment)
