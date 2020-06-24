import { UserAction, UserReducerState } from './types';
import { REHYDRATE } from 'redux-persist';
import { LOGOUT_SPOTIFY, AUTHORIZE_SPOTIFY_SUCCESS, AUTHORIZE_SPOTIFY_LOADING, SELECT_DEVICE_SPOTIFY } from './constants'

const initialProviderState = {
    accessToken: null,
    expirationTime: null,
    error: null,
    loading: false
};

const initialState = {
    spotify: {
        refreshToken: null,
        deviceID: null,
        devices: [],
        ...initialProviderState
    },
    soundcloud: initialProviderState,
    youtube: initialProviderState,
    deezer: initialProviderState
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
                const soundcloud = action.payload.soundcloud || state.soundcloud;
                const spotify = action.payload.spotify || state.spotify;
                return {
                    ...state,
                    soundcloud,
                    spotify
                }
            } else { 
                return state;
            }
        default:
            return state;
    }
  }