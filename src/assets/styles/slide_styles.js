import { StyleSheet } from 'react-native'
import { dimensions } from './constants'
import general from './general_styles'

var styles = StyleSheet.create({
    content: {
        flex: 1
    },

    slideElements: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },

    progress: {
        marginTop: dimensions.headerHeight
    },

    footer: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        right: 5
    },

    nextPrevButtonsContainer: {
        justifyContent: 'space-between'
    },

    nextPrevButton: {
        borderRadius: 0,
        borderColor: 'white'
    },

    nextPrevButtonText: {
        color: 'white'
    }
})

export default styles
