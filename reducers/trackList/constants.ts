const generateActions = (reducerName: string, actionName: string) => {
    const prefix = `${reducerName}/${actionName}`;
    return {
        saga: prefix,
        loading: `${prefix}_LOADING`,
        success: `${prefix}_SUCCESS`,
        error: `${prefix}_ERROR`,   
    }
}

export const GET_SPOTIFY_PLAYLIST_ACTIONS = generateActions('TRACKLIST', 'GET_SPOTIFY_PLAYLIST');
export const GET_SOUNDCLOUD_PLAYLIST_ACTIONS = generateActions('TRACKLIST', 'GET_SOUNDCLOUD_PLAYLIST');
export const GET_MIXED_PLAYLIST_ACTIONS = generateActions('TRACKLIST', 'GET_MIXED_PLAYLIST_ACTIONS');

export const GO_TO_PLAYLIST = 'TRACKLIST/GO_TO_PLAYLIST';