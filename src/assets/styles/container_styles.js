import { StyleSheet } from 'react-native';
import { dimensions } from './constants'

var styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    content: {
        marginTop: dimensions.headerHeight
    },

    footer: {
        bottom: 0
    }
});

export default styles;
