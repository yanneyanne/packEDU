import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { Container, Footer, FooterTab, Button, Text, View } from 'native-base'
import Alignment from './AlignmentContainer'

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
      <Button active={this.isActiveTab("achievements")} onPress = {() => Actions.achievements()} key={"achievements"}>
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

    this.buttonNext =
      <Button key={'next'} onPress = {() => this.props.previousSlide(
         this.props.currentSlidePos, this.props.lessonMaterial)} >
       <Text>
         Previous
       </Text>
      </Button>
    
    this.buttonPrev =
      <Button key={'prev'} onPress = {() => this.props.nextSlide(
        this.props.currentSlidePos, this.props.lessonMaterial)}>
        <Text>
          Next
        </Text>
      </Button>
 }

  render() {
    var displayList
    let buttonList = [this.buttonNext, this.buttonPrev]
    let pageList = [this.homePage, this.downloadPage, this.achievementsPage, this.profilePage]
    {this.props.activeTab != "slide" ? displayList = pageList : displayList = buttonList }
    {this.props.settingsAlignRight ? displayList.reverse() : displayList}
    return (
      <Footer>
        <FooterTab>
          {displayList}
        </FooterTab>
      </Footer>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeTab: state.default.scene ? state.default.scene.name : null,
    settingsAlignRight: state.settings ? state.settings.get('alignment') : false,
    currentSlidePos : state.activeCourse.get('currentSlidePos'),
    lessonMaterial : state.activeCourse.get('lessonMaterial')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterBar)
