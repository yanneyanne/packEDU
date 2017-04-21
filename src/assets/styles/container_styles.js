import { StyleSheet } from 'react-native';
import { dimensions } from './constants'

var styles = StyleSheet.create({
    content: {
        marginTop: dimensions.headerHeight,
        alignItems: 'center'
    },

    slideContent: {
        flex: 1,
        marginTop: dimensions.headerHeight
    },

    slideFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },

    progress: {
        alignSelf: 'center'
    },

    nextPrevButtons: {
        justifyContent: 'center'
    }
});

export default styles
