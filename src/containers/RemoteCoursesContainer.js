import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Map } from 'immutable'
import Alignment from './AlignmentContainer'
import { Container, Content, View, Text } from 'native-base'

const {
  TouchableHighlight,
  ScrollView
} = ReactNative

class RemoteCourses extends Component {
  componentDidMount() {
    this.props.fetchRemoteCourses()
  }

  getRemoteCourses() {
    return this.props.remoteCourses
  }

  downloadCourse(courseId) {
    this.props.downloadRemoteCourse(courseId)
  }
  
  render() {
    return (
      <Content marginTop={63}>
        <Alignment>
          <View>
            <Text>
              Download more Courses:
            </Text>
          </View> 
          <ScrollView>
              {this.getRemoteCourses().map(course => {
                // Remote courses are an Immutable.Seq of pairs in the form [id, name]
                let courseId = course[0]
                let courseName = course[1]
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
        </Alignment>
      </Content>
    )	
  }
}

function mapStateToProps(state) {
  return {
    remoteCourses: state.remoteCourses
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteCourses)
