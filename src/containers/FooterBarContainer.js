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
  
  constructor(props) {
    super(props)
      
    this.homePage =
      <Button active={this.isActiveTab("home")} onPress = {() => Actions.home()} key={"home"}>
        <Text>
          Home
        </Text>
      </Button>
   
    this.downloadPage =
      <Button active={this.isActiveTab("remotes")} onPress = {() => Actions.remotes()} key={"download"}>
        <Text>
          DL
        </Text>
      </Button>
   
    this.achievementsPage =
      <Button key={"achievements"}>
        <Text>
          Achievements
        </Text>
      </Button>
   
    this.profilePage = 
      <Button active={this.isActiveTab("profile")} onPress = {() => Actions.profile()} key={"profile"}>
        <Text>
          Profile
        </Text>
      </Button>
  }

 
  render() {
    let pageList = []
    pageList.push(this.homePage, this.downloadPage, this.achievementsPage, this.profilePage)
    {this.props.settingsAlignRight ? pageList.reverse() : pageList}
    return (
      <Footer>
        <FooterTab>
          {pageList}
        </FooterTab>
      </Footer>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeTab: state.default.scene ? state.default.scene.name : null,
    settingsAlignRight: state.settings ? state.settings.get('alignment') : false 
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterBar)
