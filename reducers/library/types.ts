import { GET_SPOTIFY_PLAYLISTS_ACTIONS } from './constants';

export interface SpotifyPlaylist {
    id: string,
    name: string,
    images: Array<{
        url: string
    }>
}

export interface LibraryReducerState {
    spotifyPlaylists: Array<SpotifyPlaylist>
}

interface GetSpotifyPlaylistsLoading {
    type: typeof GET_SPOTIFY_PLAYLISTS_ACTIONS.loading,
    payload: {}
}

interface GetSpotifyPlaylistsSuccess {
    type: typeof GET_SPOTIFY_PLAYLISTS_ACTIONS.success,
    payload: {
        items: Array<SpotifyPlaylist>
    }
}

export type LibraryAction = 
    GetSpotifyPlaylistsLoading
    | GetSpotifyPlaylistsSuccess
