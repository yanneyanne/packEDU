import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Map } from 'immutable'
import { Actions } from 'react-native-router-flux'
import { Label, Header, Container,ListItem, Content, Left, Right, Text, Body, Button} from 'native-base'

const {
  TouchableHighlight
} = ReactNative

class Courses extends Component {

  constructor(props){
    super(props)
    this.startCourse = this.startCourse.bind(this)
  }
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
          <Content>
          <ListItem itemHeader first>
          <Right>
           <Text style={{fontWeight: 'bold'}}>
             الدورات المحلية
           </Text>
           </Right>
           </ListItem>
          {this.getLocalCourses().map(course => {
            let courseId = course[0]
            let courseName = course[1]
            return (
              <ListItem button onPress={ () => {this.startCourse(courseId)}}>
                  <Right>
                    <Text>
                      {courseName}
                    </Text>
                  </Right>
              </ListItem>
              )
          })} 

        </Content>
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
