import { 
    GET_SPOTIFY_PLAYLISTS_ACTIONS,
    GET_SOUNDCLOUD_PLAYLISTS_ACTIONS
} from './constants';

export interface Playlist {
    id: string,
    name: string,
    ids: Array<string>,
    images: Array<{
        url: string
    }>
}

export interface LibraryReducerState {
    playlists: Array<Playlist>,
    currentProvider: number,
    loadingSavePlaylist: boolean,
    loadingGetPlaylists: boolean,
}

interface GetPlaylistsLoading {
    type: typeof GET_SPOTIFY_PLAYLISTS_ACTIONS.loading | typeof GET_SOUNDCLOUD_PLAYLISTS_ACTIONS.loading,
}

interface GetPlaylistsSuccess {
    type: typeof GET_SPOTIFY_PLAYLISTS_ACTIONS.success | typeof GET_SOUNDCLOUD_PLAYLISTS_ACTIONS.success,
    payload: {
        items: Array<Playlist>
    }
}

export type LibraryAction = 
    GetPlaylistsLoading
    | GetPlaylistsSuccess
