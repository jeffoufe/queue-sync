import { call, takeEvery, select, put } from 'redux-saga/effects'
import { Track } from '../../components/TrackList';
import { generateSaga } from '../../utils/';
import { 
    PLAY_TRACK, 
    NEXT_SONG, 
    POP_SONG, 
    PREPEND_TO_QUEUE, 
    INSTANT_PLAY_TRACK, 
    PLAY_PAUSE_TRACK,
    CREATE_PARTY_ACTIONS,
    GET_PARTY_ACTIONS
} from './constants';

function* playSpotifyTrack(track: Track) {
    const spotify = yield select((state: any) => state.user.spotify);
    if (spotify) {
        yield fetch(
            `https://api.spotify.com/v1/me/player/play?device_id=${spotify.deviceID}`, 
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${spotify.accessToken}`
                },
                body: JSON.stringify({
                    uris: [`spotify:track:${track.id}`]
                })
            }
        );
    }
}

function* playSoundCloudTrack(track: any) {
    const { soundObject } = track;
    try {
        const response = yield fetch(track.url)
        const stream = yield response.json();
        const mp3Url = stream.url;
        if (!soundObject['_loaded']) {
            yield soundObject.loadAsync({ uri: mp3Url });
        }
        yield soundObject.playAsync();
    } catch (error) {
        alert(error);
    }
}

function* playTrack() {
    const { tracks } = yield select((state: any) => state.queue);
    const track = tracks[0];
    let playFn;
    switch(track.type) {
        case 'spotify':
            playFn = playSpotifyTrack;
            break;
        case 'soundcloud':
            playFn = playSoundCloudTrack;
            break;
        default:
            break;
    }
    if (playFn) {
        yield call(playFn, track);
    }
}

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

function* stopSoundCloudTrack() {
    const { tracks } = yield select((state: any) => state.queue);
    const currentTrack = tracks[0];
    try {
        yield currentTrack.soundObject.pauseAsync();
        // yield currentTrack.soundObject.unloadAsync();
    } catch (e) {
        console.log('Sound not loaded');
    }
}

function* stopSpotifyTrack() {
    const spotify = yield select((state: any) => state.user.spotify);
    if (spotify) {
        yield fetch(
            `https://api.spotify.com/v1/me/player/pause?device_id=${spotify.deviceID}`, 
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${spotify.accessToken}`
                }
            }
        );
    }
}

function* pauseCurrentTrack() {
    const { tracks } = yield select((state: any) => state.queue);
    const currentTrack = tracks[0];
    switch (currentTrack.type) {
        case 'soundcloud':
            yield call(stopSoundCloudTrack);
            break;
        case 'spotify':
            yield call(stopSpotifyTrack);
            break;
            
    }
}

function* playPauseCurrentTrack() {
    const { tracks } = yield select((state: any) => state.queue);
    if (!tracks[0].isPlayed) {
        yield call(pauseCurrentTrack)
    } else {
        yield call(playTrack)
    }
}

export function* watchPlayPauseCurrentTrack() {
    yield takeEvery(PLAY_PAUSE_TRACK, playPauseCurrentTrack)
}

function* nextSong() {
    yield call(pauseCurrentTrack)
    yield put({ type: POP_SONG });
    yield put({ type: PLAY_TRACK });
}

export function* watchNextSong() {
    yield takeEvery(NEXT_SONG, nextSong)
}

export const watchCreateParty = generateSaga({
    ...CREATE_PARTY_ACTIONS,
    url: () => 'http://localhost:3000/parties',
    method: 'POST',
    responsePath: 'parties',
})

export const watchGetParty = generateSaga({
    ...GET_PARTY_ACTIONS,
    url: ({ id }: { id: string }) => `http://localhost:3000/parties/${id}`,
    method: 'GET',
})
