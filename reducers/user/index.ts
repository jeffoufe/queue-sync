import { UserAction, UserReducerState } from './types';
import { REHYDRATE } from 'redux-persist';
import { LOGOUT_SPOTIFY, AUTHORIZE_SPOTIFY_SUCCESS, AUTHORIZE_SPOTIFY_LOADING, SELECT_DEVICE_SPOTIFY } from './constants'

const initialState = {
    spotify: {
        loading: false,
        refreshToken: null,
        accessToken: null,
        expirationTime: null,
        deviceID: null,
        error: null,
        devices: []
    },
    soundcloud: {
        accessToken: null,
        expirationTime: null,
        error: null,
        loading: false
    }
}

export default (state: UserReducerState = initialState, action: UserAction) => {
    switch (action.type) {
        case AUTHORIZE_SPOTIFY_LOADING:
            return { 
                ...state,
                spotify: {
                    ...state.spotify,
                    loading: true,
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                    expirationTime: action.payload.expirationTime
                }
            }
        case AUTHORIZE_SPOTIFY_SUCCESS:
            return {
                ...state,
                spotify: {
                    ...state.spotify,
                    loading: false,
                    devices: action.payload.devices   
                }
            }
        case SELECT_DEVICE_SPOTIFY:
            return {
                ...state,
                spotify: {
                    ...state.spotify,
                    deviceID: action.payload.deviceID
                }
            }
        case LOGOUT_SPOTIFY:
            return {
                ...state,
                spotify: initialState.spotify
            }
        case REHYDRATE:
            if (action.payload) {
                return {
                    ...state,
                    spotify: action.payload.spotify
                }
            } else { 
                return state;
            }
        default:
            return state;
    }
  }