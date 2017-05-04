import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { Footer, FooterTab, Button, Text, View } from 'native-base'
import Alignment from './AlignmentContainer'
import * as language from '../assets/styles/language_strings'

class FooterBar extends Component {

  isActiveTab(tab) {
    return tab===this.props.activeTab
  }

 render() {
    let homePage =
      <Button active={this.isActiveTab("home")} onPress = {() => Actions.home()} key={"home"}>
        <Text>
          {this.props.getLanguage.home}
        </Text>
      </Button>

    let downloadPage =
      <Button active={this.isActiveTab("remotes")} onPress = {() => Actions.remotes()} key={"download"}>
        <Text>
          {this.props.getLanguage.download}
        </Text>
      </Button>

    let achievementsPage =
      <Button active={this.isActiveTab("achievements")} onPress = {() => Actions.achievements()} key={"achievements"}>
        <Text>
          {this.props.getLanguage.achievements}
        </Text>
      </Button>

    let profilePage =
      <Button active={this.isActiveTab("profile")} onPress = {() => Actions.profile()} key={"profile"}>
        <Text>
          {this.props.getLanguage.profile}
        </Text>
      </Button>

    let pageList =[homePage, downloadPage, achievementsPage, profilePage]
    {this.props.settingsAlignRight ? pageList.reverse() : pageList}
    return (
      <View>
        {this.props.activeTab != "slide" && this.props.activeTab != "finishedLesson" ?
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
    settingsAlignRight: state.settings ? state.settings.get('alignment') : false,
    getLanguage : state.settings.get('english') ? language.arabic : language.eng
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterBar)
