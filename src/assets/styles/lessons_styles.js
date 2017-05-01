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
        justifyContent: 'center',
        left: 0,
        right: 0,
        bottom: 5
    },

    removeCourseButton: {
        position: 'relative',
    },

    removeCourseButtonText: {
        color: '#D9534F'
    }
});

export default styles
