import { select } from 'redux-saga/effects'
import { Track } from '../../../components/TrackList';
import { store } from '../../../store';
import { NEXT_SONG, START_TIMER } from '../constants';
import { sendPlay } from '.';

export default function* playSpotifyTrack(track: Track) {
    const { timerId, remainingTime, _id } = yield select((state: any) => state.queue);
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
        )
            .then(response => {
                if (response.status !== 404) {
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
                    sendPlay(_id);
                } 
            })
    }
}