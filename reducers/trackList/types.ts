import { GET_SPOTIFY_PLAYLIST_ACTIONS, GO_TO_PLAYLIST } from './constants';
import { SpotifyTrack } from '../tracks/types';
import { SpotifyPlaylist } from '../library/types';

interface GoToPlaylistAction {
    type: typeof GO_TO_PLAYLIST,
    payload: {
        name: string,
        id: string
    }
}

interface GetSpotifyPlaylistLoadingAction {
    type: typeof GET_SPOTIFY_PLAYLIST_ACTIONS.loading,
}

interface GetSpotifyPlaylistSuccessAction {
    type: typeof GET_SPOTIFY_PLAYLIST_ACTIONS.success,
    payload: {
        tracks: SpotifyTrack
    }
}

export type TrackListAction = 
    GetSpotifyPlaylistLoadingAction
    | GetSpotifyPlaylistSuccessAction
    | GoToPlaylistAction

export interface TrackListReducerState {
    tracks: Array<SpotifyPlaylist>,
    loading: boolean,
    name: string,
    id: string | null
}