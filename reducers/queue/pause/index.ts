import pauseSoundCloudTrack from './soundcloud';
import pauseSpotifyTrack from './spotify';
import { SPOTIFY, SOUNDCLOUD } from '../../library/constants';
import { call, select } from 'redux-saga/effects';
import axios from 'axios';
import { domain } from '../../../utils';
import { SEND_PLAY_PAUSE } from '../constants';
import { store } from '../../../store';

export const sendPause = async (userId: string) => {
    const response = await axios({
        url: `${domain}/users/${userId}/pause`,
        method: 'PUT'
    });
    store.dispatch({
        type: SEND_PLAY_PAUSE,
        payload: response.data
    })
}

export default function* pauseCurrentTrack(isFinished = false) {
    const { tracks } = yield select((state: any) => state.queue);
    const currentTrack = tracks[0];
    switch (currentTrack.type) {
        case SOUNDCLOUD:
        case 'youtube':
            yield call(pauseSoundCloudTrack, isFinished);
            break;
        case SPOTIFY:
            yield call(pauseSpotifyTrack, isFinished);
            break;  
    }
}