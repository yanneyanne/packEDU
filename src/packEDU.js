import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {
    Text,
    AppRegistry,
	View
} from 'react-native';
import reducer from './reducers'

import AppContainer from './containers/AppContainer'
import styles from './assets/styles/styles'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })

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

export const App = () => (
	<Provider store={store}>
		<AppContainer/>
	</Provider>
)
AppRegistry.registerComponent('packEDU', () => App);
