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
        bottom: 5,
        left: 5,
        right: 5
    },

    progress: {
        alignSelf: 'center'
    },

    nextPrevButtons: {
        justifyContent: 'space-between',
        marginTop: 5
    }
});

export default styles
