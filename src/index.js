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
import Profile from './containers/ProfileContainer'
import { Actions, ActionConst, Router, Scene } from 'react-native-router-flux';

import { Container } from 'native-base'
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
    <Scene key='slide' title='Course' component={Slide}></Scene>
    <Scene key='profile' title='Profile' component={Profile}></Scene>
  </Scene>
)

export default class AppContainer extends Component {
  render() {
    return(
      <Provider store={store}>
        <Container>
          <RouterWithRedux scenes={Scenes}/>
          <FooterBar/>
        </Container>
      </Provider>
    )
  }
}
