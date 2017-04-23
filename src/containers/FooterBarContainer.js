import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { Footer, FooterTab, Button, Text, View } from 'native-base'
import Alignment from './AlignmentContainer'

class FooterBar extends Component {

  isActiveTab(tab) {
    return tab===this.props.activeTab
  }

  render() {
    let homePage =
      <Button active={this.isActiveTab("home")} onPress = {() => Actions.home()} key={"home"}>
        <Text>
          Home
        </Text>
      </Button>

    let downloadPage =
      <Button active={this.isActiveTab("remotes")} onPress = {() => Actions.remotes()} key={"download"}>
        <Text>
          DL
        </Text>
      </Button>

    let achievementsPage =
      <Button active={this.isActiveTab("achievements")} onPress = {() => Actions.achievements()} key={"achievements"}>
        <Text>
          Achievements
        </Text>
      </Button>

    let profilePage =
      <Button active={this.isActiveTab("profile")} onPress = {() => Actions.profile()} key={"profile"}>
        <Text>
          Profile
        </Text>
      </Button>

    //This alignment could all possibly be done with flexbox and styling
    let pageList = [homePage, downloadPage, achievementsPage, profilePage]
    {this.props.settingsAlignRight ? pageList.reverse() : pageList}
    return (
      <View>
        {this.props.activeTab != "slide" ?
          <Footer>  
            <FooterTab>
              {pageList}
            </FooterTab>
          </Footer>
          :
          null
        }
      </View>
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
