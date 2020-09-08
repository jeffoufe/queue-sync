import { store } from '../../../store';
import { NEXT_SONG } from '../constants';
import { select, call } from 'redux-saga/effects';
import { domain } from '../../../utils';
import { sendPlay } from '.';

const onPlaybackStatusUpdate = ({ didJustFinish }: any) => {
    if (didJustFinish) {
        store.dispatch({ type: NEXT_SONG });
    }
}

export default function* playYouTubeTrack(track: any) {
    const { soundObject, id, progress, file } = track;
    const { _id } = yield select((state: any) => state.queue);
    if (progress && progress !== 100 || !file) {
        alert('File is not ready yet');
    } else {
        try {
            if (!soundObject['_loaded']) {
                yield soundObject.loadAsync({ uri: `${domain}/users/${_id}/${id}/stream` });
                yield soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
            }
            yield soundObject.setStatusAsync({ shouldPlay: true })
            yield call(sendPlay);
        } catch (error) {
            alert(error);
        }
    }
}