import { StyleSheet } from 'react-native';
import { dimensions } from './constants'
import general from './general_styles'

var styles = StyleSheet.create({
    content: 
        general.content,

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

    progress: 
        general.progress,

    nextPrevButtons: {
        justifyContent: 'space-between',
        marginTop: 5
    }
})

export default styles
