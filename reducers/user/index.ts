import { UserAction, UserReducerState } from './types';
import { REHYDRATE } from 'redux-persist';
import { 
    LOGOUT_SPOTIFY,
    SELECT_DEVICE_SPOTIFY,
    AUTHORIZE_SPOTIFY_ACTIONS,
    GET_CREDENTIALS_ACTIONS
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
                    accessToken: "BQBwJGrbifiFnz4RSoGfPZiBqpppJwXlZRLH7InZVt8DumFtt7bDzn_Q5C7xRDyfIL0cRQQY8Y80Aq3ZDjBQYc3Qmd_zJrlqFV0ly6NrR9PkBNlJIL6AaUvYRHQPfne5JcWq4jZrRqtUAqspupmmK45G3OtwKcL19e4kFe3suXvqzDd63jmg-ja7b3iBUGWzy-lCZvJNc8C50yeTetLTIZXmG_zuySUuiJZ4iQAWHBSd4u4IFz_pYY1SVmLWM0pw43kuvPXZFXPSJBw",
                    refreshToken: "AQBoKb75mZUxTb3d1ZhD9xeuqaHPBlELfer6I3bHffRW7Yopt70q-OZtJCEVgdB-uPUcr0jHOOsuOL4d-UeYXYYM0jwGR5GBZIyB99t9A7rYJQis4oGMHaaQ-1IWM30ctME",
                    expirationTime: 1596123830193,
                    deviceID: "06fce6b33fb7673d0570feb59ff87429ecdb58a3"
                }
            } */
        case GET_CREDENTIALS_ACTIONS.success:
            return {
                ...state,
                ...action.payload.credentials
            }
        case AUTHORIZE_SPOTIFY_ACTIONS.loading:
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
        case AUTHORIZE_SPOTIFY_ACTIONS.success:
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