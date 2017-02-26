import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import { ActionConst } from 'react-native-router-flux';

export default sceneReducer = (state = {}, {type, scene}) => {
    switch(type){
        case ActionConst.FOCUS:
            return { ...state, scene };
        default:
            return state;
    }    
}
