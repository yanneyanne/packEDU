import { StyleSheet } from 'react-native';
import { dimensions } from './constants'

var styles = StyleSheet.create({
    content: {
        marginTop: dimensions.headerHeight,
        alignItems: 'center'
    },

    slideContent: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
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
