import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { View, Header, Container, ListItem, Content, Text, Button} from 'native-base'
import Alignment from './AlignmentContainer'

class Courses extends Component {

  constructor(props){
    super(props)
    this.startCourse = this.startCourse.bind(this)
  }
  componentDidMount() {
    console.log("Courses are mounting")
    this.props.loadLocalCourses()
  }
  
  toggleTextAlignment() {
    this.props.toggleTextAlignment()
  }

  getLocalCourses() {
    return this.props.localCourses
  }

  startCourse(courseId) {
    this.props.setActiveCourse(courseId)
    Actions.lessons();
  }

  render() {
    return (
      <Content>
        <Alignment>
          <Button full onPress= {() => this.toggleTextAlignment() }>
            <Text>
              PLACEHOLDER FOR SETTINGS/TEXTORIENTATION
            </Text>
          </Button>
            <ListItem itemHeader first>
              {this.props.settingsAlignRight ? 
              <Text style={{fontWeight: 'bold'}}>
                الدورات المحلية
              </Text>
              :
              <Text style={{fontWeight: 'bold'}}>
                My Courses
              </Text>
              }
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
  }
}



function mapStateToProps(state) {
  return {
    localCourses: state.courses,
    settingsAlignRight: state.settings ? state.settings.get('alignment') : false
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
