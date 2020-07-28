import { GET_SPOTIFY_PLAYLISTS_ACTIONS, GET_SOUNDCLOUD_PLAYLISTS_ACTIONS, SAVE_PLAYLIST_ACTIONS } from './constants';
import { generateSaga, domain } from '../../utils/';

export const watchGetSpotifyPlaylists = generateSaga({
    ...GET_SPOTIFY_PLAYLISTS_ACTIONS,
    url: () => 'https://api.spotify.com/v1/me/playlists',
    method: 'GET',
    isSpotify: true
})

export const watchGetSoundCloudPlaylists = generateSaga({
    ...GET_SOUNDCLOUD_PLAYLISTS_ACTIONS,
    url: ({ id }: { id: string }) => `${domain}/parties/${id}/sc-playlists`,
    method: 'GET'
})

export const watchSavePlaylist = generateSaga({
    ...SAVE_PLAYLIST_ACTIONS,
    url: ({ id }: { id: string }) => `${domain}/parties/${id}/sc-playlists`,
    method: 'POST'
})