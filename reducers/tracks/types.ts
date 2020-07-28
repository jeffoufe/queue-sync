import {
    FETCH_TRACKS_SUCCESS, 
    FETCH_TRACKS_ERROR, 
    FETCH_TRACKS_LOADING,
    CHANGE_PROVIDER,
    FETCH_PLAYLISTS_SUCCESS,
    FETCH_PLAYLISTS_LOADING,
    FETCH_PLAYLISTS_ERROR
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

interface FetchPlaylistsLoadingAction {
    type: typeof FETCH_PLAYLISTS_LOADING,
    payload: {
        search: string
    }
}

interface FetchPlaylistsSuccessAction {
    type: typeof FETCH_PLAYLISTS_SUCCESS,
    payload: {
        playlists: Array<any>
    }
}

interface FetchPlaylistsErrorAction {
    type: typeof FETCH_PLAYLISTS_ERROR,
    payload: {
        error: string
    }
}

export type TracksAction = 
    FetchTracksLoadingAction
    | FetchTracksSuccessAction 
    | FetchTracksErrorAction
    | ChangeProviderAction
    | FetchPlaylistsLoadingAction
    | FetchPlaylistsSuccessAction
    | FetchPlaylistsErrorAction

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

export interface SpotifyTrack {
    album: {
        images: Array<{
            url: string
        }>
    },
    id: string
    name: string,
    duration_ms: number,
    artists: Array<{
        name: string
    }>
}

export interface SpotifyArtist {
    name: string
}

export interface SpotifyTracksResponse {
    tracks: {
        items: Array<SpotifyTrack>
    }
}

export interface SoundCloudTrack {
    artwork_url: string,
    user: {
        full_name: string,
        avatar_url: string,
        username: string
    },
    title: string,
    id: string,
    media: {
        transcodings: Array<{
            format: {
                protocol: string
            },
            url: string
        }>
    }
}

export interface SoundCloudTracksResponse {
    collection: Array<SoundCloudTrack>
}

export interface SoundCloudPlaylist {
    tracks: Array<SoundCloudTrack>,
    track_count: number,
    title: string,
    id: string
}

export interface SoundCloudPlaylistsResponse {
    collection: Array<SoundCloudPlaylist> 
}