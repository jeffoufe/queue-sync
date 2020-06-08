import { UserAction, UserReducerState } from './types';
import { REHYDRATE } from 'redux-persist';
import { LOGOUT_SPOTIFY, AUTHORIZE_SPOTIFY_SUCCESS, AUTHORIZE_SPOTIFY_LOADING, SELECT_DEVICE_SPOTIFY } from './constants'

const initialState = {
    spotify: {
        loading: true,
        refreshToken: null,
        accessToken: null, //'BQCvprKpgy0YVgPnW7ZmVR2rLhZpKuXBrCHLTJCuZwNlxvzVFZ_EhsxP_ZEo8vakye3o5DlIK_Pkvqzm7wxmiuib88q9VvamyHz3Y-aKH3smgEdfjIEVpDfiVNerx0bCR_0RaNt7-rXYQPEWrZ6upxAuyZL0HxZowUaTcT4g2u6t5lLIgoe_UnBh_aLHlii5yVuh4zfdK6tpuJQx3Yq4erOCm-_FRp7AROj_lxls4Js6pEXsSvKpb2NGWK1hayaeRHycK026mT7q63I',
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
            const soundcloud = action.payload.soundcloud || state.soundcloud;
            const spotify = action.payload.spotify || state.spotify;
            if (action.payload) {
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