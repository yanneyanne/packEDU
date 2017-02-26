import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import ReactNative from 'react-native'
import { Actions } from 'react-native-router-flux'

const {
	View,
	Text,
	TouchableHighlight
} = ReactNative

class Home extends Component {
	incrementCounter() {
		this.props.incrementCounter()
	}
	render() {
		return (
			<View>
				<Text style={{marginTop: 200}}>
					Hello, World! Count: {this.props.counter}
				</Text>
				<TouchableHighlight onPress={() => {this.incrementCounter()}}>
					<Text>
						Increment
					</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={() => { Actions.overview(); }}>                    
    				<Text>To overview</Text>
				</TouchableHighlight>
			</View>
		)	
	}
}

function mapStateToProps(state) {
	return {
		counter: state.counter
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
