import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers/'
import Home from './containers/HomeContainer'
import RemoteCourses from './containers/RemoteCoursesContainer'
import Slide from './containers/SlideContainer'
import FooterBar from './containers/FooterBarContainer'
import Lessons from './containers/LessonsContainer'
import Settings from './containers/SettingsContainer'
import Profile from './containers/ProfileContainer'
import Achievements from './containers/AchievementsContainer'
import FinishedLesson from './containers/FinishedLessonContainer'
import back_cross from './assets/imgs/back_cross.png'
import { Actions, ActionConst, Router, Scene } from 'react-native-router-flux'
import { dimensions } from './assets/styles/constants'
import { Container } from 'native-base'
import { ReactNative } from 'react-native'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })

const RouterWithRedux = connect()(Router)

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    )
  )
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({})
const Scenes = Actions.create(
  <Scene key='root'>
    <Scene key='home' title='Home' component={Home}></Scene>
    <Scene key='remotes' title='Download' component={RemoteCourses}></Scene>
    <Scene key='lessons' title='Lessons' component={Lessons}></Scene>
    <Scene key='slide' leftButtonIconStyle={{width: 35 , height: 35}} backButtonImage={back_cross} navigationBarStyle={{backgroundColor :'#f4a791'}} title='Course' component={Slide}></Scene>
    <Scene key='settings' title='Settings' component={Settings}></Scene>
    <Scene key='profile' title='Profile' component={Profile}></Scene>
    <Scene key='achievements' title='Achievements' component={Achievements}></Scene>
    <Scene key='finishedLesson' title='Finished Lesson' component={FinishedLesson}></Scene>
  </Scene>
)

export default class AppContainer extends Component {

  render() {
    return(
      <Provider store={store}>
        <Container>
          <RouterWithRedux
            navigationBarStyle={{height: dimensions.headerHeight}}
            scenes={Scenes}/>
          <FooterBar/>
        </Container>
      </Provider>
    )
  }
}
