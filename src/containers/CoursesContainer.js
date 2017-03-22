import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'

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

  getRemoteCourse() {
    return this.props.remoteCourses || {}
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
          {this.getRemoteCourse().map(course => {
            return (
              <View>
                <TouchableHighlight>
                  <Text>
                    {course}
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
    remoteCourses: state.remoteCourses 
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Courses)
