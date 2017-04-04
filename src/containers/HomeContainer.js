import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Actions } from 'react-native-router-flux'
const {
  View,
  TouchableHighlight
} = ReactNative
import { Container, Content, Footer, FooterTab, Button, Icon, Badge, Text } from 'native-base'
import styles from '../assets/styles/home_styles'
import Courses from './CoursesContainer.js'
import RemoteCourses from './RemoteCoursesContainer.js'

class Home extends Component {
  render() {
    return (
      <Container>
        <View style={styles.displayContainer}>
          <Text style={{marginTop: 80}}>
            Welcome to APP! 
          </Text>
          <Courses/>
          <RemoteCourses/>
        </View>
        <Footer>
          <FooterTab>
            <Button active>
              <Text>Home</Text>
            </Button>
            <Button onPress={() => Actions.remotes()}>
              <Text>DL</Text>
            </Button>
            <Button>
              <Text>HEJHEJ</Text>
            </Button>
            <Button>
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
