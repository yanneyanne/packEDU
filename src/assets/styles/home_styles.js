import { StyleSheet } from 'react-native';
import constants from './constants'

var styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    displayContainer: {
        flex: 2,
        backgroundColor: constants.bgColor
    },

    inputContainer: {
        flex: 8,
        backgroundColor: constants.fgColor
    }
});

export default styles;
