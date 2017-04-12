import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Map } from 'immutable'
import { Actions } from 'react-native-router-flux'
import { View, Label, Header, Container,ListItem, Content, Left, Right, Text, Body, Button } from 'native-base'
import Alignment from './AlignmentContainer'

class Settings extends Component {

  render() {
    return (
        <Container>
        <Content>
        <View>
        <Button>
        <Text> Hejhej
        </Text>
        </Button>
        </View>
        </Content>
        </Container>
    )
  }
}


function mapStateToProps(state) {
  return {
    settingsAlignRight : state.settings ? state.settings.get('alignment') : false
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
