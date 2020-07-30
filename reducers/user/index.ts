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
                    accessToken: "BQB7dJjuNH-M1SxiKPM53BJSoezt-gPCNqncvQAT_ZUcWJPepd-WSveg-l25-Jcau3ujA1WK-LHOFKWbYaU63VoTg3vF-QcLFA_WzPLhcIpgnIREJBKEB_ga922WYQeYiJ7deVcTbHLBHj7F53AjcnCKA-UdojzGDHVsCD3LiPFay-8uy4wfLL1KYNAEIBpapMljTf5y4AcxqHHUCdXc38UsBT-Mn4R9hyxd_9H41f_DjPwpRJ_C_TR559D_dSxNL-vsUdYoleWEToo",
                    refreshToken: "AQBhQVbgXrqPiLFFLqFaxqU2iGDsSW27hpoEKyxpXkMhmAAm59TYAIMDVu9ijIWQ3OUsNF4U9tltfYlDHMlsfUt8BZczDX3nnkpuuEp45HbqSfj3meLNQtQlFtaYn-b6V4c",
                    expirationTime: 1596041543984,
                    deviceID: "06fce6b33fb7673d0570feb59ff87429ecdb58a3"
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