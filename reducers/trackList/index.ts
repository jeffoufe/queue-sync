import { TrackListAction, TrackListReducerState } from './types';
import { GET_SPOTIFY_PLAYLIST_ACTIONS, GET_SOUNDCLOUD_PLAYLIST_ACTIONS, GO_TO_PLAYLIST, GET_MIXED_PLAYLIST_ACTIONS } from './constants'
import { formatSpotifyTrack } from '../tracks/utils'
import { SpotifyTrack } from '../tracks/types';

const initialState = {
    tracks: [],
    loading: false,
    name: '',
    id: null,
    ids: [],
    playlists: [],
}

export default (state: TrackListReducerState = initialState, action: TrackListAction) => {
    switch (action.type) {
        case GO_TO_PLAYLIST:
            return {
                ...state,
                name: action.payload.name,
                id: action.payload.id,
                ids: action.payload.ids
            }
        case GET_SPOTIFY_PLAYLIST_ACTIONS.loading:
        case GET_SOUNDCLOUD_PLAYLIST_ACTIONS.loading:
        case GET_MIXED_PLAYLIST_ACTIONS.loading:
            return { 
                ...state,
                loading: true
            }
        case GET_SPOTIFY_PLAYLIST_ACTIONS.success:
            return { 
                ...state,
                loading: false,
                tracks: action.payload.items.map(({ track }: { track: SpotifyTrack }) => formatSpotifyTrack(track))
            }
        case GET_SOUNDCLOUD_PLAYLIST_ACTIONS.success:
            return { 
                ...state,
                loading: false,
                tracks: action.payload.items
            }
        case GET_MIXED_PLAYLIST_ACTIONS.success:
            return {
                ...state,
                loading: false,
                tracks: action.payload.tracks,
                playlists: action.payload.playlists
            }
        default:
            return state;
    }
  }