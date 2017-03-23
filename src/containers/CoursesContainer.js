import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Map } from 'immutable'

const {
  View,
  Text,
  TouchableHighlight,
  ScrollView
} = ReactNative

class Courses extends Component {
  componentDidMount() {
    this.props.fetchRemoteCourses()
  }

  getRemoteCourses() {
    return this.props.remoteCourses || Map().entrySeq()
  }

  downloadCourse(courseId) {
    console.log("DL button pressed")
    console.log(courseId)
  }
  
  render() {
    return (
      <View>
        <View>
          <Text style={{marginTop: 100}}>
            Your courses:
          </Text>
        </View> 
        <ScrollView style={{marginTop: 20}}>
          {this.getRemoteCourses().map(course => {
            // Remote courses are an Immutable.Seq of pairs in the form [id, name]
            courseId = course[0] 
            courseName = course[1]
            return (
              <View style={{marginTop: 10}} key={courseId}>
                <TouchableHighlight>
                  <Text>
                    {courseName}
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress = {() => {this.downloadCourse(courseId)}}>
                  <Text>
                    Download
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
    /* Using Immutabel.Map as state child not fully supported. We convert the map to an
    array of entries in the form [[key1, value1], [key2, value2]], more specifically in
     this case: [[courseId1, courseName1], [courseId2, courseName2]] */
    remoteCourses: state.remoteCourses.entrySeq() 
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Courses)
