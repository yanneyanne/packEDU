import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Map } from 'immutable'
import { Actions } from 'react-native-router-flux'

const {
  View,
  Text,
  TouchableHighlight,
  ScrollView
} = ReactNative

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
    Actions.slide();
  }

  render() {
    return (
      <View>
        <Text>
          Local courses:
        </Text>
        <ScrollView>
          {this.getLocalCourses().map(course => {
            let courseId = course[0]
            let courseName = course[1]
            return (
              <View style={{marginTop: 10}} key={courseId}>
                <TouchableHighlight onPress = {() => {this.startCourse(courseId)}}>
                  <Text>
                    {courseName}
                  </Text>
                </TouchableHighlight>
              </View>
            )
          })} 
        </ScrollView>
      </View>
    ) 
  }
}

function mapStateToProps(state) {
  return {
    localCourses: state.courses
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
