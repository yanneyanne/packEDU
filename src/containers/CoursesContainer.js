import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { Header, Container, ListItem, Content, Text, Button } from 'native-base'
import Alignment from './AlignmentContainer'
import * as language from '../assets/styles/language_strings'
import styles from '../assets/styles/courses_styles'
import { StyleSheet } from 'react-native'
import ReactNative from 'react-native'
import ResumeSessionButtonContainer from './ResumeSessionButtonContainer'

const {
  View
} = ReactNative

class Courses extends Component {

  componentDidMount() {
    console.log("Courses are mounting")
    this.props.loadLocalCourses()
    this.props.loadLastSession()
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
      <View style={StyleSheet.flatten(styles.content)}>
        <ListItem itemHeader first>
          <Text style={{fontWeight: 'bold'}}>
            {this.props.getLanguage.mycourses}
          </Text>
        </ListItem>
        {this.getLocalCourses().map(course => {
          return (
            <View Style = {{marginTop: 10}} key ={course.get('id')}>
              <Button bordered style={StyleSheet.flatten(styles.courseButton)}
                onPress={() => {this.startCourse(course.get('id'))}}>
                <Text>
                  {course.get('name')}
                </Text>
              </Button>
            </View>
          )
        })}
      </View>
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
