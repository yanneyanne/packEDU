import ReactNative from 'react-native'
const { NetInfo,
  View,
  TouchableWithoutFeedback,
} = ReactNative


export function networkStatus() {
    return NetInfo.fetch()

      }
