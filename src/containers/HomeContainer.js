import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactNative from 'react-native'
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
				<Text style={{marginTop: 20}}>
					Hello, World! Count: {this.props.counter}
				</Text>
				<TouchableHighlight onPress={() => {this.incrementCounter()}}>
					<Text>
						Increment
					</Text>
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
export default connect(mapStateToProps)(Home)
