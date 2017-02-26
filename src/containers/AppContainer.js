import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions'
import { bindActionCreators } from 'redux'

const {
	View,
	Text,
	TouchableHighlight
} = ReactNative

class AppContainer extends Component {
	constructor(props) {
		super(props)
	}
	incrementCounter() {
		this.props.incrementCounter()	
	}
	render() {
		return (
			<View>
				<Text style={{marginTop: 20}}>
					Hello, World!
					Count: {this.props.counter}
				</Text>
				<TouchableHighlight onPress={() => {this.incrementCounter()} }> 
					<Text>
						Increment
					</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch)
}

function mapStateToProps(state) {
	return {
		counter: state.counter	
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
