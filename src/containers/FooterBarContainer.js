import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'

import { Container, Content, Footer, FooterTab, Button, Text } from 'native-base'

class FooterBar extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button>
            <Text>Home</Text>
          </Button>
          <Button onPress = {() => Actions.remotes()}>
            <Text>DL</Text>
          </Button>
          <Button>
            <Text>Hej</Text>
          </Button>
          <Button>
            <Text>Profile</Text>
          </Button>
        </FooterTab>
      </Footer>
    ) 
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterBar)
