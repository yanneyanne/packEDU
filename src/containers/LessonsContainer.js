import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Actions } from 'react-native-router-flux'
import { Content, Button, Text} from 'native-base'

class Lessons extends Component {

  getLessons() {
    console.log("Getting lessons!")
    console.log(this.props.lessons)
    return this.props.lessons || [] 
  }

  render() {
    return (
      <Content style={{marginTop: 65}}>
        {this.getLessons().map((lesson) => {
          return (
            <Button>
              <Text>
                {lesson}
              </Text>
            </Button>
          )
        })}
      </Content>
    )
  }
}

function mapStateToProps(state) {
  return {
    lessons: state.activeCourse.get('lessons')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Lessons)
