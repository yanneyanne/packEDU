import { AsyncStorage } from 'react-native';
import {Storage} from 'react-native-storage'

export var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync : {
    // we'll talk about the details later.
  }
})
