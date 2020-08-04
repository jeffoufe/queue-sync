import { generateSaga, domain } from '../../utils';
import {
    FETCH_TRACKS_ACTIONS,
    FETCH_PLAYLISTS_ACTIONS
} from './constants';

export const watchFetchTracks = generateSaga({ 
    ...FETCH_TRACKS_ACTIONS,
    url: ({ id, q, type }) => `${domain}/parties/${id}/tracks/search?q=${q}&type=${type}`,
    method: 'GET',
})

export const watchFetchPlaylists = generateSaga({
    ...FETCH_PLAYLISTS_ACTIONS,
    url: ({ id, q, type }) => `${domain}/parties/${id}/playlists/search?q=${q}&type=1`,
    method: 'GET',
})