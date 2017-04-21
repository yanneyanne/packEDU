import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { View, Header, Container, ListItem, Content, Text, Button } from 'native-base'
import Alignment from './AlignmentContainer'
import * as language from '../assets/styles/language_strings'

class Courses extends Component {

  componentDidMount() {
    console.log("Courses are mounting")
    this.props.loadLocalCourses()
  }

  getLocalCourses() {
    return this.props.localCourses
  }

  startCourse(courseId) {
    this.props.setActiveCourse(courseId)
    Actions.lessons()
  }

  render() {
    return (
      <Content>
        <Alignment>
          <ListItem itemHeader first>
            <Text> 
              {this.props.getLanguage.home} 
            </Text>
          </ListItem>
          {this.getLocalCourses().map(course => {
            return (
              <View Style = {{marginTop: 10}} key ={course.get('id')}>
                <ListItem button onPress={() => {this.startCourse(course.get('id'))}}>
                  <Text>
                    {course.get('name')}
                  </Text>
                </ListItem>
              </View>
            )
          })}
        </Alignment>
      </Content>
    ) 
  }
}

function mapStateToProps(state) {
  return {
    localCourses: state.courses,
    settingsAlignRight: state.settings ? state.settings.get('alignment') : false,
    getLanguage: state.settings.get('english') ? language.arabic : language.eng
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
