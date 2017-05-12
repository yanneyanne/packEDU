import { StyleSheet } from 'react-native'
import { dimensions } from './constants'
import general from './general_styles'

var styles = StyleSheet.create({
    content: {
        flex: 1
    },

    finishedElements: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        padding: 15,
        marginBottom: 60
    },

    progress: {
        marginTop: dimensions.headerHeight
    },

    footer: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        right: 5,
    },

    resultsContainer: {
      marginBottom: 10,
      backgroundColor: 'rgba(0,0,0,0)'
    },

    resultsText: {
      justifyContent: 'center',
      fontSize: 30,
      color: 'white'
    },

    chooseNewLessonButton: {
      borderRadius: 0,
      borderColor: 'white',
      paddingRight: 10,
      paddingLeft: 10,
      justifyContent: 'center'
    },

    finishedLessonButtonText: {
        color: 'white'
    }
})

export default styles
