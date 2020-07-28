const generateActions = (reducerName: string, actionName: string) => {
    const prefix = `${reducerName}/${actionName}`;
    return {
        saga: prefix,
        loading: `${prefix}_LOADING`,
        success: `${prefix}_SUCCESS`,
        error: `${prefix}_ERROR`,   
    }
}

export const CHANGE_PROVIDER = 'LIBRARY/CHANGE_PROVIDER';

export const SAVE_PLAYLIST_ACTIONS = generateActions('LIBRARY', 'SAVE_PLAYLIST');
export const GET_SPOTIFY_PLAYLISTS_ACTIONS = generateActions('LIBRARY', 'GET_SPOTIFY_PLAYLISTS_ACTIONS')
export const GET_SOUNDCLOUD_PLAYLISTS_ACTIONS = generateActions('LIBRARY', 'GET_SOUNDCLOUD_PLAYLISTS_ACTIONS')

export const SPOTIFY = 0;
export const SOUNDCLOUD = 1;

