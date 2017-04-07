import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Map } from 'immutable'
import { Actions } from 'react-native-router-flux'
import { Label, Header, Container,ListItem, Content, Left, Right, Text, Body, Button} from 'native-base'
import Alignment from './AlignmentContainer'

const {
  TouchableHighlight,
  View
} = ReactNative

class Courses extends Component {

  constructor(props){
    super(props)
    this.startCourse = this.startCourse.bind(this)
  }
  componentDidMount() {
    console.log("Courses are mounting")
    console.log
    this.props.loadLocalCourses()
    this.props.toggleTextOrientation()
  }
  
  toggleTextOrientation() {
    console.log(this.props.settingsAlignment)
    this.props.toggleTextOrientation()
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
      <Content>
      <Alignment>
        <Button full onPress= {() => this.toggleTextOrientation() }>
          <Text>
            PLACEHOLDER FOR SETTINGS/TEXTORIENTATION
          </Text>
        </Button>
          <ListItem itemHeader first>
              <Text style={{fontWeight: 'bold'}}>
                الدورات المحلية
              </Text>
          </ListItem>
        {this.getLocalCourses().map(course => {
          let courseId = course[0]
          let courseName = course[1]
          return (
          <View Style = {{marginTop: 10}} key ={courseId}>
            <ListItem button onPress={() => {this.startCourse(courseId)}}>
              <Text>
                {courseName}
              </Text>
            </ListItem>
          </View>
          )
        })} 
      </Alignment>
      </Content>
    ) 
    this.props.children
  }
}



function mapStateToProps(state) {
  return {
    localCourses: state.courses,
    settingsAlignmentLeft: state.settings ? state.settings.get('alignment') : false
}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
