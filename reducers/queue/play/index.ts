import { CREATE_SOUND_OBJECT } from '../constants';
import { SPOTIFY, SOUNDCLOUD } from '../../library/constants';
import { select, put, call } from 'redux-saga/effects';
import playSpotifyTrack from './spotify';
import playSoundCloudTrack from './soundcloud';
import playYouTubeTrack from './youtube';
import axios from 'axios';
import { domain } from '../../../utils';
import { SEND_PLAY_PAUSE } from '../constants';
import { store } from '../../../store';

export const sendPlay = async (userId: string) => {
    const response = await axios({
        url: `${domain}/users/${userId}/play`,
        method: 'PUT'
    });
    store.dispatch({
        type: SEND_PLAY_PAUSE,
        payload: response.data
    })
}

export default function* playTrack() {
    const { tracks } = yield select((state: any) => state.queue);
    let track = tracks[0];
    if (!track.soundObject) {
        yield put({ type: CREATE_SOUND_OBJECT })
        const queue = yield select((state: any) => state.queue);
        track = queue.tracks[0];
    }
    let playFn;
    switch(track.type) {
        case SPOTIFY:
            playFn = playSpotifyTrack;
            break;
        case SOUNDCLOUD:
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