import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Content, View, Left, Right, Text, ListItem} from 'native-base'
import { ActionCreators } from '../actions'
import { bindActionCreators } from 'redux'
import { Map } from 'immutable'
import styles from '../assets/styles/home_styles'

class Alignment extends Component {
  render() {
    return (
      <Content>
        {this.props.alignLeft ? 
          <View flex={1} alignItems={'flex-end'}>
            {this.props.children}
          </View>
          :
          <View flex={1} alignItems={'flex-start'}>
            {this.props.children}
          </View>
        }
      </Content>
    )
  }
}

function mapStateToProps(state) {
  return {
  alignLeft : state.settings ? state.settings.get('alignment') : false
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

 export default connect(mapStateToProps, mapDispatchToProps)(Alignment)
