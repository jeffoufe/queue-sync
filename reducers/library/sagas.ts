import { 
    SAVE_PLAYLIST_ACTIONS,
    GET_PLAYLISTS_ACTIONS,
    CREATE_MIXED_PLAYLIST_ACTIONS,
    ADD_TO_PLAYLIST_ACTIONS,
    DELETE_FROM_PLAYLIST_ACTIONS,
    ADD_PLAYLIST_TO_PLAYLIST_ACTIONS,
    DELETE_PLAYLIST_ACTIONS
} from './constants';
import { generateSaga, domain } from '../../utils/';

export const watchGetPlaylists = generateSaga({
    ...GET_PLAYLISTS_ACTIONS,
    url: ({ id, type }: { id: string, type: number }) => `${domain}/parties/${id}/playlists?type=${type}`,
    method: 'GET'
})

export const watchSavePlaylist = generateSaga({
    ...SAVE_PLAYLIST_ACTIONS,
    url: ({ id }: { id: string }) => `${domain}/parties/${id}/sc-playlists`,
    method: 'POST'
})

export const watchCreateMixedPlaylist = generateSaga({
    ...CREATE_MIXED_PLAYLIST_ACTIONS,
    url: ({ id }: { id: string }) => `${domain}/parties/${id}/playlists`,
    method: 'POST'
})

export const watchAddToPlaylist = generateSaga({
    ...ADD_TO_PLAYLIST_ACTIONS,
    url: ({ id, playlistId }: { id: string, playlistId: string }) => `${domain}/parties/${id}/playlists/${playlistId}/track`,
    method: 'POST'
})

export const watchAddPlaylistToPlaylist = generateSaga({
    ...ADD_PLAYLIST_TO_PLAYLIST_ACTIONS,
    url: ({ id, playlistId }: { id: string, playlistId: string }) => `${domain}/parties/${id}/playlists/${playlistId}/playlist`,
    method: 'POST'
})

export const watchDeleteFromPlaylist = generateSaga({
    ...DELETE_FROM_PLAYLIST_ACTIONS,
    url: ({ id, playlistId, trackId }: { id: string, playlistId: string, trackID: string }) => `${domain}/parties/${id}/playlists/${playlistId}/track/${trackId}`,
    method: 'DELETE'
})

export const watchDeletePlaylist = generateSaga({
    ...DELETE_PLAYLIST_ACTIONS,
    url: ({ id, playlistId }: { id: string, playlistId: string }) => `${domain}/parties/${id}/sc-playlists/${playlistId}`,
    method: 'DELETE'
})