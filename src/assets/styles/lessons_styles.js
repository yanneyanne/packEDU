import { StyleSheet } from 'react-native';
import { dimensions } from './constants'
import general from './general_styles'

var styles = StyleSheet.create({
    content: 
        general.content,

    lessonButtonContainer: {
        marginBottom: 10
    },

    lessonButton: {
        width: 230,
        borderRadius: 0,
        justifyContent: 'center'
    },

    progress: {
        marginTop: 2
    },

    removeCourseContainer: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        right: 5,
    },

    removeCourseButton: {
        width: 230,
        borderRadius: 50,
        justifyContent: 'center',
        marginBottom: 10
    }
});

export default styles
