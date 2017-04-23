import { StyleSheet } from 'react-native'
import { dimensions } from './constants'
import general from './general_styles'

var styles = StyleSheet.create({
    content:
        general.content,

    courseButton: {
        borderRadius: 0,
        width: 230,
        justifyContent: 'center'
    }

});

export default styles
