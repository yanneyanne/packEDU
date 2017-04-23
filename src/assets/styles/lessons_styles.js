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
    }
});

export default styles
