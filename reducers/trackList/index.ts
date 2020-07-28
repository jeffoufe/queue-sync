import { TrackListAction, TrackListReducerState } from './types';
import { GET_SPOTIFY_PLAYLIST_ACTIONS, GET_SOUNDCLOUD_PLAYLIST_ACTIONS, GO_TO_PLAYLIST } from './constants'
import { formatSpotifyTrack, formatSoundCloudTrack } from '../tracks/utils'
import { SpotifyTrack, SoundCloudTrack } from '../tracks/types';

const initialState = {
    tracks: [],
    loading: false,
    name: '',
    id: null,
    ids: []
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
        default:
            return state;
    }
  }