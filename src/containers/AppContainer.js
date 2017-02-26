import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions'
import { bindActionCreators } from 'redux'
import Home from './HomeContainer'

class AppContainer extends Component {
	render() {
		return (
			<Home {...this.props} />
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch)
}

export default connect(() => { return {} }, mapDispatchToProps)(AppContainer)
