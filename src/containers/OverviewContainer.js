import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
const {
	View,
	Text,
	TouchableHighlight
} = ReactNative

class Overview extends Component {
	render() {
		return (
			<View>
				<Text style={{marginTop: 20}}>
					In the overview
				</Text>
			</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
