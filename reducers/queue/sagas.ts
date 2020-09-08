import { call, takeEvery, select, put } from 'redux-saga/effects'
import axios from 'axios';
import { generateSaga, domain } from '../../utils/';
import { 
    PLAY_TRACK,
    NEXT_SONG,
    PREPEND_TO_QUEUE, 
    INSTANT_PLAY_TRACK, 
    PLAY_PAUSE_TRACK,
    CREATE_PARTY_ACTIONS,
    GET_PARTY_ACTIONS,
    ADD_TO_QUEUE_ACTIONS,
    DELETE_FROM_QUEUE_ACTIONS,
    ADD_PLAYLIST_TO_QUEUE
} from './constants';
import { formatSpotifyTrack, formatSoundCloudTracks } from '../tracks/utils';
import { SPOTIFY, SOUNDCLOUD } from '../library/constants';
import pauseCurrentTrack from './pause';
import playTrack from './play';

function* instantPlayTrack(action: any) {
    const { tracks } = action.payload;
    yield put({ type: PREPEND_TO_QUEUE, payload: { tracks } });
    yield call(playTrack);
}

export function* watchInstantPlayTrack() {
    yield takeEvery(INSTANT_PLAY_TRACK, instantPlayTrack)
}

export function* watchPlayTrack() {
    yield takeEvery(PLAY_TRACK, playTrack)
}

export function* popTrack() {
    const { _id, tracks } = yield select((state: any) => state.queue);
    const currentTrack = tracks[0];
    yield put({
        type: DELETE_FROM_QUEUE_ACTIONS.saga,
        urlParams: { id: _id, trackId: currentTrack['_id'] }
    })
}

function* playPauseCurrentTrack() {
    const { tracks } = yield select((state: any) => state.queue);
    if (tracks[0].isPlayed) {
        yield call(pauseCurrentTrack)
    } else {
        yield call(playTrack)
    }
}

export function* watchPlayPauseCurrentTrack() {
    yield takeEvery(PLAY_PAUSE_TRACK, playPauseCurrentTrack)
}

function* nextSong() {
    const { tracks, _id } = yield select((state: any) => state.queue);
    const currentTrack = tracks[0];
    
    if (!tracks[0].isPlayed) {
        yield call(pauseCurrentTrack, true)
    }
    
    const response = yield axios({
        url: `${domain}/users/${_id}/tracks/${currentTrack['_id']}?nextSong=true`,
        method: 'DELETE'
    })

    yield put({
        type: DELETE_FROM_QUEUE_ACTIONS.success,
        payload: response.data
    })

    yield call(playTrack);
}

export function* watchNextSong() {
    yield takeEvery(NEXT_SONG, nextSong)
}

export const watchCreateParty = generateSaga({
    ...CREATE_PARTY_ACTIONS,
    url: () => `${domain}/users`,
    method: 'POST',
    responsePath: 'users',
})

export const watchGetParty = generateSaga({
    ...GET_PARTY_ACTIONS,
    url: ({ id }: { id: string }) => `${domain}/users/${id}`,
    method: 'GET',
})

export const watchAddToQueue = generateSaga({
    ...ADD_TO_QUEUE_ACTIONS,
    url: ({ id }: { id: string }) => `${domain}/users/${id}/tracks`,
    method: 'POST',
})

export const watchDeleteFromQueue = generateSaga({
    ...DELETE_FROM_QUEUE_ACTIONS,
    url: ({ id, trackId }: { id: string, trackId: string }) => `${domain}/users/${id}/tracks/${trackId}`,
    method: 'DELETE'
})

function* getTracksFromPlaylist(action: any) {
    const { playlistId, type } = action.payload;
    const { _id } = yield select((state: any) => state.queue);
    switch (type) {
        case SPOTIFY:
            const { accessToken } = yield select((state: any) => state.user.spotify);
            const response = yield axios({
                url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            return response.data.items.map((item: any) => formatSpotifyTrack(item.track, _id));
        case SOUNDCLOUD:
            const idsResponse = yield axios({
                url: `${domain}/users/${_id}/sc-playlists/${playlistId}/tracks`,
                method: 'GET',
            });
            const tracksResponse = yield fetch(
                `https://api-v2.soundcloud.com/tracks?ids=${idsResponse.data.slice(0, 50)}&client_id=LwwkfCVkKXcE8djbcXfrQLnZZBqZk3f3&%5Bobject%20Object%5D=&app_version=1595844156&app_locale=en`
            );
            const responseJSON = yield tracksResponse.json();
            return formatSoundCloudTracks({ collection: responseJSON }, _id);       
        default:
            return [];
    }
}

function* addPlaylistToQueue(action: any) {
    const tracks = yield call(getTracksFromPlaylist, action); 
    const { _id } = yield select((state: any) => state.queue);
    yield axios({
        url: `${domain}/users/${_id}/tracks`,
        method: 'POST',
        data: { tracks }
    })
}

export function* watchAddPlaylistToQueue() {
    yield takeEvery(ADD_PLAYLIST_TO_QUEUE, addPlaylistToQueue)
}
