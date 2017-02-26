import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'
import styles from './assets/styles/styles'
import Home from './containers/HomeContainer'

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

export default function AppContainer() {
	return(
		<Provider store={store}>
			<Home {...this.props}/>
		</Provider>
	)
}
