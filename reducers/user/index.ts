import { UserAction, UserReducerState } from './types';
import { REHYDRATE } from 'redux-persist';
import { 
    LOGOUT_SPOTIFY, 
    AUTHORIZE_SPOTIFY_SUCCESS, 
    AUTHORIZE_SPOTIFY_LOADING, 
    SELECT_DEVICE_SPOTIFY,
    AUTHORIZE_SPOTIFY
} from './constants'

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
        /* case AUTHORIZE_SPOTIFY:
            return {
                ...state,
                spotify: {
                    ...state.spotify,
                    accessToken: "BQAaJN0nfWr2dpeJZsaqqzqQid_chPV8nv1nVcSxcJbCIISqFTK0Bz1W2WtK9Du5YDo05le2Ne8AMg65CsxHCrgfu9SC7R1t23KbY9M1hsfFmBAPZVveUrYHzhK1zDfdjlyGr45ncjnFjq1wo8gcSLY1wmUCvl04sIMEiXYpU_lbHnzXxe66k4r6aWjkElZbPGEyEDvhmH-IZR6IXlFH8ABVrdPMORMSSL025tLwpkVVF2ZJypFPxldx0echOsU1LX6Ft3ykLxEcZVc",
                    refreshToken: "AQBEvfCLv4zfXyn4--C8v9e3H3ryDtjhlwKjjQTRVJvUG20ccy6VbB3vphNQ2xgfOF6QNxIYQAfCKCmRggVCENo0WnkkxYB8i2gKvGgpUYC_4-BKkIiNuYr8TJSO6Sh7p6E",
                    expirationTime: 1595511795591
                }
            } */
        case AUTHORIZE_SPOTIFY_LOADING:
            return { 
                ...state,
                spotify: {
                    ...state.spotify,
                    loading: true,
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                    expirationTime: action.payload.expirationTime,
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
                    spotify: {
                        ...state.spotify,
                        ...action.payload.user.spotify
                    }
                }
            } else { 
                return state;
            }
        default:
            return state;
    }
  }