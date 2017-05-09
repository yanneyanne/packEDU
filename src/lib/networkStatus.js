import ReactNative from 'react-native'
const { NetInfo,
  View,
  TouchableWithoutFeedback,
} = ReactNative


export function networkStatus() {
  console.log("IN networkStatus")
    return NetInfo.isConnected.fetch()
  }
