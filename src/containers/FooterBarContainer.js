import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { Footer, FooterTab, Button, Text, View, Icon } from 'native-base'
import Alignment from './AlignmentContainer'
import * as language from '../assets/styles/language_strings'
import homeImg from '../assets/imgs/home.png'
import profileImg from '../assets/imgs/profile.png'
import achievementsImg from '../assets/imgs/achievements.png'
import downloadImg from '../assets/imgs/download.png'
import { Image } from 'react-native'


class FooterBar extends Component {

  isActiveTab(tab) {
    return tab===this.props.activeTab
  }

 render() {
    let homePage =
      <Button  active={this.isActiveTab("home")} onPress = {() => Actions.home()} key={"home"}>
      <Image style={{width: 30, height: 30}} source = {homeImg} />
      </Button>

    let downloadPage =
      <Button active={this.isActiveTab("remotes")} onPress = {() => Actions.remotes()} key={"download"}>
      <Image style={{width: 30, height: 30}} source = {downloadImg} />
      </Button>

    let achievementsPage =
      <Button active={this.isActiveTab("achievements")} onPress = {() => Actions.achievements()} key={"achievements"}>
      <Image style={{width: 30, height: 30}} source = {achievementsImg} />
      </Button>

    let profilePage =
      <Button active={this.isActiveTab("profile")} onPress = {() => Actions.profile()} key={"profile"}>
      <Image style={{width: 30, height: 30}} source = {profileImg} />
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
