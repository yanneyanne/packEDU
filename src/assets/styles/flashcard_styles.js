import { StyleSheet } from 'react-native'

var styles = StyleSheet.create({
  flashCardContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginBottom: 70
  },
  flashCardWords: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  flashCardText: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  },
  flashCardAnswerText: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
    color: 'white',
    marginTop: 15
  },
  flashCardControl: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 5,
    alignItems: 'center'
  },
  flashCardButtons: {
    borderColor: 'white',
    justifyContent: 'center',
    marginTop: 15,
    width: 90,
    borderRadius: 0,
    marginLeft: 5,
    marginRight: 5
  }


})

export default styles
