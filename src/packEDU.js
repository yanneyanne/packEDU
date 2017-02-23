import React, { Component } from 'react';
import {
    Text,
    AppRegistry,
	View
} from 'react-native';

import styles from './assets/styles/styles';

export class packEDU extends Component {

    render() {
        return (
			<View style={styles.rootContainer}>
    			<View style={styles.displayContainer}></View>
	    		<View style={styles.inputContainer}></View>
			</View>
        )
    }
}

AppRegistry.registerComponent('ReactCalculator', () => ReactCalculator);
