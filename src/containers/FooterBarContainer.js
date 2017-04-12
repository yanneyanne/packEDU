import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'

import { Container, Content, Footer, FooterTab, Button, Text } from 'native-base'

class FooterBar extends Component {
  isActiveTab(tab) {
    return tab==this.props.activeTab
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button active={this.isActiveTab("home")} onPress = {() => Actions.home()}>
            <Text>Home</Text>
          </Button>
          <Button active={this.isActiveTab("remotes")} onPress = {() => Actions.remotes()}>
            <Text>DL</Text>
          </Button>
          <Button>
            <Text>Hej</Text>
          </Button>
          <Button active={this.isActiveTab("profile")} onPress = {() => Actions.profile()}>
            <Text>Profile</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeTab: state.default.scene ? state.default.scene.name : null
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterBar)
