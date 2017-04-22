import { StyleSheet } from 'react-native';
import { dimensions } from './constants'

var styles = StyleSheet.create({
    content: {
        marginTop: dimensions.headerHeight,
        alignItems: 'center'
    },

    lessonButton: {
        marginBottom: 10
    },

    slideContent: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },
});

export default styles
