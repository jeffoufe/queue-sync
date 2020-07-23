import { generateSaga } from '../../utils/';
import { GET_SPOTIFY_PLAYLIST_ACTIONS } from './constants';

export const watchGetSpotifyPlaylist = generateSaga({
    ...GET_SPOTIFY_PLAYLIST_ACTIONS,
    url: ({ playlistId }: { playlistId: string }) => `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    method: 'GET',
    isSpotify: true,
})