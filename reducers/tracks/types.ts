import { 
    FETCH_TRACKS_SUCCESS, 
    FETCH_TRACKS_ERROR, 
    FETCH_TRACKS_LOADING,
    CHANGE_PROVIDER
} from './constants';

interface ChangeProviderAction {
    type: typeof CHANGE_PROVIDER,
    payload: {
        currentProviderIndex: number
    }
}

interface FetchTracksLoadingAction {
    type: typeof FETCH_TRACKS_LOADING,
    payload: {
        search: string,
        provider: string
    }
}
  
interface FetchTracksSuccessAction {
    type: typeof FETCH_TRACKS_SUCCESS,
    payload: {
        tracks: Array<any>,
        provider: string
    }
}

interface FetchTracksErrorAction {
    type: typeof FETCH_TRACKS_ERROR,
    payload: {
        error: string,
        provider: string
    }
}

export type TracksAction = 
    FetchTracksLoadingAction 
    | FetchTracksSuccessAction 
    | FetchTracksErrorAction
    | ChangeProviderAction

export interface ProviderObject {
    loading: boolean,
    search: string,
    error: string,
    selected: number | null,
    tracks: Array<any>
}

export interface TracksReducerState {
    currentProviderIndex: number,
    spotify: ProviderObject,
    soundcloud: ProviderObject   
}