import { GET_SPOTIFY_PLAYLISTS_ACTIONS } from './constants';
import { takeEvery, select, put } from 'redux-saga/effects'
import { generateSaga } from '../../utils/';

export const watchGetSpotifyPlaylists = generateSaga({
    ...GET_SPOTIFY_PLAYLISTS_ACTIONS,
    url: () => 'https://api.spotify.com/v1/me/playlists',
    method: 'GET',
    isSpotify: true
})