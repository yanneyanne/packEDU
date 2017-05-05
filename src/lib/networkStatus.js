import ReactNative from 'react-native'
const { NetInfo,
  View,
  TouchableWithoutFeedback,
} = ReactNative


export function networkStatus() {
    NetInfo.fetch().done((reach) => {
      console.log('Initial: ' + reach);
    })
  }


