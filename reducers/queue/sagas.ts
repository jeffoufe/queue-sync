import { call, takeEvery, select, put } from 'redux-saga/effects'
import { Track } from '../../components/TrackList';
import { store } from '../../store';
import { generateSaga } from '../../utils/';
import { 
    PLAY_TRACK, 
    NEXT_SONG, 
    POP_SONG, 
    PREPEND_TO_QUEUE, 
    INSTANT_PLAY_TRACK, 
    PLAY_PAUSE_TRACK,
    CREATE_PARTY_ACTIONS,
    GET_PARTY_ACTIONS,
    ADD_TO_QUEUE_ACTIONS,
    DELETE_FROM_QUEUE_ACTIONS,
    CREATE_SOUND_OBJECT,
    START_TIMER,
    PAUSE_TIMER,
    RESET_TIMER
} from './constants';

const domain = 'http://node-express-env-3.eba-ppfp3jba.us-east-2.elasticbeanstalk.com/'
// const domain = 'http://localhost:3000';

function* playSpotifyTrack(track: Track) {
    const { timerId, remainingTime } = yield select((state: any) => state.queue);
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
        ).then(() => {
            if (timerId) {
                window.clearTimeout(timerId)
            }
            store.dispatch({ 
                type: START_TIMER, 
                payload: {
                    timerId: window.setTimeout(
                        () => store.dispatch({ type: NEXT_SONG }), 
                        remainingTime || track.duration
                    ),
                    startTime: Date.now()
                }
            });
        });
    }
}

const onPlaybackStatusUpdate = ({ didJustFinish }: any) => {
    if (didJustFinish) {
        store.dispatch({ type: NEXT_SONG });
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
            yield soundObject.setProgressUpdateIntervalAsync(1000)
            yield soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
        }
        yield soundObject.playAsync();
    } catch (error) {
        alert(error);
    }
}

function* playYouTubeTrack(track: any) {
    const { soundObject, id, progress, file } = track;
    const { _id } = yield select((state: any) => state.queue);
    if (progress && progress !== 100 || !file) {
        alert('File is not ready yet');
    } else {
        try {
            if (!soundObject['_loaded']) {
                yield soundObject.loadAsync({ uri: `${domain}/parties/${_id}/${id}/stream` });
                yield soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
            }
            yield soundObject.setStatusAsync({ shouldPlay: true })
        } catch (error) {
            alert(error);
        }
    }
}

function* playTrack() {
    const { tracks } = yield select((state: any) => state.queue);
    let track = tracks[0];
    if (!track.soundObject) {
        yield put({ type: CREATE_SOUND_OBJECT })
        const queue = yield select((state: any) => state.queue);
        track = queue.tracks[0];
    }
    let playFn;
    switch(track.type) {
        case 'spotify':
            playFn = playSpotifyTrack;
            break;
        case 'soundcloud':
            playFn = playSoundCloudTrack;
            break;
        case 'youtube':
            playFn = playYouTubeTrack;
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

function* pauseSoundCloudTrack(isFinished: boolean) {
    const { tracks } = yield select((state: any) => state.queue);
    const currentTrack = tracks[0];
    try {
        yield currentTrack.soundObject.pauseAsync();
        if (isFinished) {
            yield currentTrack.soundObject.unloadAsync();
            yield call(popTrack);
        }
    } catch (e) {
        console.log('Sound not loaded');
    }
}

function* pauseSpotifyTrack(isFinished: boolean) {
    const { remainingTime, timerId, startTime } = yield select((state: any) => state.queue);
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
        if (isFinished) {
            yield put({ type: RESET_TIMER });
            yield call(popTrack);
        } else {
            window.clearTimeout(timerId);
            put({
                type: PAUSE_TIMER,
                payload: {
                    remainingTime: remainingTime - (Date.now() - startTime)
                } 
            })
        }
    }
}

function* pauseCurrentTrack(isFinished = false) {
    const { tracks } = yield select((state: any) => state.queue);
    const currentTrack = tracks[0];
    switch (currentTrack.type) {
        case 'soundcloud':
        case 'youtube':
            yield call(pauseSoundCloudTrack, isFinished);
            break;
        case 'spotify':
            yield call(pauseSpotifyTrack, isFinished);
            break;
            
    }
}

function* popTrack() {
    const { _id, tracks } = yield select((state: any) => state.queue);
    const currentTrack = tracks[0];
    yield fetch(
        `${domain}/parties/${_id}/track/${currentTrack.id}`, 
        { method: 'DELETE' }
    )
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
    yield call(pauseCurrentTrack, true)
    yield put({ type: POP_SONG });
    yield put({ type: PLAY_TRACK });
}

export function* watchNextSong() {
    yield takeEvery(NEXT_SONG, nextSong)
}

export const watchCreateParty = generateSaga({
    ...CREATE_PARTY_ACTIONS,
    url: () => `${domain}/parties`,
    method: 'POST',
    responsePath: 'parties',
})

export const watchGetParty = generateSaga({
    ...GET_PARTY_ACTIONS,
    url: ({ id }: { id: string }) => `${domain}/parties/${id}`,
    method: 'GET',
})

export const watchAddToQueue = generateSaga({
    ...ADD_TO_QUEUE_ACTIONS,
    url: ({ id }: { id: string }) => `${domain}/parties/${id}/track`,
    method: 'POST',
})

export const watchDeleteFromQueue = generateSaga({
    ...DELETE_FROM_QUEUE_ACTIONS,
    url: ({ id, trackId }: { id: string, trackId: string }) => `${domain}/parties/${id}/track/${trackId}`,
    method: 'DELETE'
})
