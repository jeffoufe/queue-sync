import { 
    GET_SPOTIFY_PLAYLISTS_ACTIONS,
    GET_SOUNDCLOUD_PLAYLISTS_ACTIONS,
    SELECT_TRACK
} from './constants';

export interface Playlist {
    id: string,
    name: string,
    ids: Array<string>,
    selectedTrack: any,
    image: string
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

interface AddToPlaylistAction {
    type: typeof SELECT_TRACK
    payload: {
        track: any
    }
}

export type LibraryAction = 
    GetPlaylistsLoading
    | GetPlaylistsSuccess
    | AddToPlaylistAction
