import { StyleSheet } from 'react-native';
import { dimensions } from './constants'

var styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    content: {
        marginTop: dimensions.headerHeight,
        alignItems: 'center'
    },

    slideContent: {
        marginTop: dimensions.headerHeight,
    },

    progressContainer: {
        flex: 1,
        alignItems: 'center'
    },

    progress: {
        alignSelf: 'center'
    },

    nextPrev: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FF0000',
        justifyContent: 'space-between'
    }
});

export default styles
